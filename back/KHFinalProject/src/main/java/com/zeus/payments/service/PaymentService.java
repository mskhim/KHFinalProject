package com.zeus.payments.service;

import java.util.List;
import java.util.Map;

import com.zeus.payments.domain.PaymentRequest;
import com.zeus.payments.domain.PaymentVerifyRequest;

public interface PaymentService {
	//결제창 들어갈때 수량과, 제품 가격이 맞는지 검증
	Map<String, Object> verifyPayment(PaymentVerifyRequest request);
	//토스 페이먼츠 키로 amount와 결제금액이 동일한지 검증
	boolean verifyPayment(String paymentKey, String orderId, String amount);
	//db의 event의 price와 비교하여 가격이 맞으면 카트에서 제거하고 reserved 테이블에 삽입
    boolean processReservation(List<PaymentRequest> requestList,String amount);
    //가격 조회 메서드
    Integer getEventPrice(int eventNo); // 이벤트 가격 조회 메서드 추가
}
