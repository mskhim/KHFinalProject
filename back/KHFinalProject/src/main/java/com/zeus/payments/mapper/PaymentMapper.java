package com.zeus.payments.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.zeus.payments.domain.PaymentRequest;

@Mapper
public interface PaymentMapper {

	// 예약 확정 테이블에 데이터 삽입
	void insertReservation(PaymentRequest request);

	// 장바구니에서 해당 아이템 삭제
	void deleteCartItem(@Param("cartNo") int cartNo);
	
    // 이벤트의 개별 가격 조회
    Integer getEventPrice(@Param("eventNo") int eventNo);

}
