package com.zeus.notice.service;

import java.util.List;
import java.util.Map;

import com.zeus.notice.domain.Notice;


public interface NoticeService {
	List<Notice> getAllNotices(String keyword);
	List<Notice> getNoticesByPage(int page, int pageSize);
	Notice getNoticeById(int no);// ✅ 공지사항 1개 조회 추가
	int getTotalNoticesCount();
	List<Notice> lateNotices();
}
