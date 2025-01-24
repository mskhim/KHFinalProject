package com.zeus.user.service;

public interface UserService {
    String getAuthUrl();
    String getAccessToken(String code, String state);
    String getUserInfo(String accessToken);

}
