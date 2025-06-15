package com.codeForProject.ecom.services.customer.review;

import com.codeForProject.ecom.dto.OrderedProductsResponseDto;
import com.codeForProject.ecom.dto.ReviewDto;

import java.io.IOException;

public interface ReviewService {

    OrderedProductsResponseDto getOrderedProductsDetailsByOrderId(Long orderId);

    ReviewDto giveReview(ReviewDto reviewDto) throws IOException;

}
