package com.zeus.event.mapper;

import java.util.List;

import com.zeus.event.domain.Event;
import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventImg;
import com.zeus.event.domain.PublicDataEvent;
import com.zeus.user.domain.User;

public interface EventMapper {
	//이벤트 게시판에 등록 매개변수 event의 no 값을 시퀀스로 자동 증가된 값으로 수정해서 주입
	boolean insertEvent(Event event);
	//이벤트 게시판 no 값을 fk로 타이틀, 서브이미지 등록
	boolean insertEventImg(EventImg eventImg);
	//이벤트 리스트 출력 기본출력은 그냥 등록순으로 할것 page값으로 페이징 처리.
	List<EventDTO> selectEventList(String page);
	//이벤트 리스트 출력 sort할 항목을 찾아서 sorting page값으로 페이징 처리.
	boolean selectEventListSorted(String page);
	//공공데이터 테이블을 이용하여 데이터를 select
	List<PublicDataEvent> selectPublicDataEvent(User user);
	
}
