package com.zeus.admin.service;

import java.util.List;
import java.util.Map;

import com.zeus.user.domain.User;

public interface AdminService {
	
	public void insert(String name);

	
	public List<User> managerSelectAllBySearch(String name) throws Exception;
	
}
