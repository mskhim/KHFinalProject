package com.zeus.qna.domain;

import java.time.LocalDate;

import lombok.Data;

@Data
public class QnaDTO {
	
	private int rowNo;
    private int no;
    private int userAccountNo;
    private String userName; 	
    private String eventName;
    private int eventNo;
    private String title;
    private String content;
    private LocalDate subDate;
    private int qnaNo;
    private int originalNo;

}