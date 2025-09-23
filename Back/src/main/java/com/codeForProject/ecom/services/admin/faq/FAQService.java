package com.codeForProject.ecom.services.admin.faq;

import com.codeForProject.ecom.dto.FAQDto;

public interface FAQService {

    FAQDto postFaq(Long productId, FAQDto faqDto);

}
