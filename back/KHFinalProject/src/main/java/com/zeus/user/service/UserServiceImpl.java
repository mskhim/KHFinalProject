package com.zeus.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zeus.user.domain.User;
import com.zeus.user.mapper.UserMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper mapper;

    @Value("${naver.client-id}")
    private String naverClientId;

    @Value("${naver.client-secret}")
    private String naverClientSecret;

    @Value("${naver.redirect-uri}")
    private String naverRedirectUri;

    @Value("${kakao.client-id}")
    private String kakaoClientId;

    @Value("${kakao.redirect-uri}")
    private String kakaoRedirectUri;
    @Value("${jwt.secret}") // application.properties에서 비밀키 읽기
    private String secretKey;



    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1시간 (밀리초 단위)

    private final RestTemplate restTemplate = new RestTemplate();

    // ================== UserMapper 메서드 추가 ==================
    @Override
    public User getUserByIdAndProvider(User user) {
        return mapper.findUserByIdAndProvider(user);
    }
    @Override
    public boolean insert(User user) {
        try {
            return mapper.insert(user);
        } catch (Exception e) {
            log.error("User Insert Error: {}", e.getMessage());
            throw new RuntimeException("User 데이터 삽입 실패", e);
        }
    }

    @Override
    public boolean checkRegist(User user) {
        try {
            int count = mapper.checkRegist(user);
            return count == 0; // 중복이 없으면 true 등록이 안되어있다면 true
        } catch (Exception e) {
            log.error("User CheckRegist Error: {}", e.getMessage());
            throw new RuntimeException("중복 체크 실패", e);
        }
    }

    
    // ================== 네이버 로그인 ==================
 // 엑세스 토큰으로 DB에서 사용자 정보 조회
    @Override
    public User getUserByAccessToken(String accessToken) {
        try {
            // JWT 토큰 검증
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey) // JWT 서명 검증을 위한 시크릿 키
                    .parseClaimsJws(accessToken)
                    .getBody();

            // 토큰에서 사용자 정보 추출
            String userId = claims.get("id", String.class);
            String provider = claims.get("provider", String.class);

            if (userId == null || provider == null) {
                throw new RuntimeException("유효하지 않은 JWT 토큰입니다.");
            }

            // DB에서 사용자 조회
            User setUser = new User();
            setUser.setId(userId);
            setUser.setProvider(provider);
            User user = mapper.findUserByIdAndProvider(setUser);

            if (user == null) {
                throw new RuntimeException("해당 사용자를 찾을 수 없습니다.");
            }
            return user;
        } catch (Exception e) {
            log.error("토큰 기반 사용자 조회 실패: {}", e.getMessage());
            return null;
        }
    }
    @Override
    public String getNaverAuthUrl() {
        return "https://nid.naver.com/oauth2.0/authorize?response_type=code" + "&client_id=" + naverClientId
                + "&redirect_uri=" + naverRedirectUri + "&state=STATE";
    }

    @Override
    public String getNaverAccessToken(String code, String state) {
        String url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code" + "&client_id=" + naverClientId
                + "&client_secret=" + naverClientSecret + "&code=" + code + "&state=" + state;

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode node = mapper.readTree(response.getBody());
            return node.get("access_token").asText();
        } catch (Exception e) {
            throw new RuntimeException("네이버 Access Token 요청 실패", e);
        }
    }

    @Override
    public String getNaverUserInfo(String accessToken) {
        String url = "https://openapi.naver.com/v1/nid/me";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    // ================== 카카오 로그인 추가 ==================

    public String getKakaoAuthUrl() {
        return "https://kauth.kakao.com/oauth/authorize?response_type=code" + "&client_id=" + kakaoClientId
                + "&redirect_uri=" + kakaoRedirectUri;
    }

    public String getKakaoAccessToken(String code) {
        String url = "https://kauth.kakao.com/oauth/token?grant_type=authorization_code" + "&client_id=" + kakaoClientId
                + "&redirect_uri=" + kakaoRedirectUri + "&code=" + code;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode node = mapper.readTree(response.getBody());
            return node.get("access_token").asText();
        } catch (Exception e) {
            throw new RuntimeException("카카오 Access Token 요청 실패", e);
        }
    }

    public String getKakaoUserInfo(String accessToken) {
        String url = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }


}

