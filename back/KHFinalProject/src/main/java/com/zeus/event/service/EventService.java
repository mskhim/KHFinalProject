package com.zeus.event.service;

import java.util.List;

import com.zeus.event.domain.PublicDataEvent;
import com.zeus.user.domain.User;

public interface EventService {
  //공공데이터를 db에서 가져와서 반환해주는 서비스 인터페이스
  List<PublicDataEvent> selectPublicDataEvent(User user);
}
