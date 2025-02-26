# 🛠️ 클라우드 기반 웹 애플리케이션 프로젝트

## 📌 프로젝트 개요
Spring Boot와 React를 활용하여 **클라우드 기반 웹 애플리케이션**을 개발한 프로젝트입니다.  
Oracle Cloud DB와 Firebase Storage를 사용하여 데이터 저장 및 관리를 수행하였으며,  
Kakao 로그인 API를 연동하여 인증 기능을 구현하였습니다.

---

## 🚀 기술 스택

### ✅ **Frontend**
- React (JavaScript)
- Axios (API 통신)
- HTML5 / CSS3
- Firebase Hosting (예정)

### ✅ **Backend**
- Java (Spring Boot)
- MyBatis (ORM)
- Oracle Cloud DB
- Spring Security (인증 및 보안)

### ✅ **DevOps & Tools**
- GitHub (형상 관리)
- Postman (API 테스트)
- IntelliJ / VS Code
- Windows 10 / Tomcat

---

## 🔥 주요 기능

### 1️⃣ 사용자 인증 및 관리
- **Kakao 로그인 API**를 활용한 OAuth 로그인 구현
- 사용자 정보 관리 및 JWT 토큰 인증

### 2️⃣ 게시판 기능
- **CRUD (게시글 작성, 조회, 수정, 삭제)**
- **Oracle Cloud DB**를 이용한 데이터 저장
- **React를 활용한 동적인 UI 구성**

### 3️⃣ 파일 업로드 및 관리
- **Firebase Storage**를 활용한 이미지 업로드 및 저장
- 파일 다운로드 및 삭제 기능 지원

### 4️⃣ 클라우드 기반 데이터 관리
- **Oracle Cloud DB**를 활용한 데이터 저장소 운영
- **MyBatis를 통한 SQL 매핑 및 쿼리 최적화**
- RESTful API 설계 및 데이터 전송

---


## ⚡ 실행 방법

### 🔹 **1. 백엔드(Spring Boot) 실행**
```bash
cd backend
./mvnw spring-boot:run

cd frontend
npm install  # 패키지 설치
npm start  # 개발 서버 실행


