package com.codeForProject.ecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.codeForProject.ecom.entity.FAQ;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long> {

}
