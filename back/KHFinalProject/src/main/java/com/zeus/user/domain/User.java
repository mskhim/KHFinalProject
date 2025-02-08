package com.zeus.user.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class User {
	private int no; // 시퀀스 번호
	private String id; // 아이디 (4~12자)
	private String pwd; // 비밀번호 (8~12자)
	private String name; // 이름
	private String phone; // 전화번호 (010-XXXX-XXXX 형식)
	private String gender; // 성별 ('M' or 'F') → CHAR(1)과 맞추기 위해 String 사용
	private LocalDate regDate; // 가입 날짜
	private int role; // 권한 (0: Admin, 1: Manager, 2: User)
	private LocalDate birth; // 생년월일
	private String region; // 지역 (경기도, 서울 등) → VARCHAR(20)이므로 String 사용
	private String provider; // 계정 종류 (네이버, 카카오 등)
	private String apiid; // API 암호화 키 (MEMBER 테이블에 존재)
}
