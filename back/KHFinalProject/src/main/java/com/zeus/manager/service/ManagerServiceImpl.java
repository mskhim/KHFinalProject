package com.zeus.manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.manager.mapper.ManagerMapper;

@Service
public class ManagerServiceImpl implements ManagerService {
	@Autowired
	private ManagerMapper mapper;
}
