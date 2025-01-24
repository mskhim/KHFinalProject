package com.zeus.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.user.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/user")
public class UserController {

	@Autowired
	private UserService service;
	

    // 네이버 로그인 URL 반환
    @GetMapping("/auth-url")
    public ResponseEntity<String> getAuthUrl() {
        return ResponseEntity.ok(service.getAuthUrl());
    }

    // 콜백 처리
    @GetMapping("/callback")
    public ResponseEntity<Map<String, Object>> callback(@RequestParam String code, @RequestParam String state) {
        log.info("엑세스 토큰 생성 시작");
        
        // Access Token 요청
        String accessToken = service.getAccessToken(code, state);
        log.info("엑세스 토큰 생성 완료");
        
        // 사용자 정보 요청
        String userInfo = service.getUserInfo(accessToken);
        
        // Access Token과 사용자 정보를 JSON으로 반환
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", accessToken); // 엑세스 토큰
        response.put("userInfo", userInfo); // 사용자 정보
        
        return ResponseEntity.ok(response); // JSON 응답
    }
}
