package com.zeus.admin.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminQnaDTO {
    private Long questionNo;
    private String eventName;
    private String questionTitle;
    private String questionContent;
    private String questionWriter;
    private LocalDate questionDate;
    private int answerNo;
    private String answerContent;
    private String answerWriter;
    private LocalDate answerDate;
}
