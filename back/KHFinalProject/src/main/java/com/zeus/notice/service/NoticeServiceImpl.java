package com.zeus.notice.service;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.notice.domain.Notice;
import com.zeus.notice.mapper.NoticeMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	private NoticeMapper mapper;
	
	@Override
	public List<Notice> getAllNotices(String keyword) {
	    return mapper.getAllNotices(keyword);
	}
	
	 @Override
	    public List<Notice> getNoticesByPage(int page, int pageSize) {
		 return mapper.getNoticesByPage(page, pageSize);
	    }
	 @Override
	    public Notice getNoticeById(int no) {
	        return mapper.getNoticeById(no); // ✅ 추가된 메서드
	    }
	 @Override
	    public int getTotalNoticesCount() {
	        return mapper.getTotalNoticesCount();
	    }

	@Override
	public List<Notice> lateNotices() {
		return mapper.lateNotices();
	}
	 

}
