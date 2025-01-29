package com.zeus.user.service;

public interface UserService {
    String getAuthUrl();
    String getAccessToken(String code, String state);
    String getUserInfo(String accessToken);
    boolean validateJwt(String token);
    String getJwt(String username);
}
