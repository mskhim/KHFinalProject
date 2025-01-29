package com.zeus.user.service;

import java.util.Date;

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
import com.zeus.user.mapper.UserMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper mapper;

	@Value("${naver.client-id}")
	private String clientId;

	@Value("${naver.client-secret}")
	private String clientSecret;

	@Value("${naver.redirect-uri}")
	private String redirectUri;

	@Value("${jwt.secret}") // application.properties에서 비밀키 읽기
	private String secretKey;

	private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1시간 (밀리초 단위)

	private final RestTemplate restTemplate = new RestTemplate();

	// 네이버 로그인 인증 URL 생성
	@Override
	public String getAuthUrl() {
		return "https://nid.naver.com/oauth2.0/authorize?response_type=code" + "&client_id=" + clientId
				+ "&redirect_uri=" + redirectUri + "&state=STATE";
	}

	// 인증 코드로 Access Token 요청
	@Override
	public String getAccessToken(String code, String state) {

		String url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code" + "&client_id=" + clientId
				+ "&client_secret=" + clientSecret + "&code=" + code + "&state=" + state;

		ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

		// JSON 파싱 후 Access Token 반환
		ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode node = mapper.readTree(response.getBody());
			return node.get("access_token").asText();
		} catch (Exception e) {
			throw new RuntimeException("Access Token 요청 실패", e);
		}
	}

	// Access Token으로 사용자 정보 요청
	@Override
	public String getUserInfo(String accessToken) {
		String url = "https://openapi.naver.com/v1/nid/me";

		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);

		HttpEntity<String> entity = new HttpEntity<>(headers);

		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
		return response.getBody();
	}

	@Override
	public boolean validateJwt(String token) {
		try {
			Jwts.parser().setSigningKey(secretKey) // 비밀키로 서명 검증
					.parseClaimsJws(token);
			return true; // 검증 성공
		} catch (Exception e) {
			return false; // 검증 실패
		}
	}

	@Override
	public String getJwt(String username) {
		return Jwts.builder().setSubject(username).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS256, secretKey) // 비밀키로 서명
				.compact();
	}

}
