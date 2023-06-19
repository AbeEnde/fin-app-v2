package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.SecurityQuestion;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

@Service
public class JdbcSecurityQuestionDao implements SecurityQuestionDao{
    private final JdbcTemplate jdbcTemplate;

    public JdbcSecurityQuestionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public SecurityQuestion getQuestion(int id) {
        SecurityQuestion securityQuestion = new SecurityQuestion();
        String sql = "select * from security_questions where id = ?";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);

        if(results.next()) {
            securityQuestion = mapRowToSecurityQuestion(results);
        } else {
            return null;
        }
        return securityQuestion;
    }

    @Override
    public boolean create() {
        return true;
    }

    @Override
    public boolean validateAnswer() {
       // String sql = SE

        return true;
    }

    public SecurityQuestion mapRowToSecurityQuestion(SqlRowSet rs) {
        SecurityQuestion securityQuestion = new SecurityQuestion();
        securityQuestion.setId(rs.getInt("id"));
        securityQuestion.setQuestion(rs.getString("question"));

        return securityQuestion;
    }
}
