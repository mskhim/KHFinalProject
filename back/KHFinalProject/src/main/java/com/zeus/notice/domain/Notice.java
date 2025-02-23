package com.zeus.notice.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Notice {
	private int rowNo;
    private int no;            // 공지사항 번호 (PK)
    private String title;      // 제목
    private String content;    // 내용
    private LocalDate subDate; // 작성일 (기본값 SYSDATE)
}
