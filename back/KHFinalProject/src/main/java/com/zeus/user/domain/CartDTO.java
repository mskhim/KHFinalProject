package com.zeus.user.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CartDTO
{ 
    private int no;					// 장바구니 번호 (PK) 
    private String name;			// 축제명.
    private int qt;					// 수량.
    private LocalDate startDate;	// 시작 날짜.
    private LocalDate endDate;		// 종료 날짜.
    private String content;			// 축제 내용.
    private int price;				// 예매 가격. 
    private int eventNo;			// 
}
