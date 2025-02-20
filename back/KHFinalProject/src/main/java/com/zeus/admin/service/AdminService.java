package com.zeus.admin.service;

import java.util.List;

import com.zeus.user.domain.User;
import com.zeus.admin.domain.AdminEventDTO;
import com.zeus.admin.domain.AdminPublicDataEvent;
import com.zeus.admin.domain.AdminReviewDTO;
import com.zeus.admin.domain.AdminStatsDTO;
import com.zeus.admin.domain.ManagerFestivalAuthDTO;
import com.zeus.notice.domain.Notice;
import com.zeus.admin.domain.AdminQnaDTO;
import com.zeus.admin.domain.AdminReservedDTO;
import com.zeus.admin.domain.AdminBannerDTO;

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
	
	public List<Notice> noticeSelectAllBySearch(String title) throws Exception;
	
	public void noticeInsert(Notice notice) throws Exception;

	public void noticeUpdate(Notice notice) throws Exception;
	
	public void noticeDelete(List<Integer> ids) throws Exception;

	public List<AdminReservedDTO> reservedSelectAllBySearch(String eventName) throws Exception;

	public List<AdminReservedDTO> canceledSelectAllBySearch(String eventName) throws Exception;

	public List<ManagerFestivalAuthDTO> managerFestivalAuthSellectAll(int managerNo) throws Exception;

	public void addFestivalAuth(int managerNo, int festivalNo) throws Exception;

	public void deleteFestivalAuth(int authNo) throws Exception;

	public List<AdminPublicDataEvent> publicDataEventSellectAll() throws Exception;

	public List<AdminBannerDTO> bannerSellectAll() throws Exception;

	public void insertBanner(AdminBannerDTO banner) throws Exception;

	public void deleteBanner(int bannerId) throws Exception;

	public List<AdminPublicDataEvent> eventSellectAll() throws Exception;

	public AdminStatsDTO getAdminStats() throws Exception;
}

