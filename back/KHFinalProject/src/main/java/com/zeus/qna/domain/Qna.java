package com.zeus.qna.domain;

import java.time.LocalDate;

import lombok.Data;

@Data
public class Qna {
    private int no;
    private int userAccountNo;
    private int eventNo;
    private String title;
    private String content;
    private LocalDate subDate;
    private int qnaNo;
    private int originalNo;

}