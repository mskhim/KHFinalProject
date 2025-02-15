package com.zeus.qna.domain;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class QnaDTO {
    private int no;
    private int userAccountNo;
    private String userName;
    private String eventName;
    private int eventNo;
    private String title;
    private String content;
    private LocalDateTime subDate;
    private int qnaNo;
}