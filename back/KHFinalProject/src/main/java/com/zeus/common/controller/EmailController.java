package com.zeus.common.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.common.service.EmailService;
import com.zeus.user.domain.User;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/sendUserId")
    public ResponseEntity<String> sendUserId(@RequestBody User user) throws MessagingException {
        String email = user.getEmail();
        String userId = user.getId();
        if (email == null || userId == null) {
            return ResponseEntity.badRequest().body("❌ 요청 값이 올바르지 않습니다.");
        }

        String subject = " [VIVAFESTA] 아이디 찾기 안내";
        String body = "<div style='font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;'>"
                + "<h2 style='color: #2c3e50;'>안녕하세요, VIVAFESTA 입니다! </h2>"
                + "<p>고객님께서 요청하신 아이디 찾기 결과를 안내해드립니다.</p>"
                + "<div style='background: #ffffff; padding: 15px; border-radius: 5px; border: 1px solid #ddd;'>"
                + "<p><strong>📌 아이디:</strong> <span style='color: #e74c3c; font-size: 18px;'>" + userId + "</span></p>"
                + "</div>"
                + "<br>"
                + "<p>만약 본인이 요청한 것이 아니라면, 고객센터로 문의해 주세요.</p>"
                + "<p style='color: #999;'>감사합니다. 😊</p>"
                + "<p><strong>VIVAFESTA 팀 드림.</strong></p>"
                + "</div>";

        emailService.sendEmail(email, subject, body);
        return ResponseEntity.ok("✅ 아이디 찾기 이메일이 전송되었습니다!");
    }
    
    @PostMapping("/sendUserPwd")
    public ResponseEntity<String> sendUserPwd(@RequestBody User user) throws MessagingException {
        String email = user.getEmail();
        String pwd=user.getPwd();
       log.info(pwd);
       log.info(email);
        if (email == null || pwd ==null) {
            return ResponseEntity.badRequest().body("❌ 요청 값이 올바르지 않습니다.");
        }
        
        String subject = " [VIVAFESTA] 비밀번호 찾기 안내";
        String body = "<div style='font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;'>"
                + "<h2 style='color: #2c3e50;'>안녕하세요, VIVAFESTA 입니다! </h2>"
                + "<p>고객님께서 요청하신 임시 비밀번호를 안내해드립니다.</p>"
                + "<div style='background: #ffffff; padding: 15px; border-radius: 5px; border: 1px solid #ddd;'>"
                + "<p><strong>📌 임시 비밀번호 : </strong> <span style='color: #e74c3c; font-size: 18px;'>" + pwd + "</span></p>"
                + "</div>"
                + "<br>"
                + "<p>임시 비밀번호가 노출되었을 수 있으니, 로그인 후 비밀번호를 변경해 주시기 바랍니다.</p>"
                + "<p>만약 본인이 요청한 것이 아니라면, 고객센터로 문의해 주세요.</p>"
                + "<p style='color: #999;'>감사합니다. 😊</p>"
                + "<p><strong>VIVAFESTA 팀 드림.</strong></p>"
                + "</div>";

        emailService.sendEmail(email, subject, body);
        return ResponseEntity.ok("✅ 아이디 찾기 이메일이 전송되었습니다!");
    }
}
