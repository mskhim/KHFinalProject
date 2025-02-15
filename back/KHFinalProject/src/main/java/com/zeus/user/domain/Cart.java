package com.zeus.user.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class Cart
{
    private int no;                // 장바구니 번호 (PK)
    private int eventNo;           // 축제 번호 (FK)
    private int userAccountNo;     // 회원 번호 (FK)
    private int qt;                // 수량 (기본값 1)
    private LocalDate subDate;     // 등록일자 (기본값 SYSDATE)
}
