package com.zeus.admin.mapper;

import java.util.List;
import java.util.Map;

import com.zeus.event.domain.Event;
import com.zeus.user.domain.User;

public interface AdminMapper {

	public void insert(String name);

// 매니저 관리 페이지

	// 매니저 전체 조회
	
	// 매니저 검색 전체조회
	public List<User> managerSelectAllBySearch(User user) throws Exception;

	// 검색시 매니저 조회
	public List<Map<String, Object>> managerSelect(User user) throws Exception;

	// 매니저 추가
	public void managerInsert(Map<String, Object> map) throws Exception;

	// 매니저 수정
	public void managerUpdate(Map<String, Object> map) throws Exception;

	// 매니저 삭제
	public void managerDelete(String id) throws Exception;

// 유저 관리 페이지

	// 유저 전체 조회
	public List<Map<String, Object>> userSelectAll(User user) throws Exception;

	// 검색시 유저 조회
	public List<Map<String, Object>> userSelect(User user) throws Exception;

	// 유저 삭제
	public void userDelete(String id) throws Exception;

// 축제 관리 페이지
	
	// 축제 전체 조회
	public List<Map<String, Object>> festivalSelectAll(Event event) throws Exception;

	// 검색시 축제 조회
	public List<Map<String, Object>> festivalSelect(Event e) throws Exception;

	// 축제 추가
	public void festivalInsert(Map<String, Object> map) throws Exception;

	// 축제 수정
	public void festivalUpdate(Map<String, Object> map) throws Exception;

	// 축제 삭제
	public void festivalDelete(String id) throws Exception;
}
