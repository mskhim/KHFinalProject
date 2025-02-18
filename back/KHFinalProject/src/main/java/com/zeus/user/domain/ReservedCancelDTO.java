package com.zeus.user.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReservedCancelDTO
{
    private int cancelNo;          // 취소 내역 번호
    private int reservedNo;        // 예매 번호
    private int userAccountNo;     // 사용자 번호
    private int eventNo;           // 축제 번호
    private int qt;                // 인원 수
    private LocalDate cancelDate;           // 취소 날짜
    private int totalCost;            // 결제 금액
}
