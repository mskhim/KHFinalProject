package com.zeus.qna.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Qna {
    private int no;            // Q&A 글 번호 (PK)
    private String title;      // 질문 제목
    private String content;    // 질문 내용
    private LocalDate subDate; // 작성일 (기본값 SYSDATE)
    private int memberNo;      // 회원번호 (FK, USER_ACCOUNT 테이블 참조)
    private int qnaNo;         // 계층용 번호 (기본값 0)
}
