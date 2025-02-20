package com.zeus.admin.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class AdminEventDTO {
    private Long no;
    private String publicDataEventNo;
    private int userAccountNo;
    private String price;
    private String rating;
    private String userName;
    private String eventName;
    private String place;
    private LocalDate startDate;
    private LocalDate endDate;
    private String content;
    private String tel;
    private String homepage;
}
