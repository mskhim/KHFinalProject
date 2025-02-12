package com.zeus.event.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventSelectList {
    private int no;               // 시퀀스 (PK)
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String thumbUrl; // 메인 이미지 URL (유니크)
}
