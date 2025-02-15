package com.zeus.qna.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.qna.domain.Qna;
import com.zeus.qna.domain.QnaDTO;
import com.zeus.qna.mapper.QnaMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class QnaServiceImpl implements QnaService {

    @Autowired
    private QnaMapper qnaMapper;

    @Override
    public List<QnaDTO> getAllQna() {
        return qnaMapper.getAllQna();
    }

    @Override
    public void insertQna(Qna qna) {
    	log.info(""+qna);
        qnaMapper.insertQna(qna);
    }

    @Override
    public void updateQna(Qna qna) {
        qnaMapper.updateQna(qna);
    }

    @Override
    public List<PublicDataEventDTO> getFestivalList() {
    	log.info("서비스 실행");
        return qnaMapper.getFestivalList();
    }
}