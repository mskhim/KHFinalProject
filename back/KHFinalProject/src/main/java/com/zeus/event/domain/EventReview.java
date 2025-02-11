package com.zeus.event.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
public class EventReview {
    private int no;               // 리뷰 번호 (PK)
    private String title;         // 리뷰 제목
    private String content;       // 리뷰 내용
    private Date subDate;         // 작성일 (기본값 SYSDATE)
    private int eventNo;          // 이벤트 번호 (FK, EVENT 테이블 참조)
    private int userAccountNo;    // 작성자 (FK, USER_ACCOUNT 테이블 참조)
    private double rating;        // 평점 (4,2)
}
