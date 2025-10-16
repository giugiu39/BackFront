package com.codeForProject.ecom.entity;

import com.codeForProject.ecom.dto.FAQDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class FAQ {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private String answer;

    public FAQDto getFAQDto() {
        FAQDto faqDto = new FAQDto();
        faqDto.setId(id);
        faqDto.setQuestion(question);
        faqDto.setAnswer(answer);

        return faqDto;
    }

}
