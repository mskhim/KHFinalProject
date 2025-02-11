package com.zeus.main.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Banner {
	 private int no;            // 비디오 번호 (PK)
	    private int eventNo;       // 이벤트 번호 (FK, EVENT 테이블 참조)
	    private String url;        // 비디오 URL
	    private LocalDate subDate; // 등록일 (기본값 SYSDATE)
}
