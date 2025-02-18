package com.zeus.notice.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.notice.domain.Notice;
import com.zeus.notice.service.NoticeService;

import lombok.extern.java.Log;

@RestController
@RequestMapping(value = "/notice")
public class NoticeController {

	@Autowired
	private NoticeService service;
	
	@GetMapping("/all")
	public List<Notice> getAllNotices(@RequestParam(name = "keyword", required = false, defaultValue = "") String keyword) {
	    return service.getAllNotices(keyword);
	}
	
	// ✅ 페이징 처리된 공지사항 목록 가져오기
    @GetMapping
    public List<Notice> getNoticesByPage(
        @RequestParam(name = "page", defaultValue = "1") int page,
        @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {
        return service.getNoticesByPage(page, pageSize);
    }

	// ✅ 특정 공지사항 조회 (ID로 가져오기)
	    @GetMapping("/{no}")
	    public Notice getNoticeById(@PathVariable("no") int no) {
	        return service.getNoticeById(no);
	    }
	    
	    @GetMapping("/count")
	    public int getTotalNoticesCount() {
	        return service.getTotalNoticesCount();
	    }
	    
	    @GetMapping("/lateNotices")
	    public List<Notice> lateNotices(){
	    	return service.lateNotices();
	    }
}
