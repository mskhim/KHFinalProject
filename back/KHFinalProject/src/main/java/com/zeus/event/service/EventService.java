package com.zeus.event.service;

import java.util.List;

import com.zeus.event.domain.EventReview;
import com.zeus.event.domain.EventSelectListDTO;
import com.zeus.event.domain.EventSelectReadDTO;
import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.event.domain.SortDTO;
import com.zeus.user.domain.User;

public interface EventService {
  //공공데이터를 db에서 가져와서 반환해주는 서비스 인터페이스
  List<PublicDataEventDTO> selectPublicDataEvent(User user);
  //이벤트 리스트 
  List<EventSelectListDTO> selectEventList(SortDTO sortDTO);
  //이벤트 리스트 페이지네이션 개수
  
  //이벤트 조회
  EventSelectReadDTO selectEventRead(SortDTO sortDTO);
  //이벤트 리뷰 조회
  List<EventReview>  selectEventReview(SortDTO sortDTO);
  //이벤트 리뷰 평균 평점계산
  Double selectEventReviewRating(SortDTO sortDTO);
  //이벤트 리뷰 페이지네이션
  int selectEventReviewCount(SortDTO sortDTO);
  
}
