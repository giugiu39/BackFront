package com.codeForProject.ecom.controller.customer;

import com.codeForProject.ecom.dto.FAQDto;
import com.codeForProject.ecom.services.admin.faq.FAQService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerFaqController {

    private final FAQService faqService;

    @GetMapping("/faqs")
    public ResponseEntity<List<FAQDto>> getAllFaqs() {
        return ResponseEntity.ok(faqService.getAllFaqs());
    }
}