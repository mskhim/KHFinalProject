package com.zeus.qna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.qna.service.QnaService;

@RestController
@RequestMapping(value = "/qna")
public class QnaController {

	@Autowired
	private QnaService service;
	
}
