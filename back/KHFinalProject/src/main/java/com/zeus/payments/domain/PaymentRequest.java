package com.zeus.payments.domain;

import lombok.Data;

@Data
public class PaymentRequest {
    private String verifiedPaymentId;  // 원본 결제 ID
    private String reservationId; // 결제 항목별 고유 예매번호 (verifiedPaymentId + eventNo 조합
    private int userAccountNo;
    private int id; // 장바구니 아이템 ID
    private int eventNo; // 이벤트 ID
    private int price; // 프론트에서 계산한 가격
    private int qt; // 수량
}
