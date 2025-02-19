package com.zeus.admin.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AdminReviewDTO {

    private Long no;
    private String content;
    private LocalDate subDate;
    private int eventNo;
    private int userAccountNo;
    private int rating;
    private String userName;
    private String eventName;
}
