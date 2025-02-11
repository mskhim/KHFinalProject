package com.zeus.event.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventImg {
    private int no;       // 시퀀스 (PK)
    private int eventNo;  // 축제번호 (FK)
    private String url;   // 서브 이미지 URL (유니크)
    private String thumbUrl; // 메인 이미지 URL (유니크)
}
