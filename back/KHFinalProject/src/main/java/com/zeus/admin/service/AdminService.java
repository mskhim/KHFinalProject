package com.zeus.admin.service;

import java.util.List;

import com.zeus.user.domain.User;
import com.zeus.admin.domain.AdminEventDTO;
import com.zeus.admin.domain.AdminReviewDTO;
import com.zeus.admin.domain.AdminQnaDTO;

public interface AdminService {
	
	public void insert(String name);

	public List<User> managerSelectAllBySearch(String name) throws Exception;

	public void managerInsert(User user) throws Exception;

	public void managerUpdate(User user) throws Exception;
	
	public void managerDelete(List<Integer> ids) throws Exception;

	public List<User> userSelectAllBySearch(String id) throws Exception;

	public void userDelete(List<Integer> ids) throws Exception;

	public List<AdminEventDTO> festivalSelectAllBySearch(String eventName) throws Exception;

	public void festivalDelete(List<Integer> ids) throws Exception;

	public List<AdminReviewDTO> reviewSelectAllBySearch(String eventName) throws Exception;

	public void reviewDelete(List<Integer> ids) throws Exception;

	public List<AdminQnaDTO> qnaSelectAllBySearch(String eventName) throws Exception;

	public void qnaDelete(List<Integer> ids) throws Exception;
}

