package com.zeus.user.domain;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Reserved
{
    private int no;               // 예약 번호 (PK)
    private String id;            // 예약 ID
    private int eventNo;          // 이벤트 번호 (FK, EVENT 테이블 참조)
    private int userAccountNo;    // 사용자 계정 번호 (FK, USER_ACCOUNT 테이블 참조)
    private int qt;               // 예약 수량
    private Date reservedDate; // 예약 날짜 (기본값 SYSDATE)
    private int totalCost;        // 총 비용
}
