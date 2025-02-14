package com.zeus.user.mapper;

import com.zeus.user.domain.User;

public interface UserMapper {
	
	public boolean insert(User user);
	public User checkLogin(User user);
	public User findUserByIdAndProvider(User user);
	public User findUserByEmail(User user);
	public User findUserByEmailAndId(User user);
	public boolean updateRandomPwdById(User user);
	public User checkUserExists(User user);
	
	//////////////////////////////////////////////
	public int updateUserData (User user);
	// jwt에서 가져온 userNo를 통해 사용자 정보 조회.
	public User getUserByNo(Integer userNo);
	public int deleteUserData(Integer userNo);
	/////////////////////////////////////////////
}
