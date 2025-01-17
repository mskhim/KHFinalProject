package com.zeus.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.main.service.MainService;

@RestController
@RequestMapping(value = "/main")
public class MainController {

	@Autowired
	private MainService service;
	
}
