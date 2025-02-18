package com.zeus.admin.mapper;

import java.util.List;
import java.util.Map;

import com.zeus.event.domain.Event;
import com.zeus.user.domain.User;
import com.zeus.admin.domain.AdminEventDTO;

public interface AdminMapper {

	public void insert(String name);

// 매니저 관리 페이지

	// 매니저 전체 및 검색 전체조회
	public List<User> managerSelectAllBySearch(User user) throws Exception;

	// 매니저 추가
	public void managerInsert(User user) throws Exception;

	// 매니저 수정
	public void managerUpdate(User user) throws Exception;

	// 매니저 삭제
	public void managerDelete(List<Integer> ids) throws Exception;

// 유저 관리 페이지

	// 유저 전체 및 검색 전체조회
	public List<User> userSelectAllBySearch(User user) throws Exception;

	// 유저 삭제
	public void userDelete(List<Integer> ids) throws Exception;

// 축제 관리 페이지
	
	// 축제 전체 및 검색 전체조회
	public List<AdminEventDTO> festivalSelectAllBySearch(AdminEventDTO event) throws Exception;

	// 축제 삭제
	public void festivalDelete(List<Integer> ids) throws Exception;
}
