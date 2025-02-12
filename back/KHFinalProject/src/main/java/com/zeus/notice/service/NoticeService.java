package com.zeus.notice.service;

import java.util.List;

import com.zeus.notice.domain.Notice;

public interface NoticeService {
	List<Notice> getNotices();
	Notice getNoticeById(int no);// ✅ 공지사항 1개 조회 추가
	
}
