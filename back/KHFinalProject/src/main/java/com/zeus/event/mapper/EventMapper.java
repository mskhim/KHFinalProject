package com.zeus.event.mapper;

import java.util.List;

import com.zeus.event.domain.Event;
import com.zeus.event.domain.EventImg;

public interface EventMapper {
	//이벤트 게시판에 등록
	boolean insertEvent(Event event);
	//이벤트 게시판 no 값을 fk로 타이틀, 서브이미지 등록
	boolean insertEventImg(EventImg eventImg);
	//이벤트 리스트 출력 기본출력은 그냥 등록순으로 할것 page값으로 페이징 처리.
	List<Event> selectEventList(String page);
	//이벤트 리스트 출력 sort할 항목을 찾아서 sorting page값으로 페이징 처리.
	boolean selectEventListSorted(String page);
	
	
}
