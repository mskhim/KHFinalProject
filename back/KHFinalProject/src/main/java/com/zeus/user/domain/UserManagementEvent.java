package com.zeus.user.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserManagementEvent {
    private int no;                 // 매니저 관리 번호 (PK)
    private int publicDataEventNo;  // 공공데이터 축제번호 (FK)
    private int userAccountNo;      // 매니저 계정번호 (FK)
    private LocalDate regDate;      // 등록 날짜 (기본값 SYSDATE)
}
