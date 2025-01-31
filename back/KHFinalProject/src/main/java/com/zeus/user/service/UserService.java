package com.zeus.user.service;

import com.zeus.user.domain.User;

public interface UserService {
	//유저 기능
	User getUserByIdAndProvider(User user);//로그인 확인
	boolean checkRegist(User user);
	boolean insert(User user);
	public User getUserByAccessToken(String accessToken);
    // 네이버 로그인
    String getNaverAuthUrl(); // 네이버 로그인 인증 URL 생성
    String getNaverAccessToken(String code, String state); // 네이버 Access Token 요청
    String getNaverUserInfo(String accessToken); // 네이버 사용자 정보 요청

    // 카카오 로그인
    String getKakaoAuthUrl(); // 카카오 로그인 인증 URL 생성
    String getKakaoAccessToken(String code); // 카카오 Access Token 요청
    String getKakaoUserInfo(String accessToken); // 카카오 사용자 정보 요청
    

}
