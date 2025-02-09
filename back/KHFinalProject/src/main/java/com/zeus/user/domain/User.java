package com.zeus.user.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class User {
    private int no;           // 시퀀스 번호 (PRIMARY KEY)
    private String id;        // 아이디 (VARCHAR2(20))
    private String pwd;       // 비밀번호 (VARCHAR2(20))
    private String name;      // 이름 (VARCHAR2(20))
    private String phone;     // 전화번호 (VARCHAR2(15))
    private String email;     // 이메일 (VARCHAR2(500))
    private String gender;    // 성별 ('M' or 'F') → CHAR(1)과 맞추기 위해 String 사용
    private LocalDate regDate;// 가입 날짜 (DATE)
    private int role;         // 권한 (0: Admin, 1: Manager, 2: User)
    private LocalDate birth;  // 생년월일 (DATE)
    private String region;    // 지역 (VARCHAR2(20))
    private String provider;  // 계정 제공자 (VARCHAR2(20))
    private String nickname;     // 
}
