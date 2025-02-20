package com.zeus.admin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zeus.admin.domain.AdminBannerDTO;
import com.zeus.admin.domain.AdminEventDTO;
import com.zeus.admin.domain.AdminPublicDataEvent;
import com.zeus.admin.domain.AdminQnaDTO;
import com.zeus.admin.domain.AdminReservedDTO;
import com.zeus.admin.domain.AdminReviewDTO;
import com.zeus.admin.domain.ManagerFestivalAuthDTO;
import com.zeus.notice.domain.Notice;
import com.zeus.user.domain.User;

public interface AdminMapper {

	public void insert(String name);

// 매니저 관리 페이지

	// 매니저 전체 및 검색 전체조회
	public List<User> managerSelectAllBySearch(User user) throws Exception;

	// 매니저 추가
	public void managerInsert(User user) throws Exception;

	// 매니저 수정
	public void managerUpdate(User user) throws Exception;

	// 매니저 삭제
	public void managerDelete(List<Integer> ids) throws Exception;

// 유저 관리 페이지

	// 유저 전체 및 검색 전체조회
	public List<User> userSelectAllBySearch(User user) throws Exception;

	// 유저 삭제
	public void userDelete(List<Integer> ids) throws Exception;

// 축제 관리 페이지
	
	// 축제 전체 및 검색 전체조회
	public List<AdminEventDTO> festivalSelectAllBySearch(AdminEventDTO event) throws Exception;

	// 축제 삭제
	public void festivalDelete(List<Integer> ids) throws Exception;

// 축제 권한 관리

	// 해당매니저 등록된 축제 권한 전체 조회
	public List<ManagerFestivalAuthDTO> managerFestivalAuthSellectAll(int managerNo) throws Exception;

	// 해당매니저 신규 축제 권한 추가
	public void addFestivalAuth(Map<String, Integer> params) throws Exception;

	// 해당매니저 등록된 축제 권한 삭제
	public void deleteFestivalAuth(Map<String, Integer> params) throws Exception;

// 리뷰 관리 페이지
	
	// 리뷰 전체 및 검색 전체조회
	public List<AdminReviewDTO> reviewSelectAllBySearch(AdminReviewDTO review) throws Exception;

	// 리뷰 삭제
	public void reviewDelete(List<Integer> ids) throws Exception;

// QnA 관리 페이지
	
	// QnA 전체 및 검색 전체조회
	public List<AdminQnaDTO> qnaSelectAllBySearch(AdminQnaDTO qna) throws Exception;
	
	// QnA 삭제
	public void qnaDelete(List<Integer> ids) throws Exception;

// 공지사항 관리 페이지

	// 공지사항 전체 및 검색 전체조회
	public List<Notice> noticeSelectAllBySearch(Notice notice) throws Exception;

	// 공지사항 추가
	public void noticeInsert(Notice notice) throws Exception;

	// 공지사항 수정
	public void noticeUpdate(Notice notice) throws Exception;

	// 공지사항 삭제
	public void noticeDelete(List<Integer> ids) throws Exception;
	
// 배너 관리 페이지
	public List<AdminBannerDTO> bannerSellectAll() throws Exception;

	public void insertBanner(AdminBannerDTO banner) throws Exception;

	public void deleteBanner(int bannerId) throws Exception;

//	예매내역 관리 페이지
	
	// 예매내역 전체 및 검색 전체조회
	public List<AdminReservedDTO> reservedSelectAllBySearch(AdminReservedDTO reserved) throws Exception;

//	예매취소내역 관리 페이지
	
	// 취소된 예매내역 전체 및 검색 전체조회
	public List<AdminReservedDTO> canceledSelectAllBySearch(AdminReservedDTO canceled) throws Exception;

	// 공공데이터 이벤트 전체 조회
	public List<AdminPublicDataEvent> publicDataEventSellectAll() throws Exception;

	// 이벤트 전체 조회
	public List<AdminPublicDataEvent> eventSellectAll() throws Exception;
	List<Integer> getGenderStats(@Param("gender") String gender);  // 성별 통계
    List<Map<String, Object>> getAgeGroupStats();  // 연령대 통계
    List<Map<String, Object>> getReservedStats();  // 예약 통계
    List<Map<String, Object>> getEventStats();  // 축제 통계
}
