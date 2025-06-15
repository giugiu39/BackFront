package com.codeForProject.ecom.services.admin.faq;

import com.codeForProject.ecom.dto.FAQDto;
import com.codeForProject.ecom.entity.FAQ;
import com.codeForProject.ecom.entity.Product;
import com.codeForProject.ecom.repository.FAQRepository;
import com.codeForProject.ecom.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FAQServiceImpl implements FAQService {

    private final FAQRepository faqrepository;

    private final ProductRepository productRepository;

    public FAQDto postFaq(Long productId, FAQDto faqDto) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if(optionalProduct.isPresent()) {
            FAQ faq = new FAQ();

            faq.setQuestion(faqDto.getQuestion());
            faq.setAnswer(faqDto.getAnswer());
            faq.setProduct(optionalProduct.get());

            return faqrepository.save(faq).getFAQDto();
        }
        return null;
    }

}
