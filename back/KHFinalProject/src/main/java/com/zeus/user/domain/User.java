package com.zeus.user.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@Data
public class User {
    private int no;                // 시퀀스 번호
    private String id;             // 아이디 (4~12자)
    private String pwd;            // 비밀번호 (8~12자)
    private String name;            // 이름 
    private String email;           // 이메일 
    private String phone;          // 전화번호 (010-XXXX-XXXX 형식)
    private char gender;           // 성별 ('M' or 'F')
    private LocalDate regDate;     // 가입 날짜
    private int role;              // 권한 (0: Admin, 1: Manager, 2: User)
    private LocalDate birth;       // 생년월일
    private int region;            // 지역 (0~99)
    private String provider;       // 계정 종류 (네이버, 카카오 등)
}
