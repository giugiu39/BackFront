package com.codeForProject.ecom.services.admin.category;

import com.codeForProject.ecom.dto.CategoryDto;
import com.codeForProject.ecom.entity.Category;

import java.util.List;

public interface CategoryService {

    Category createCategory(CategoryDto categoryDto);

    List<Category> getAllCategories();

}
