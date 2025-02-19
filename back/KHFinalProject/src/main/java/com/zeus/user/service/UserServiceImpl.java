package com.zeus.user.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zeus.common.config.JwtUtil;
import com.zeus.user.domain.Cart;
import com.zeus.user.domain.CartDTO;
import com.zeus.user.domain.ReservedCancelDTO;
import com.zeus.user.domain.ReservedDTO;
import com.zeus.user.domain.User;
import com.zeus.user.mapper.UserMapper;

import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper mapper;
    
    @Autowired
    private JwtUtil JwtUtil;
    
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

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword); // ✅ 비밀번호 해싱
    }
    
    @Override
    public boolean matchPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword); // ✅ 비밀번호 비교
    }
    
    /////////////////////////////////////////////////////////
    /// DB에서 userNo로 사용자 정보 조회.
	@Override
	public User getUserByNo(Integer userNo)
	{
		return mapper.getUserByNo(userNo);
	}
    /////////////////////////////////////////////////////////
    


    //이메일로 아이디 찾기 기능을 위해 일반 유저 정보를 가져온다. 보안을 위해 아이디만 살려서 보낼것
	@Override
	public User findCommonUserByEmail(User user) {
		if(mapper.findUserByEmail(user)==null) {
			return null;
		}
		User idOnlyUser = new User();
		idOnlyUser.setId(mapper.findUserByEmail(user).getId());
		return idOnlyUser;
	}

	//이메일, 아이디로 비밀번호 찾기 기능을 위해 일반 유저 정보를 가져온다.
	@Override
	public User findCommonUserByEmailAndId(User user) {
		if(mapper.findUserByEmailAndId(user)==null) {
			return null;
		}
		User chekckUser = new User();
		return chekckUser;
	}

	//아이디, 프로바이더, 임시비밀번호를 받아 db를 임시비밀번호로 업데이트
	@Override
	public boolean updateRandomPwdById(User user) {
		String encodePwd = encodePassword(user.getPwd());
		user.setPwd(encodePwd);
		boolean flag=mapper.updateRandomPwdById(user);
		return flag;
	}

	//user안에 id, nickname, email 셋중 하나의 값만 있을때 사용가능한 중복체크 메소드
	@Override
	public User checkUserExists(User user) {
		if(mapper.checkUserExists(user)==null) {
			return null;
		}
		User chekckUser = new User();
		return chekckUser;
	}

    
    
    // ================== UserMapper 메서드 추가 ==================
    @Override
    public User getUserByIdAndProvider(User user) {
        return mapper.findUserByIdAndProvider(user);
    }  
    
    @Override
    public boolean insert(User user) {
        try {
        	String encodePwd = encodePassword(user.getPwd());
        	user.setPwd(encodePwd);
            return mapper.insert(user);
        } catch (Exception e) {
            log.error("User Insert Error: {}", e.getMessage());
            throw new RuntimeException("User 데이터 삽입 실패", e);
        }
    }

    @Override
    public User checkRegist(User user) {
        try {
        	User userCheck= mapper.findUserByIdAndProvider(user);
            return userCheck; // 중복됐으면 false 중복이 아니면 true
        } catch (Exception e) {
            log.error("User CheckRegist Error: {}", e.getMessage());
            throw new RuntimeException("중복 체크 실패", e);
        }
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @Override
    public User updateUserData(User user) {
        if (user.getPwd() != null && !user.getPwd().isEmpty()) {
            user.setPwd(encodePassword(user.getPwd()));  // 비밀번호 암호화
        } else {
            // 기존 사용자 데이터를 가져와서 현재 비밀번호를 유지
            User existingUser = mapper.getUserByNo(user.getNo());
            user.setPwd(existingUser.getPwd());
        }

        int rowsAffected = mapper.updateUserData(user);

        if (rowsAffected > 0) {
            return user;  // 업데이트 성공 시 사용자 객체 반환
        } else {
            return null;  // 업데이트 실패 시 null 반환
        }
    }
	//////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
	// 회원 탈퇴.
	@Override
	public boolean deleteUserData(Integer userNo)
	{
		try
		{
			// 삭제 쿼리 호출 (userNo를 기준으로 사용자 삭제)
			int rowsAffected = mapper.deleteUserData(userNo);
			// 삭제가 성공적으로 이루어졌다면
			return rowsAffected > 0; // 1 이상의 값이 반환되면 삭제 성공
			
		} catch (Exception e)
		{
			e.printStackTrace(); // 예외가 발생한 경우 예외 로그 출력
			return false; // 예외가 발생하면 false 반환
		}
	}
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	// userNo와 일치하는 장바구니 정보를 출력.
	@Override
	public List <CartDTO> getCartData(Integer userNo)
	{
		return mapper.getCartData(userNo);  // List<CartDTO> 반환;
	}
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	// 장바구니 삭제.
	@Override
	public boolean deleteCartData(Cart cart)
	{
		try {
            // 장바구니 삭제 쿼리 실행
            int result = mapper.deleteCartData(cart);

            // 삭제 성공 여부를 확인하여 true/false 반환
            return result > 0;  // 삭제된 행의 수가 1 이상이면 삭제 성공
        } catch (Exception e) {
            // 예외가 발생하면 false 반환
            e.printStackTrace();
            return false;
        }
	}
	////////////////////////////////////////////////////////////////////////
	// 예매 내역 조회.
	@Override
	public List <ReservedDTO> getReservedData(int userNo)
	{

		System.out.println("User object received: " + userNo); // 로그 추가
		
		List <ReservedDTO> reservedData = mapper.getReservedData(userNo);
		
		// 추가 로그 출력
		if (reservedData == null)
		{
			System.out.println("예매 내역이 없습니다.");
		} else
		{
			System.out.println("예매 내역: " + reservedData);
		}

		return reservedData;
	}
	////////////////////////////////////////////////////////////////////////
	// 예매내역 취소(삭제).
	@Override
	public boolean deleteReservedData(int no)
	{
		try
		{
	        // 예매 내역 삭제 쿼리 실행
	        int result = mapper.deleteReservedData(no);

	        // 삭제된 행의 수가 1 이상이면 삭제 성공
	        return result > 0;

	    } catch (Exception e)
		{
	        // 예외가 발생하면 예외 로그를 출력하고 false 반환
	        e.printStackTrace();
	        return false;
	    }
	}
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	// 예매 삭제 내역 조회.
	@Override
	public List<ReservedCancelDTO> getReservedCancelData(Integer userNo)
	{
	    List<ReservedCancelDTO> cancelData = mapper.getReservedCancelData(userNo);
	    
	    if (cancelData == null || cancelData.isEmpty())
	    {
	        System.out.println("취소 내역이 없습니다. userNo: " + userNo);
	    } else {
	        System.out.println("취소 내역: " + cancelData);
	    }

	    return cancelData;
	}
	////////////////////////////////////////////////////////////////////////
    //로그인 체크, id와 provider로 user 정보를 가져와헤싱해서 로그인확인
    //provider가 common 이라면 헤싱해서 로그인 이외에는 api 로그인이므로 id와 provider만 일치하는지 확인
    @Override
    public User checkLogin(User user) {
    	if(user.getProvider().equals("common")) {
        try {
        	User userLogin= mapper.checkLogin(user);
        	if(userLogin ==null) { 
        		return null;}
        	boolean flag = matchPassword(user.getPwd(), userLogin.getPwd());
        	if(flag) {
        		return userLogin; // 중복됐으면 false 중복이 아니면true
        	}
        	else {return null;}
        	
        } catch (Exception e) {
            log.error("User CheckRegist Error: {}", e.getMessage());
            throw new RuntimeException("로그인 실패", e);
        }}
    	else {
    		return mapper.checkLogin(user);
    	}
    }
    
    // ================== 네이버 로그인 ==================
 // 엑세스 토큰으로 DB에서 사용자 정보 조회
    @Override
    public User getUserByAccessToken(String accessToken) {
        try {
            // JWT 토큰 검증
            Claims claims = JwtUtil.validateToken(accessToken);
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