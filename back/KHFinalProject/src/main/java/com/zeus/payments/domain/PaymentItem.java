package com.zeus.payments.domain;


import lombok.Data;

@Data
public class PaymentItem {
    private int id; // 장바구니 아이템 ID
    private int eventNo; // 이벤트 ID
    private int price; // 프론트에서 계산한 가격
    private int qt; // 수량
}

