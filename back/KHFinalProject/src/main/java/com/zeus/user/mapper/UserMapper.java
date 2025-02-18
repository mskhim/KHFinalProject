package com.zeus.user.mapper;

import java.util.List;

import com.zeus.user.domain.Cart;
import com.zeus.user.domain.CartDTO;
import com.zeus.user.domain.Reserved;
import com.zeus.user.domain.ReservedCancelDTO;
import com.zeus.user.domain.ReservedDTO;
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
	// 유저 정보 수정.
	public int updateUserData (User user);
	// jwt에서 가져온 userNo를 통해 사용자 정보 조회.
	public User getUserByNo(Integer userNo);
	public int deleteUserData(Integer userNo);
	public List <CartDTO> getCartData(Integer userNo);
	public int deleteCartData(Cart cart);
	public List <ReservedDTO> getReservedData(int userNo);
	public int deleteReservedData(int no);
	public List <ReservedCancelDTO> getReservedCancelData(Integer userNo);
	/////////////////////////////////////////////
}
