package com.zeus.event.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventReview {
    private int no;       // 시퀀스 (PK)
    private int eventNo;  // 축제번호 (FK)
    private String content;   // 서브 이미지 URL (유니크)
    private LocalDate subDate; // 메인 이미지 URL (유니크)
    private int userAccountNo;
    private String name;
    private Double rating;
}
