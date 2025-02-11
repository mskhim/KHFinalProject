package com.zeus.user.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Canceled {
    private int no;               // 취소 번호 (PK)
    private String id;            // 취소 ID
    private int eventNo;          // 이벤트 번호 (FK, EVENT 테이블 참조)
    private int userAccountNo;    // 사용자 계정 번호 (FK, USER_ACCOUNT 테이블 참조)
    private int qt;               // 취소된 수량
    private LocalDate reservedDate; // 원래 예약 날짜 (기본값 SYSDATE)
    private int totalCost;        // 취소된 총 비용
}
