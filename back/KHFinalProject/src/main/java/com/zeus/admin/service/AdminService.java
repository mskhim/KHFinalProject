package com.zeus.admin.service;

import java.util.List;
import java.util.Map;

import com.zeus.user.domain.User;

public interface AdminService {
	
	public void insert(String name);

	public List<User> managerSelectAllBySearch(String name) throws Exception;

	public void managerInsert(User user) throws Exception;

	public void managerUpdate(User user) throws Exception;
	
	public void managerDelete(List<Integer> ids) throws Exception;

	public List<User> userSelectAllBySearch(String id) throws Exception;

	public void userDelete(List<Integer> ids) throws Exception;
}

