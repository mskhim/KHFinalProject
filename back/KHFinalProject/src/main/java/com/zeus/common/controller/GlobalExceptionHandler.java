package com.zeus.common.controller;


import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ✅ 1. 데이터베이스 오류 (중복 데이터, 외래 키 위반 등)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDatabaseException(DataIntegrityViolationException ex) {
        Map<String, String> response = new HashMap<>();
        String errorMessage = "데이터 처리 중 오류가 발생했습니다.";
        String errorCode = "DB_ERROR"; // 기본 코드

        if (ex.getCause() instanceof ConstraintViolationException constraintEx) {
            SQLException sqlException = (SQLException) constraintEx.getCause();
            int oracleErrorCode = sqlException.getErrorCode();

            switch (oracleErrorCode) {
                case 1: // ORA-00001 (UNIQUE KEY 위반)
                    errorMessage = "동일한 데이터가 이미 존재합니다.";
                    errorCode = "DUPLICATE_ERROR";
                    break;
                case 2292: // ORA-02292 (FOREIGN KEY 제약 조건 위반)
                    errorMessage = "연관된 데이터가 있어 삭제할 수 없습니다.";
                    errorCode = "FK_CONSTRAINT_ERROR";
                    break;
                case 12899: // ORA-12899 (VARCHAR2 길이 초과)
                    errorMessage = "입력한 데이터가 허용된 길이를 초과했습니다.";
                    errorCode = "DATA_TOO_LONG";
                    break;
                default:
                    errorMessage = "데이터베이스 처리 중 알 수 없는 오류가 발생했습니다.";
            }
        }

        response.put("errorCode", errorCode);
        response.put("message", errorMessage);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // ✅ 2. 로그인 필요 (401 Unauthorized)
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Map<String, String>> handleAuthenticationException(AuthenticationException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("errorCode", "AUTH_REQUIRED");
        response.put("message", "로그인이 필요합니다.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    // ✅ 3. 권한 부족 (403 Forbidden)
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, String>> handleAccessDeniedException(AccessDeniedException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("errorCode", "ACCESS_DENIED");
        response.put("message", "접근 권한이 없습니다.");
        log.info("권한없음 실행");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    // ✅ 4. 잘못된 요청 (400 Bad Request)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("errorCode", "INVALID_REQUEST");
        response.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // ✅ 5. 서버 내부 오류 (500 Internal Server Error)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(Exception ex, HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        response.put("errorCode", "SERVER_ERROR");
        response.put("message", "서버 내부 오류가 발생했습니다.");
        response.put("path", request.getRequestURI()); // 요청한 URL 포함

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
