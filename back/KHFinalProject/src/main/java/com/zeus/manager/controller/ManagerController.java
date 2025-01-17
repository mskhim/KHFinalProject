package com.zeus.manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.manager.service.ManagerService;

@RestController
@RequestMapping(value = "/manager")
public class ManagerController {

	@Autowired
	private ManagerService service;
	
}
