package com.zeus.user.service;

import com.zeus.user.domain.User;

public interface UserService {
	//유저 기능
	User getUserByIdAndProvider(User user);//아이디 ,provider로 유저정보 가져오
	User checkRegist(User user);
	User checkLogin(User user);
	User checkUserExists(User user);
	boolean insert(User user);
	public User getUserByAccessToken(String accessToken);
	User findCommonUserByEmail(User user);
	User findCommonUserByEmailAndId(User user);
	boolean updateRandomPwdById(User user);
	
	///////////////////////////////////////////////////////
	User updateUserData (User user);
	//User deleteUserData (User user);
	// jwt에서 가져온 userNo로 회원 정보 조회 후, 회원 탈퇴 진행.
	boolean deleteUserData(Integer userNo);
	User getUserByNo(Integer userNo);
	///////////////////////////////////////////////////////
	
	
    // 네이버 로그인
    String getNaverAuthUrl(); // 네이버 로그인 인증 URL 생성
    String getNaverAccessToken(String code, String state); // 네이버 Access Token 요청
    String getNaverUserInfo(String accessToken); // 네이버 사용자 정보 요청

    // 카카오 로그인
    String getKakaoAuthUrl(); // 카카오 로그인 인증 URL 생성
    String getKakaoAccessToken(String code); // 카카오 Access Token 요청
    String getKakaoUserInfo(String accessToken); // 카카오 사용자 정보 요청
    
    //비밀버호 해싱관련
    public String encodePassword(String rawPassword);
    public boolean matchPassword(String rawPassword, String encodedPassword);
}
