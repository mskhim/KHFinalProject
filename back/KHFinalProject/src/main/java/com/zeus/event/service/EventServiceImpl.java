package com.zeus.event.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventReview;
import com.zeus.event.domain.EventSelectListDTO;
import com.zeus.event.domain.EventSelectReadDTO;
import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.event.domain.SortDTO;
import com.zeus.event.mapper.EventMapper;
import com.zeus.user.domain.Cart;
import com.zeus.user.domain.User;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class EventServiceImpl implements EventService {
	@Autowired
	private EventMapper mapper;

	@Override
	public List<PublicDataEventDTO> selectPublicDataEvent(User user) {
		return mapper.selectPublicDataEvent(user);
	}

	@Override
	public List<EventSelectListDTO> selectEventList(SortDTO sortDTO) {
		log.info("서비스시작");
	 List<EventSelectListDTO> list= mapper.selectEventList(sortDTO);
		log.info(list+"");
		return list;
	}

	@Override
	public EventSelectReadDTO selectEventRead(SortDTO sortDTO) {
		EventSelectReadDTO readDTO = new EventSelectReadDTO();
		readDTO.setEventSelectRead(mapper.selectEventRead(sortDTO));
		readDTO.setUrl(mapper.selectEventReadSub(sortDTO));
		return readDTO;
	}

	@Override
	public List<EventReview> selectEventReview(SortDTO sortDTO) {
		return mapper.selectEventReadReview(sortDTO);
	}

	@Override
	public Double selectEventReviewRating(SortDTO sortDTO) {
		Double total = 0.0;
		for(Double data :mapper.selectEventReadReviewRating(sortDTO)) {
			total +=data;
		}
		return total/mapper.selectEventReadReviewCount(sortDTO);
	}

	@Override
	public int selectEventReviewCount(SortDTO sortDTO) {
		return mapper.selectEventReadReviewCount(sortDTO);
	}

	@Override
	public boolean insertEventReview(EventReview eventReview) {
		return mapper.insertEventReview(eventReview);
		
	}

	@Override
	public boolean deleteEventReview(EventReview eventReview) {
		return mapper.deleteEventReview(eventReview);
	}

	@Override
	public boolean deleteEvent(EventDTO eventDTO) {
		return mapper.deleteEvent(eventDTO);
	}

	@Override
	public boolean insertEventToCart(Cart cart) {
		return mapper.insertEventToCart(cart);
	}

	@Override
	public List<EventSelectListDTO> selectEventListMonth(SortDTO sortDTO) {
		return mapper.selectEventListMonth(sortDTO);
	}

	@Override
	public boolean cartDuplCheck(Cart cart) {
		int no = mapper.cartDuplCheck(cart);
		if(no>=1) {
			return false;
		}
		return true;
	}

	
}
