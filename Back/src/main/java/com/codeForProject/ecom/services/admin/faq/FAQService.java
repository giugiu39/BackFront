package com.codeForProject.ecom.services.admin.faq;

import com.codeForProject.ecom.dto.FAQDto;
import java.util.List;

public interface FAQService {

    FAQDto createFaq(FAQDto faqDto);

    List<FAQDto> getAllFaqs();

    boolean deleteFaq(Long id);

}
