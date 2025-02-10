package com.zeus.user.mapper;

import com.zeus.user.domain.User;

public interface UserMapper {
	
	public boolean insert(User user);
	public User checkLogin(User user);
	public User findUserByIdAndProvider(User user);
	public User findUserByEmail(User user);
	public User findUserByEmailAndId(User user);
	public boolean updateRandomPwdById(User user);
	public User checkNickName(User user);
	
}
