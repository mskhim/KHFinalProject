package com.zeus.auth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.common.config.JwtUtil;
import com.zeus.user.domain.User;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {

@Autowired
private JwtUtil JwtUtil;
	
    @GetMapping("/jwtAdmin")
    public String adminAccess() {
        return "Admin Access Granted!";
    }

    @GetMapping("/jwtManager")
    public String managerAccess() {
        return "Manager Access Granted!";
    }

    @GetMapping("/jwtUser")
    public String userAccess() {
        return "User Access Granted!";
    }
    
	//  JWT 쿠키 검사 (로그인 상태 확인)
	@GetMapping("/checkRole")
	public ResponseEntity<Map<String, Object>> checkRole(@CookieValue(name = "jwt", required = false) String jwtToken, @RequestParam String role) { //  쿠키에서 JWT 가져오기
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
	        return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
	    }
	    // JWT가 유효하면 사용자 정보 반환
	    String jwtRole = JwtUtil.validateToken(jwtToken).get("role", String.class);
	    boolean flag= false;
	    String roleNo = null;
	    switch (role) {
	    case "user":
	        roleNo = "ROLE_2";
	        break;
	    case "manager":
	        roleNo = "ROLE_1";
	        break;
	    case "admin":
	        roleNo = "ROLE_0";
	        break;
	    default:
	        roleNo = "ROLE_UNKNOWN"; // 예외 처리 (예상치 못한 값이 들어올 경우)
	}
	    if(jwtRole.equals(roleNo)) {
	    	flag= true;
	    }
	    
	    return ResponseEntity.ok(Map.of(
	    		"authenticated", flag
	    ));
	}
	
	//  JWT 쿠키 검사 (로그인 상태 확인)
	@GetMapping("/checkRoleAndUserNo")
	public ResponseEntity<Map<String, Object>> checkRoleAndId(@CookieValue(name = "jwt", required = false) String jwtToken, @RequestParam String role, @RequestParam int userNo) { //  쿠키에서 JWT 가져오기
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
	        return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
	    }
	    // JWT가 유효하면 사용자 정보 반환
	    String jwtRole = JwtUtil.validateToken(jwtToken).get("role", String.class);
	    int jwtUserNo = JwtUtil.validateToken(jwtToken).get("no", Integer.class);
	   
	    boolean flag= false;
	    String roleNo = null;
	    switch (role) {
	    case "user":
	        roleNo = "ROLE_2";
	        break;
	    case "manager":
	        roleNo = "ROLE_1";
	        break;
	    case "admin":
	        roleNo = "ROLE_0";
	        break;
	    default:
	        roleNo = "ROLE_UNKNOWN"; // 예외 처리 (예상치 못한 값이 들어올 경우)
	}
	    if(jwtRole.equals(roleNo)&& userNo==jwtUserNo) {
	    	flag= true;
	    }
	    return ResponseEntity.ok(Map.of(
	    		"authenticated", flag
	    ));
	}
}
