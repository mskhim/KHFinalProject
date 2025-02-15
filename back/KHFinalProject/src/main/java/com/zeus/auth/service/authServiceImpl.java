package com.zeus.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.common.config.JwtUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class authServiceImpl implements authService {
	@Autowired
	private JwtUtil JwtUtil;

	@Override // 토큰과 id, provider를 넣어서 검증
	public boolean checkAuth(String jwtToken, String userId, String provider) {
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			log.info("토큰만료");
			return false;
		}
		String jwtId = JwtUtil.validateToken(jwtToken).get("id", String.class);
		String jwtProvider = JwtUtil.validateToken(jwtToken).get("provider", String.class);
		if (jwtId == userId && provider == jwtProvider) {
			return true;
		}
		return false;
	}

	@Override // 토큰과 유저 no를 넣어서 검증
	public boolean checkAuth(String jwtToken, int userNo) {
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			log.info("토큰만료");
			return false;
		}
		int jwtNo = JwtUtil.validateToken(jwtToken).get("no", Integer.class);
		if (jwtNo == userNo) {
			return true;
		}
		return false;
	}
}
