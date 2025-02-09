package com.zeus.user.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zeus.common.config.JwtUtil;
import com.zeus.user.domain.User;
import com.zeus.user.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/user")
public class UserController {

	@Autowired
	private UserService service;
	@Autowired
	private JwtUtil JwtUtil;

	//아이디찾기
		@GetMapping("/findCommonUserIdByEmail")
		public ResponseEntity<?> findCommonUserIdByEmail(@RequestParam String email) {
			User user = new User();
			user.setEmail(email);
			user.setProvider("naver");
			user = service.findCommonUserByEmail(user);
			 if (user != null) {
			        return ResponseEntity.ok(Map.of("user",user));
			    } else {
			        return ResponseEntity.status(404).body("❌ 해당 이메일로 가입된 계정이 없습니다.");
			    }
			}
	
		//아이디와 이메일로 확인
		@GetMapping("/findCommonUserPwdByEmail")
		public ResponseEntity<?> findCommonUserPwdByEmail(@RequestParam String email,@RequestParam String id) {
			User user = new User();
			user.setId(id);
			user.setEmail(email);
			user.setProvider("naver");
			user = service.findCommonUserByEmailAndId(user);
			 if (user != null) {
			        return ResponseEntity.ok(Map.of("user",user));
			    } else {
			        return ResponseEntity.status(404).body("❌ 해당 이메일로 가입된 계정이 없습니다.");
			    }
			}
		//아이디와 임시비릴번호를 받아서 업데이트
		@PostMapping("/updateRandomPwdById")
		public ResponseEntity<?> updatePwdById(@RequestBody User user) {
			user.setProvider("naver");
			boolean flag = service.updateRandomPwdById(user);
			 if (flag) {
			        return ResponseEntity.ok(Map.of("flag",flag));
			    } else {
			        return ResponseEntity.status(404).body("❌ 해당 이메일로 가입된 계정이 없습니다.");
			    }
			}
	// 회원가입 처리
	@PostMapping("/insert")
	public ResponseEntity<?> insert(@RequestBody User user) {
		log.info(user + "");
		try {
			if (user.getId() == null) {
				user.setId("default_id"); // 기본값 설정
			}
			if (user.getPwd() == null) {
				user.setPwd("default_password");
			}
			log.info(user.getRole()+"");
			boolean isInserted = service.insert(user);

			if (isInserted) {
				return ResponseEntity.ok(Map.of("success", true, "message", "회원가입이 완료되었습니다."));
			} else {
				return ResponseEntity.status(400).body(Map.of("success", false, "message", "회원가입에 실패했습니다."));
			}
		} catch (Exception e) {
			return ResponseEntity.status(500)
					.body(Map.of("success", false, "message", "서버 오류가 발생했습니다.", "error", e.getMessage()));
		}
	}

	// 네이버 로그인 URL 반환
	@GetMapping("/naver/auth-url")
	public ResponseEntity<String> getAuthUrl() {
		return ResponseEntity.ok(service.getNaverAuthUrl());
	}

	//  네이버 콜백 처리 (회원가입이 필요할 경우 JWT를 저장하지 않음)
	@GetMapping("/naver/callback")
	public ResponseEntity<Map<String, Object>> callback(@RequestParam String code, @RequestParam String state,HttpServletResponse response) {

	    log.info("🔹 네이버 엑세스 토큰 생성 시작");
	    String accessToken = service.getNaverAccessToken(code, state);
	    log.info(" 네이버 엑세스 토큰 생성 완료");

	    //  네이버 API를 호출하여 사용자 정보 가져오기
	    String userInfo = service.getNaverUserInfo(accessToken);
	    User user = parseNaverUserInfo(userInfo);

	    //  사용자 등록 여부 확인
	    boolean isRegistered = false;
	    if(service.checkRegist(user)==null) {
	    	isRegistered=true;
	    	
	    }

	    //  신규 사용자라면 회원가입 필요 메시지 반환 (JWT 저장 X)
	    if (isRegistered) {
	        return ResponseEntity.ok(Map.of(
	            "isRegistered", false,
	            "user", user, //  회원가입 화면에서 사용할 정보 제공
	            "message", "회원가입 필요"
	        ));
	    }
	    user=service.checkRegist(user);
	    //  기존 회원이라면 JWT 생성 및 쿠키에 저장
	    String jwtAccessToken = JwtUtil.createAccessToken(user);
	    String refreshToken = JwtUtil.createRefreshToken(user);

	    //  쿠키에 JWT 저장
	    addJwtCookie(response, "jwt", jwtAccessToken, 60 * 15); // 15분 유지
	    addJwtCookie(response, "refresh_token", refreshToken, 60 * 60 * 24 * 7); // 7일 유지

	    return ResponseEntity.ok(Map.of("isRegistered", true, "message", "로그인 성공","user", user));
	}


	// ============================ 카카오 로그인 추가 ============================

	// 카카오 로그인 URL 반환
	@GetMapping("/kakao/auth-url")
	public ResponseEntity<String> getKakaoAuthUrl() {
		return ResponseEntity.ok(service.getKakaoAuthUrl());
	}

	// 카카오 콜백 처리
	@GetMapping("/kakao/callback")
	public ResponseEntity<Map<String, Object>> kakaoCallback(@RequestParam String code,HttpServletResponse response ) {

	    log.info("🔹 카카오 엑세스 토큰 생성 시작");
	    String accessToken = service.getKakaoAccessToken(code);
	    log.info(" 카카오 엑세스 토큰 생성 완료");

	    //  카카오 API를 호출하여 사용자 정보 가져오기
	    String userInfo = service.getKakaoUserInfo(accessToken);
	    User user = parseKakaoUserInfo(userInfo);

	    if (user == null) {
	        return ResponseEntity.status(500).body(Map.of("error", "Failed to parse user info"));
	    }

	    //  사용자 등록 여부 확인
	    boolean isRegistered = false;
	    if(service.checkRegist(user)==null) {
	    	isRegistered=true;
	    }
	    //  신규 사용자라면 회원가입 필요 메시지 반환 (JWT 저장 X)
	    if (isRegistered) {
	        return ResponseEntity.ok(Map.of(
	            "isRegistered", false,
	            "user", user, //  회원가입 화면에서 사용할 정보 제공
	            "message", "회원가입 필요"
	        ));
	    } 
	    user=service.checkRegist(user);
	    //  기존 회원이라면 JWT 생성 및 쿠키에 저장
	    String jwtAccessToken = JwtUtil.createAccessToken(user);
	    String refreshToken = JwtUtil.createRefreshToken(user);

	    //  쿠키에 JWT 저장
	    addJwtCookie(response, "jwt", jwtAccessToken, 60 * 15); // 15분 유지
	    addJwtCookie(response, "refresh_token", refreshToken, 60 * 60 * 24 * 7); // 7일 유지

	    return ResponseEntity.ok(Map.of("isRegistered", true, "message", "로그인 성공","user", user));
	}


	// 로그인 처리
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody User user, HttpServletResponse response) {
	    
		if(user.getPwd()==null) {
			user.setPwd("default_password");
		}	
		log.info("🔹 /login 요청 - 유저 ID: {}", user.getId());
	    //  DB에서 사용자 확인
	    User user2 = service.checkLogin(user);
	    if (user2 == null) {
	        return ResponseEntity.status(404).body(Map.of(
	            "success", false,
	            "message", "등록되지 않은 사용자입니다. 회원가입이 필요합니다."
	        ));
	    }
	    deleteJwtCookie(response, "refresh_token"); // 리프레시 토큰 삭제
	    //  JWT 생성 (액세스 토큰 & 리프레시 토큰)
	    String accessToken = JwtUtil.createAccessToken(user2);
	    String refreshToken = JwtUtil.createRefreshToken(user2);
	    log.info(" JWT 생성 완료");

	    //  JWT를 HttpOnly 쿠키에 저장
	    addJwtCookie(response, "jwt", accessToken, 60 * 15); // 15분 유지
	    addJwtCookie(response, "refresh_token", refreshToken, 60 * 60 * 24 * 7); // 7일 유지

	    return ResponseEntity.ok(Map.of("success", true, "message", "로그인 성공!"));
	}

	//  로그아웃 API (JWT 및 리프레시 토큰 삭제)
	@PostMapping("/logout")
	public ResponseEntity<Map<String, Object>> logout(HttpServletResponse response) {
	    log.info("🔹 로그아웃 요청");
	    //  쿠키 삭제 (만료 시간 0으로 설정)
	    deleteJwtCookie(response, "jwt"); // 액세스 토큰 삭제
	    deleteJwtCookie(response, "refresh_token"); // 리프레시 토큰 삭제

	    return ResponseEntity.ok(Map.of("success", true, "message", "로그아웃 완료"));
	}

	//  JWT 쿠키 검사 (로그인 상태 확인)
	@GetMapping("/check-auth")
	public ResponseEntity<Map<String, Object>> checkAuth(
	        @CookieValue(name = "jwt", required = false) String jwtToken) { //  쿠키에서 JWT 가져오기

	    if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
	        return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
	    }

	    //  JWT가 유효하면 사용자 정보 반환
	    String userId = JwtUtil.validateToken(jwtToken).get("id", String.class);
	    String provider = JwtUtil.validateToken(jwtToken).get("provider", String.class);
	    User user = new User();
	    user.setId(userId);
	    user.setProvider(provider);
	    user = service.getUserByIdAndProvider(user);

	    return ResponseEntity.ok(Map.of(
	        "authenticated", true,
	        "message", "JWT 유효",
	        "user", user
	    ));
	}
	//  리프레시 토큰을 이용한 JWT 갱신 API
	@PostMapping("/refresh-token")
	public ResponseEntity<Map<String, Object>> refreshToken(
	    @CookieValue(name = "refresh_token", required = false) String refreshToken,
	    HttpServletResponse response) {
	    log.info("🔹 JWT 갱신 요청");
	    if (refreshToken == null || JwtUtil.isTokenExpired(refreshToken)) {
	        return ResponseEntity.status(401).body(Map.of("error", "유효하지 않거나 만료된 리프레시 토큰"));
	    }
	    //  리프레시 토큰을 검증하고 새로운 액세스 토큰 생성
	    String userId = JwtUtil.validateToken(refreshToken).get("id", String.class);
	    String provider = JwtUtil.validateToken(refreshToken).get("provider", String.class);
	    User user = new User();
	    user.setId(userId);
	    user.setProvider(provider);
	    User dbUser = new User();
	    dbUser = service.getUserByIdAndProvider(user);
	    if (dbUser == null) {
	        log.warn("❌ 리프레시 토큰 변조 또는 탈퇴한 유저 (userId: {}, provider: {})", userId, provider);
	        return ResponseEntity.status(403).body(Map.of("error", "유효하지 않은 리프레시 토큰 또는 탈퇴한 사용자"));
	    }
	    String newAccessToken = JwtUtil.createAccessToken(dbUser);
	    //  새로운 JWT를 HttpOnly 쿠키에 저장
	    addJwtCookie(response, "jwt", newAccessToken, 60 * 15); // 15분 유지

	    return ResponseEntity.ok(Map.of("success", true, "message", "액세스 토큰 갱신 완료"));
	}

	//--------------------------------------------------api메소드가 아닌 컨트롤러용 메소드
	//  JWT 쿠키 삭제 메소드
	private void deleteJwtCookie(HttpServletResponse response, String name) {
	    Cookie cookie = new Cookie(name, "");
	    cookie.setHttpOnly(true);
	    cookie.setSecure(true);
	    cookie.setPath("/");
	    cookie.setMaxAge(0); // 즉시 삭제
	    response.addCookie(cookie);
	}

	//  공통 메소드: JWT를 HttpOnly 쿠키에 저장
	private void addJwtCookie(HttpServletResponse response, String name, String token, int maxAge) {
		Cookie cookie = new Cookie(name, token);
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		cookie.setPath("/");
		cookie.setMaxAge(maxAge);
		cookie.setAttribute("SameSite", "Strict"); // XSRF 방지
		response.addCookie(cookie);
	}

	//  네이버 사용자 정보를 User 객체로 변환하는 메소드
	private User parseNaverUserInfo(String userInfo) {
	    try {
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode rootNode = objectMapper.readTree(userInfo);
	        JsonNode responseNode = rootNode.get("response");
	        if (responseNode != null) {
	            User user = new User();
	            user.setId(responseNode.get("id").asText());
	            user.setName(responseNode.get("name").asText());
	            user.setProvider("naver");
	            user.setPhone(responseNode.get("mobile").asText());
	            user.setGender((responseNode.get("gender").asText().charAt(0))+"");
	            user.setEmail(responseNode.has("email") ? responseNode.get("email").asText() : ""); //  이메일 추가

	            //  생년월일 변환
	            user.setBirth(LocalDate.parse(
	                    responseNode.get("birthyear").asText() + "-" + responseNode.get("birthday").asText(),
	                    DateTimeFormatter.ofPattern("yyyy-MM-dd")));

	            user.setRole(2);
	            return user;
	        }
	    } catch (Exception e) {
	        log.error("❌ 네이버 JSON 파싱 중 오류 발생:", e);
	    }
	    return null;
	}

	//  카카오 사용자 정보를 User 객체로 변환하는 메소드
	private User parseKakaoUserInfo(String userInfo) {
	    try {
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode rootNode = objectMapper.readTree(userInfo);
	        User user = new User();

	        //  사용자 고유 ID
	        user.setId(rootNode.get("id").asText());
	        user.setProvider("kakao");

	        //  kakao_account에서 추가 정보 추출
	        JsonNode accountNode = rootNode.get("kakao_account");
	        if (accountNode != null) {
	            user.setName(accountNode.has("name") ? accountNode.get("name").asText() : ""); 
	            user.setPhone(accountNode.has("phone_number") ? accountNode.get("phone_number").asText().replace("+82 10-", "010-") : ""); 
	            user.setGender(""+ (accountNode.has("gender") && accountNode.get("gender").asText().equals("male") ? 'M' : 'F')); 
	            user.setEmail(accountNode.has("email") ? accountNode.get("email").asText() : ""); //  이메일 추가

	            //  생년월일 변환
	            if (accountNode.has("birthyear") && accountNode.has("birthday")) {
	                String birthyear = accountNode.get("birthyear").asText();
	                String birthday = accountNode.get("birthday").asText();
	                user.setBirth(LocalDate.parse(birthyear + "-" + birthday.substring(0, 2) + "-" + birthday.substring(2),
	                        DateTimeFormatter.ofPattern("yyyy-MM-dd")));
	            }
	            user.setRole(2);
	        }
	        return user;
	    } catch (Exception e) {
	        log.error("❌ 카카오 JSON 파싱 중 오류 발생:", e);
	    }
	    return null;
	}
	
	

}
