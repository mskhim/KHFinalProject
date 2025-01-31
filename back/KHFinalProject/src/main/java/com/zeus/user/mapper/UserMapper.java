package com.zeus.user.mapper;

import com.zeus.user.domain.User;

public interface UserMapper {
	
	public boolean insert(User user);
	public int checkRegist(User user);
	public User findUserByIdAndProvider(User user);
	
}
