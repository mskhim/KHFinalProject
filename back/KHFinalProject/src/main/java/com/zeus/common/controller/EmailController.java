package com.zeus.common.controller;

import com.zeus.common.service.EmailService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @GetMapping("/send")
    public String sendTestEmail(@RequestParam String to) throws MessagingException {
        String subject = "📢 네이버 SMTP 테스트 이메일";
        String body = "<h2>안녕하세요!</h2><p>이것은 네이버 SMTP를 통해 보낸 테스트 이메일입니다. 🚀</p>";

        emailService.sendEmail(to, subject, body);
        return "✅ 네이버 SMTP로 이메일이 전송되었습니다!";
    }
}
