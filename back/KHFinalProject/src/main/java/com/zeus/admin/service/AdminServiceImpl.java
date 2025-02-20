package com.zeus.admin.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zeus.admin.domain.AdminBannerDTO;
import com.zeus.admin.domain.AdminEventDTO;
import com.zeus.admin.domain.AdminPublicDataEvent;
import com.zeus.admin.domain.AdminQnaDTO;
import com.zeus.admin.domain.AdminReservedDTO;
import com.zeus.admin.domain.AdminReviewDTO;
import com.zeus.admin.domain.AdminStatsDTO;
import com.zeus.admin.domain.ManagerFestivalAuthDTO;
import com.zeus.admin.mapper.AdminMapper;
import com.zeus.notice.domain.Notice;
import com.zeus.user.domain.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminMapper mapper;
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public String encodePassword(String rawPassword) {
		return passwordEncoder.encode(rawPassword); // ✅ 비밀번호 해싱
	}

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
		user.setPwd(encodePassword(user.getPwd()));
		mapper.managerInsert(user);
	}

	@Override
	public void managerUpdate(User user) throws Exception {
		user.setPwd(encodePassword(user.getPwd()));
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

	@Override
	public List<AdminBannerDTO> bannerSellectAll() throws Exception {
		return mapper.bannerSellectAll();
	}

	@Override
	public void insertBanner(AdminBannerDTO banner) throws Exception {
		mapper.insertBanner(banner);
	}

	@Override
	public void deleteBanner(int bannerId) throws Exception {
		mapper.deleteBanner(bannerId);
	}

	@Override
	public List<AdminPublicDataEvent> eventSellectAll() throws Exception {
		return mapper.eventSellectAll();
	}

	@Override
	public AdminStatsDTO getAdminStats() throws Exception {
	    AdminStatsDTO statsDTO = new AdminStatsDTO();

	    // ✅ 성별 통계 (남성, 여성)
	    List<Integer> genderStats = List.of(
	        mapper.getGenderStats("M").isEmpty() ? 0 : mapper.getGenderStats("M").get(0), 
	        mapper.getGenderStats("F").isEmpty() ? 0 : mapper.getGenderStats("F").get(0)
	    );
	    statsDTO.setGenderData(genderStats);

	    // ✅ 연령대 통계 (10대, 20대, 30대, 40대, 50대, 60대 이상)
	    List<Map<String, Object>> ageStats = mapper.getAgeGroupStats();
	    Map<String, Integer> ageMap = new HashMap<>();
	    List<String> ageGroups = List.of("10대", "20대", "30대", "40대", "50대", "60대 이상");

	    // 기존 데이터 매핑
	    for (Map<String, Object> stat : ageStats) {
	        ageMap.put((String) stat.get("age_group"), ((Number) stat.get("count")).intValue());
	    }
	    // 모든 연령대가 존재하도록 0으로 채움
	    List<Integer> ageValues = ageGroups.stream()
	            .map(group -> ageMap.getOrDefault(group, 0))
	            .collect(Collectors.toList());
	    statsDTO.setAvgData(ageValues);

	    // ✅ 예약 통계 (매월 데이터 누락 시 0으로 채움)
	    List<Map<String, Object>> reservedStats = mapper.getReservedStats();
	    Map<String, Integer> reservedMap = reservedStats.stream()
	            .collect(Collectors.toMap(
	                stat -> (String) stat.get("month"),
	                stat -> ((Number) stat.get("count")).intValue()
	            ));

	    List<Integer> reservedValues = generateMonthlyData(reservedMap);
	    statsDTO.setReservedData(reservedValues);

	    // ✅ 축제 통계 (매월 데이터 누락 시 0으로 채움)
	    List<Map<String, Object>> eventStats = mapper.getEventStats();
	    Map<String, Integer> eventMap = eventStats.stream()
	            .collect(Collectors.toMap(
	                stat -> (String) stat.get("month"),
	                stat -> ((Number) stat.get("count")).intValue()
	            ));

	    List<Integer> eventValues = generateMonthlyData(eventMap);
	    statsDTO.setEventData(eventValues);

	    return statsDTO;
	}

	/**
	 * 1월 ~ 12월까지 모든 월이 포함되도록 0으로 채워주는 메서드
	 */
	private List<Integer> generateMonthlyData(Map<String, Integer> dataMap) {
	    int currentYear = LocalDate.now().getYear(); // 현재 연도 자동 가져오기

	    List<String> months = List.of(
	        "01", "02", "03", "04", "05", "06", 
	        "07", "08", "09", "10", "11", "12"
	    );

	    return months.stream()
	            .map(month -> dataMap.getOrDefault(currentYear + "-" + month, 0)) // 현재 연도 적용
	            .collect(Collectors.toList());
	}

}
