package com.zeus.event.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventSelectListDTO {
    private int no;               // 시퀀스 (PK)
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String thumbUrl; // 메인 이미지 URL (유니크)
    private String address;
    private String rating;
    private double longitude;
    private double latitude;
}
