package com.zeus.event.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventReview;
import com.zeus.event.domain.EventSelectListDTO;
import com.zeus.event.domain.EventSelectRead;
import com.zeus.event.domain.PublicDataEvent;
import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.event.domain.SortDTO;
import com.zeus.user.domain.Cart;
import com.zeus.user.domain.User;

public interface EventMapper {
	//이벤트 리스트 출력 기본출력은 그냥 등록순으로 할것 page값으로 페이징 처리.
	List<EventSelectListDTO> selectEventList(SortDTO sortDTO);
	//이벤트 리스트 페이지네이션용 개수
	//공공데이터 테이블을 이용하여 데이터를 select
	List<PublicDataEventDTO> selectPublicDataEvent(User user);
	//이벤트 조회시 이벤트 데이터 select
	EventSelectRead selectEventRead(SortDTO sortDTO);
	//이벤트 조회시 이벤트 서브이미지 list
	List<String> selectEventReadSub(SortDTO sortDTO);
	//이벤트 조회시 이벤트 리뷰 list
	List<EventReview> selectEventReadReview(SortDTO sortDTO);
	//이벤트 조회시 이벤트 리뷰 list
	int selectEventReadReviewCount(SortDTO sortDTO);
	//이벤트 리뷰의 평균 별점 합계
	List<Double> selectEventReadReviewRating(SortDTO sortDTO);
	//이벤트 리뷰 추가
	boolean insertEventReview(EventReview eventReview);
	//이벤트 리뷰 삭제
	boolean deleteEventReview(EventReview eventReview);
	//이벤트 게시글 삭제
	boolean deleteEvent(EventDTO eventDTO);
	//이벤트 장바구니에 등록
	boolean insertEventToCart(Cart cart);
	//sortDTO에 date 값을 읽어서 해당 날짜의 월에 해당하는 모든 이벤트 호출
	List<EventSelectListDTO> selectEventListMonth(SortDTO sortDTO);
	//cart 에 userno 와 eventNo 를 확인해서 중복되는 항목없게
	int cartDuplCheck(Cart cart);
	//event_review 에 userAccountNo, eventNo 를 이용해서 이미 작성한 댓글이 있는지 확인
	int checkReplyAlready(EventReview eventReview);
	//reserved 에 userAccountNo, eventNo 를 이용해서 예매한 축제인지 확인.
	int checkReserved(EventReview eventReview);
	//event 페이지에 eventNo 를 이용해서 가격 추출
	int checkEventPrice(EventReview eventReview);
    int checkExistingEvent(@Param("name") String name, @Param("startDate") String startDate);
    void insertEvent(PublicDataEvent event);
    List<PublicDataEvent> getAllEvents();
    List<String> getAllEventNamesAndDates();
	
}
