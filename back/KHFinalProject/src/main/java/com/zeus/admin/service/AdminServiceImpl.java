package com.zeus.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.admin.mapper.AdminMapper;
import com.zeus.user.domain.User;
import com.zeus.admin.domain.AdminEventDTO;
import com.zeus.admin.domain.AdminReviewDTO;

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
}
