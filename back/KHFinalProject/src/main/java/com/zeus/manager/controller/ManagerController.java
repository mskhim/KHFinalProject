package com.zeus.manager.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.zeus.common.config.JwtUtil;
import com.zeus.event.domain.Event;
import com.zeus.event.domain.EventImg;
import com.zeus.manager.service.ManagerService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/manager")
public class ManagerController {
	@Autowired
	private ManagerService service;
	@Autowired
	private JwtUtil JwtUtil;

	private static final String UPLOAD_DIR = "C:/uploads/event"; // 업로드할 폴더 경로 (윈도우)


	@PostMapping("/insertEventByManager")
	public ResponseEntity<?> insertEventByManager(@CookieValue(name = "jwt", required = false) String jwtToken,
			@RequestParam("eventNo") int eventNo, // 공공데이터 이벤트 번호
			@RequestParam("price") int price, @RequestParam("mainImage") MultipartFile mainImage,
			@RequestParam("subImages") MultipartFile[] subImages) {
		log.info("컨트롤러실행");
		try {
			if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {

				log.info("토큰만료");
				return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
			}
			// JWT가 유효하면 사용자 정보 반환
			int no = JwtUtil.validateToken(jwtToken).get("no", Integer.class);
			Event event = new Event();
			event.setUserAccountNo(no);
			event.setPrice(price);
			event.setPublicDataEventNo(eventNo);
			// 이벤트 테이블에 이벤트 저장, 이후에 event의 no값은 변경된 no 값으로 변경
			event = service.insertEventByManager(event);
			// event.getNo()는 이벤트 리스트의 키no
			// ✅ 대표 이미지 저장
			String mainImagePath = saveFile(mainImage, "Event_" + event.getNo() + "_Title", 1);
			EventImg ei = new EventImg();
			ei.setEventNo(event.getNo());
			ei.setThumbUrl(mainImagePath);
			service.insertEventImgByManagerThumb(ei);
			// ✅ 서브 이미지 저장

			String[] subImagePaths = new String[subImages.length];
			for (int i = 0; i < subImages.length; i++) {
				subImagePaths[i] = saveFile(subImages[i], "Event_" + event.getNo() + "_Sub", i + 1);
				ei.setThumbUrl(null);
				ei.setUrl(subImagePaths[i]);
				service.insertEventImgByManagerSub(ei);
			}

			// ✅ DB에 저장할 정보 출력 (이후 서비스에 연결)
			System.out.println("축제명: " + eventNo);
			System.out.println("대표 이미지 경로: " + mainImagePath);
			for (String path : subImagePaths) {
				System.out.println("서브 이미지 경로: " + path);
			}

			return ResponseEntity.ok("파일 업로드 성공");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("파일 업로드 실패: " + e.getMessage());
		}
	}

 // ✅ 파일 저장 메서드 (확장자 유지)
    private String saveFile(MultipartFile file, String tag, int no) throws IOException {
        if (file.isEmpty()) {
            return null;
        }
        
        // ✅ 파일명과 확장자 분리
        String originalFileName = file.getOriginalFilename();
        String extension = "";
        
        // ✅ 확장자 추출
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf(".")); // 확장자 추출 (.jpg, .png 등)
        }
        
        // ✅ 새로운 파일명 생성 (확장자 포함)
        String fileName = System.currentTimeMillis() + "_" + tag + "_" + no + extension;
        
        // ✅ 파일 저장 경로 지정
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        
        // ✅ 파일 저장
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        return "/uploads/event/" + fileName; // ✅ 저장된 파일 경로 반환 (DB 저장용 URL)
    }
	
	
	
	
}
