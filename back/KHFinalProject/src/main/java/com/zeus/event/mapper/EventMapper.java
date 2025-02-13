package com.zeus.event.mapper;

import java.util.List;

import com.zeus.event.domain.EventReview;
import com.zeus.event.domain.EventSelectListDTO;
import com.zeus.event.domain.EventSelectRead;
import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.event.domain.SortDTO;
import com.zeus.user.domain.User;

public interface EventMapper {
	//이벤트 리스트 출력 기본출력은 그냥 등록순으로 할것 page값으로 페이징 처리.
	List<EventSelectListDTO> selectEventList(SortDTO sortDTO);
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
	
}
