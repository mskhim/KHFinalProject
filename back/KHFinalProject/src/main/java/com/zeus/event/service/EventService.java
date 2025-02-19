package com.zeus.event.service;

import java.util.List;

import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventReview;
import com.zeus.event.domain.EventSelectListDTO;
import com.zeus.event.domain.EventSelectReadDTO;
import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.event.domain.SortDTO;
import com.zeus.user.domain.Cart;
import com.zeus.user.domain.User;

public interface EventService {
	// 공공데이터를 db에서 가져와서 반환해주는 서비스 인터페이스
	List<PublicDataEventDTO> selectPublicDataEvent(User user);

	// 이벤트 리스트
	List<EventSelectListDTO> selectEventList(SortDTO sortDTO);

	// 이벤트 리스트 페이지네이션 개수
	// 이벤트 조회
	EventSelectReadDTO selectEventRead(SortDTO sortDTO);

	// 이벤트 리뷰 조회
	List<EventReview> selectEventReview(SortDTO sortDTO);

	// 이벤트 리뷰 평균 평점계산
	Double selectEventReviewRating(SortDTO sortDTO);

	// 이벤트 리뷰 페이지네이션
	int selectEventReviewCount(SortDTO sortDTO);

	// 리뷰 인서트
	boolean insertEventReview(EventReview eventReview);

	// 리뷰 삭제
	boolean deleteEventReview(EventReview eventReview);

	// 축제 게시글 삭제
	boolean deleteEvent(EventDTO eventDTO);

	// 축제 티켓 장바구니에등록
	boolean insertEventToCart(Cart cart);
	//월별 리스트 출력을 위해서
	List<EventSelectListDTO> selectEventListMonth(SortDTO sortDTO);
	//카트에 항목 추가전 중복되는 항목이 있는지 확인 중복되는항목 있으면 false 반환해야함
	boolean cartDuplCheck(Cart cart);

}
