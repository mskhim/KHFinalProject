package com.zeus.admin.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminQnaDTO {
    private int questionNo;
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
