package com.zeus.notice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.notice.domain.Notice;
import com.zeus.notice.service.NoticeService;

@RestController
@RequestMapping(value = "/notice")
public class NoticeController {

	@Autowired
	private NoticeService service;
	
	 @GetMapping
	    public List<Notice> getNotices() {
	        return service.getNotices();
	    }
}
