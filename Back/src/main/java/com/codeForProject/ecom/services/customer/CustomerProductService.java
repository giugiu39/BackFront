package com.codeForProject.ecom.services.customer;

import com.codeForProject.ecom.dto.ProductDetailDto;
import com.codeForProject.ecom.dto.ProductDto;

import java.util.List;

public interface CustomerProductService {

    List<ProductDto> searchProductByTitle(String title);

    List<ProductDto> getAllProducts();

    ProductDetailDto getProductDetailById(Long productId);

}
