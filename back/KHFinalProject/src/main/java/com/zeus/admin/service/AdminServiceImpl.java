package com.zeus.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.admin.mapper.AdminMapper;
import com.zeus.user.domain.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminMapper mapper;
	
	@Override
	public void insert(String name) {
		mapper.insert(name);
	}


	@Override
	public List<User> managerSelectAllBySearch(String name) throws Exception {
		User user = new User();
		user.setName(name);
		return mapper.managerSelectAllBySearch(user);
	}
}
