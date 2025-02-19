package com.zeus.admin.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.admin.mapper.AdminMapper;
import com.zeus.notice.domain.Notice;
import com.zeus.user.domain.User;
import com.zeus.admin.domain.AdminEventDTO;
import com.zeus.admin.domain.AdminPublicDataEvent;
import com.zeus.admin.domain.AdminReviewDTO;
import com.zeus.admin.domain.AdminQnaDTO;
import com.zeus.admin.domain.AdminReservedDTO;
import com.zeus.admin.domain.ManagerFestivalAuthDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminMapper mapper;

	@Override
	public void insert(String name) {
		mapper.insert(name);
	}

	@Override
	public List<User> managerSelectAllBySearch(String name) throws Exception {
		User user = new User();
		user.setName(name);
		return mapper.managerSelectAllBySearch(user);
	}

	@Override
	public void managerInsert(User user) throws Exception {
		mapper.managerInsert(user);
	}

	@Override
	public void managerUpdate(User user) throws Exception {
		mapper.managerUpdate(user);
	}

	@Override
	public void managerDelete(List<Integer> ids) throws Exception {
		mapper.managerDelete(ids);
	}

	@Override
	public List<User> userSelectAllBySearch(String id) throws Exception {
		User user = new User();
		user.setId(id);
		return mapper.userSelectAllBySearch(user);
	}

	@Override
	public void userDelete(List<Integer> ids) throws Exception {
		mapper.userDelete(ids);
	}

	@Override
	public List<AdminEventDTO> festivalSelectAllBySearch(String eventName) throws Exception {
		AdminEventDTO event = new AdminEventDTO();
		event.setEventName(eventName);
		return mapper.festivalSelectAllBySearch(event);
	}

	@Override
	public void festivalDelete(List<Integer> ids) throws Exception {
		mapper.festivalDelete(ids);
	}

	@Override
	public List<AdminReviewDTO> reviewSelectAllBySearch(String eventName) throws Exception {
		AdminReviewDTO review = new AdminReviewDTO();
		review.setEventName(eventName);
		return mapper.reviewSelectAllBySearch(review);
	}

	@Override
	public void reviewDelete(List<Integer> ids) throws Exception {
		mapper.reviewDelete(ids);
	}

	@Override
	public List<AdminQnaDTO> qnaSelectAllBySearch(String eventName) throws Exception {
		AdminQnaDTO qna = new AdminQnaDTO();
		qna.setEventName(eventName);
		return mapper.qnaSelectAllBySearch(qna);
	}

	@Override
	public void qnaDelete(List<Integer> ids) throws Exception {
		mapper.qnaDelete(ids);
	}

	@Override
	public List<Notice> noticeSelectAllBySearch(String title) throws Exception {
		com.zeus.notice.domain.Notice notice = new Notice();
		notice.setTitle(title);
		return mapper.noticeSelectAllBySearch(notice);
	}

	@Override
	public void noticeInsert(Notice notice) throws Exception {
		mapper.noticeInsert(notice);
	}

	@Override
	public void noticeUpdate(Notice notice) throws Exception {
		mapper.noticeUpdate(notice);
	}

	@Override
	public void noticeDelete(List<Integer> ids) throws Exception {
		mapper.noticeDelete(ids);
	}

	@Override
	public List<AdminReservedDTO> reservedSelectAllBySearch(String eventName) throws Exception {
		AdminReservedDTO reserved = new AdminReservedDTO();
		reserved.setEventName(eventName);
		return mapper.reservedSelectAllBySearch(reserved);
	}

	@Override
	public List<AdminReservedDTO> canceledSelectAllBySearch(String eventName) throws Exception {
		AdminReservedDTO canceled = new AdminReservedDTO();
		canceled.setEventName(eventName);
		return mapper.canceledSelectAllBySearch(canceled);
	}

	@Override
	public List<ManagerFestivalAuthDTO> managerFestivalAuthSellectAll(int managerNo) throws Exception {
		return mapper.managerFestivalAuthSellectAll(managerNo);
	}

	@Override
	public void addFestivalAuth(int managerNo, int festivalNo) throws Exception {
		Map<String, Integer> params = new HashMap<>();
		params.put("managerNo", managerNo);
		params.put("festivalNo", festivalNo);
		mapper.addFestivalAuth(params);
	}

	@Override
	public void deleteFestivalAuth(int authNo) throws Exception {
		Map<String, Integer> params = new HashMap<>();
		params.put("authNo", authNo);
		mapper.deleteFestivalAuth(params);
	}

	@Override
	public List<AdminPublicDataEvent> publicDataEventSellectAll() throws Exception {
		return mapper.publicDataEventSellectAll();
	}
}
