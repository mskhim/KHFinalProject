package com.zeus.auth.service;

import com.zeus.user.domain.User;

public interface authService {

	boolean checkAuth(String jwtToken,String userId,String provider);
	boolean checkAuth(String jwtToken,int userNo);
}
