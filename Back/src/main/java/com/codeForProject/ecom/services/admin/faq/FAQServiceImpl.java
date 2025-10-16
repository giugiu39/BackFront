package com.codeForProject.ecom.services.admin.faq;

import com.codeForProject.ecom.dto.FAQDto;
import com.codeForProject.ecom.entity.FAQ;
import com.codeForProject.ecom.repository.FAQRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FAQServiceImpl implements FAQService {

    private final FAQRepository faqrepository;

    public FAQDto createFaq(FAQDto faqDto) {
        FAQ faq = new FAQ();
        faq.setQuestion(faqDto.getQuestion());
        faq.setAnswer(faqDto.getAnswer());
        return faqrepository.save(faq).getFAQDto();
    }

    public List<FAQDto> getAllFaqs() {
        return faqrepository.findAll()
                .stream()
                .map(FAQ::getFAQDto)
                .collect(Collectors.toList());
    }

    public boolean deleteFaq(Long id) {
        if (faqrepository.existsById(id)) {
            faqrepository.deleteById(id);
            return true;
        }
        return false;
    }

}
