package com.zeus.qna.service;

import java.util.List;

import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.qna.domain.Qna;
import com.zeus.qna.domain.QnaDTO;

public interface QnaService {
    List<QnaDTO> getAllQna();
    void insertQna(Qna qna);
    void updateQna(Qna qna);
    List<PublicDataEventDTO> getFestivalList();
    void insertReplyQna(Qna qna);
	String getReply(Qna qna);

}