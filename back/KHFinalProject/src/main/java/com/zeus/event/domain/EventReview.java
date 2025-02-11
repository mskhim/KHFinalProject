package com.zeus.event.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventReview {
    private int no;               // 리뷰 번호 (PK)
    private String title;         // 리뷰 제목
    private String content;       // 리뷰 내용
    private LocalDate subDate;         // 작성일 (기본값 SYSDATE)
    private int eventNo;          // 이벤트 번호 (FK, EVENT 테이블 참조)
    private int userAccountNo;    // 작성자 (FK, USER_ACCOUNT 테이블 참조)
    private double rating;        // 평점 (4,2)
}
