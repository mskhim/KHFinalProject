package com.zeus.notice.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zeus.notice.domain.Notice;


public interface NoticeMapper {
	List<Notice> getAllNotices(@Param("keyword") String keyword);
	List<Notice> getNoticesByPage(@Param("page") int page, @Param("pageSize") int pageSize);
	Notice getNoticeById(int no);
	int getTotalNoticesCount();
	List<Notice> lateNotices();
}
