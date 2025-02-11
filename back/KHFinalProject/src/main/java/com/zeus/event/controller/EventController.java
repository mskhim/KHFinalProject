package com.zeus.event.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.common.config.JwtUtil;
import com.zeus.event.domain.PublicDataEvent;
import com.zeus.event.service.EventService;
import com.zeus.user.domain.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/event")
public class EventController {
	
	@Autowired
	private EventService service;
	@Autowired
	private JwtUtil JwtUtil;
	
	//  JWT 쿠키 검사 (로그인 상태 확인)
	@GetMapping("/selectPublicDataEvent")
	public ResponseEntity<Map<String, Object>> selectPublicDataEvent(@CookieValue(name = "jwt", required = false) String jwtToken) { //  쿠키에서 JWT 가져오기
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			log.info("토큰만료");
	        return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
	    }
	    // JWT가 유효하면 사용자 정보 반환
	    int no = JwtUtil.validateToken(jwtToken).get("no", Integer.class);
	    User user = new User();
	    user.setNo(no);
	    
	    List<PublicDataEvent> dataList = service.selectPublicDataEvent(user);
	    
	    return ResponseEntity.ok(Map.of(
		        "authenticated", true,
		        "message", "JWT 유효",
	        "dataList", dataList
	    ));
	}
	
}
