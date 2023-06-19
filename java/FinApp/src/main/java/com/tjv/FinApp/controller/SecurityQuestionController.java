package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.SecurityQuestionDao;
import com.tjv.FinApp.model.SecurityQuestion;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityQuestionController {
    private final SecurityQuestionDao securityQuestionDao;

    public SecurityQuestionController(SecurityQuestionDao securityQuestionDao) {
        this.securityQuestionDao = securityQuestionDao;
    }

    @GetMapping("/getSecurityQuestion")
    public SecurityQuestion getSecurityQuestion(@RequestBody SecurityQuestion securityQuestion) {
        try {
            securityQuestion = securityQuestionDao.getQuestion(securityQuestion.getId());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return securityQuestion;
    }
}
