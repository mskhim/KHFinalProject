package com.zeus.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.admin.mapper.AdminMapper;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminMapper mapper;
	
	@Override
	public void insert(String name) {
		mapper.insert(name);
	}
}
