package com.zeus.notice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.notice.domain.Notice;
import com.zeus.notice.mapper.NoticeMapper;

@Service
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	private NoticeMapper mapper;
	
	 @Override
	    public List<Notice> getNotices() {
	        return mapper.getNotices();
	    }
}
