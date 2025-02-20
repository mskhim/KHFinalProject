package com.zeus.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.zeus.admin.service.AdminService;
import com.zeus.notice.domain.Notice;
import com.zeus.user.domain.User;
import com.zeus.admin.domain.AdminEventDTO;
import com.zeus.admin.domain.AdminQnaDTO;
import com.zeus.admin.domain.AdminReviewDTO;
import com.zeus.admin.domain.AdminStatsDTO;
import com.zeus.admin.domain.ManagerFestivalAuthDTO;
import com.zeus.admin.domain.AdminReservedDTO;
import com.zeus.admin.domain.AdminPublicDataEvent;
import com.zeus.admin.domain.AdminBannerDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/admin")
public class AdminController {

	@Autowired
	private AdminService service;

	@GetMapping("/test")
	public Map<String, String> test() {
		Map<String, String> response = new HashMap<>();
		response.put("test", "Hello from Spring Boot!");
		return response;
	}

	@PostMapping("/insert")
	public ResponseEntity<String> insert(@RequestBody Map<String, String> requestData) {
		String name = requestData.get("name"); // "name" 필드의 값 추출
		System.out.println("Received name: " + name);
		service.insert(name);

		return ResponseEntity.ok("Success");
	}

	@GetMapping("/managerSelectAllBySearch")
	public List<User> managerSelectAllBySearch(@RequestParam(name = "name", defaultValue = "") String name)
			throws Exception {
		return service.managerSelectAllBySearch(name);
	}

	@PostMapping("/managerInsert")
	public ResponseEntity<String> managerInsert(@RequestBody User user) {
		try {
			service.managerInsert(user);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to insert manager");
		}
	}

	@PutMapping("/managerUpdate")
	public ResponseEntity<String> managerUpdate(@RequestBody User user) {
		try {
			service.managerUpdate(user);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to update manager", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update manager");
		}
	}

	@DeleteMapping("/managerDelete")
	public ResponseEntity<String> managerDelete(@RequestBody Map<String, List<Integer>> requestData) {
		try {
			List<Integer> ids = requestData.get("ids");
			service.managerDelete(ids);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to delete managers", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete managers");
		}
	}

	@GetMapping("/userSelectAllBySearch")
	public List<User> userSelectAllBySearch(@RequestParam(name = "id", defaultValue = "") String id) throws Exception {
		return service.userSelectAllBySearch(id);
	}

	@DeleteMapping("/userDelete")
	public ResponseEntity<String> userDelete(@RequestBody Map<String, List<Integer>> requestData) {
		try {
			List<Integer> ids = requestData.get("ids");
			service.userDelete(ids);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to delete users", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete users");
		}
	}

	@GetMapping("/festivalSelectAllBySearch")
	public List<AdminEventDTO> festivalSelectAllBySearch(
			@RequestParam(name = "eventName", defaultValue = "") String eventName) throws Exception {
		return service.festivalSelectAllBySearch(eventName);
	}

	@DeleteMapping("/festivalDelete")
	public ResponseEntity<String> festivalDelete(@RequestBody Map<String, List<Integer>> requestData) {
		try {
			List<Integer> ids = requestData.get("ids");
			service.festivalDelete(ids);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to delete festivals", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete festivals");
		}
	}

	@GetMapping("/reviewSelectAllBySearch")
	public List<AdminReviewDTO> reviewSelectAllBySearch(
			@RequestParam(name = "eventName", defaultValue = "") String eventName) throws Exception {
		return service.reviewSelectAllBySearch(eventName);
	}

	@DeleteMapping("/reviewDelete")
	public ResponseEntity<String> reviewDelete(@RequestBody Map<String, List<Integer>> requestData) {
		try {
			List<Integer> ids = requestData.get("ids");
			service.reviewDelete(ids);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to delete reviews", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete reviews");
		}
	}

	@GetMapping("/qnaSelectAllBySearch")
	public List<AdminQnaDTO> qnaSelectAllBySearch(@RequestParam(name = "eventName", defaultValue = "") String eventName) throws Exception {
		return service.qnaSelectAllBySearch(eventName);
	}

	@DeleteMapping("/qnaDelete")
	public ResponseEntity<String> qnaDelete(@RequestBody Map<String, List<Integer>> requestData) {
		try {
			List<Integer> ids = requestData.get("ids");
			service.qnaDelete(ids);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to delete QnAs", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete QnAs");
		}
	}

	@GetMapping("/noticeSelectAllBySearch")
	public List<Notice> noticeSelectAllBySearch(@RequestParam(name = "title", defaultValue = "") String title) throws Exception {
		return service.noticeSelectAllBySearch(title);
	}

	@PostMapping("/noticeInsert")
	public ResponseEntity<String> noticeInsert(@RequestBody Notice notice) {
		try {
			service.noticeInsert(notice);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to insert notice");
		}
	}

	@PutMapping("/noticeUpdate")
	public ResponseEntity<String> noticeUpdate(@RequestBody Notice notice) {
		try {
			service.noticeUpdate(notice);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to update notice", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update notice");
		}
	}

	@DeleteMapping("/noticeDelete")
	public ResponseEntity<String> noticeDelete(@RequestBody Map<String, List<Integer>> requestData) {
		try {
			List<Integer> ids = requestData.get("ids");
			service.noticeDelete(ids);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to delete notices", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete notices");
		}
	}

	@GetMapping("/reservedSelectAllBySearch")
	public List<AdminReservedDTO> reservedSelectAllBySearch(@RequestParam(name = "eventName", defaultValue = "") String eventName) throws Exception {
		return service.reservedSelectAllBySearch(eventName);
	}

	@GetMapping("/canceledSelectAllBySearch")
	public List<AdminReservedDTO> canceledSelectAllBySearch(@RequestParam(name = "eventName", defaultValue = "") String eventName) throws Exception {
		return service.canceledSelectAllBySearch(eventName);
	}

	@GetMapping("/managerFestivalAuthSellectAll")
	public List<ManagerFestivalAuthDTO> managerFestivalAuthSellectAll(@RequestParam int managerNo) throws Exception {
		return service.managerFestivalAuthSellectAll(managerNo);
	}

	@PostMapping("/addFestivalAuth")
	public ResponseEntity<String> addFestivalAuth(@RequestBody Map<String, Integer> requestData) {
		try {
			int managerNo = requestData.get("managerNo");
			int festivalNo = requestData.get("festivalNo");
			service.addFestivalAuth(managerNo, festivalNo);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to add festival auth", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add festival auth");
		}
	}

	@DeleteMapping("/deleteFestivalAuth")
	public ResponseEntity<String> deleteFestivalAuth(@RequestBody Map<String, Integer> requestData) {
		try {
			int authNo = requestData.get("authNo");
			service.deleteFestivalAuth(authNo);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to delete festival auth", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete festival auth");
		}
	}

	@GetMapping("/publicDataEventSellectAll")
	public List<AdminPublicDataEvent> publicDataEventSellectAll() throws Exception {
		return service.publicDataEventSellectAll();
	}

	@GetMapping("/eventSellectAll")
	public List<AdminPublicDataEvent> eventSellectAll() throws Exception {
		return service.eventSellectAll();
	}

	@GetMapping("/bannerSellectAll")
	public List<AdminBannerDTO> bannerSellectAll() throws Exception {
		return service.bannerSellectAll();
	}

	@PostMapping("/insertBanner")
	public ResponseEntity<String> insertBanner(@RequestBody AdminBannerDTO banner) {
		try {
			service.insertBanner(banner);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to insert banner", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to insert banner");
		}
	}

	@DeleteMapping("/deleteBanner/{bannerId}")
	public ResponseEntity<String> deleteBanner(@PathVariable int bannerId) {
		try {
			service.deleteBanner(bannerId);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			log.error("Failed to delete banner", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete banner");
		}
	}
	  @GetMapping("/stats")
	    public AdminStatsDTO getAdminStats() throws Exception {
	        return service.getAdminStats();
	    }
}
