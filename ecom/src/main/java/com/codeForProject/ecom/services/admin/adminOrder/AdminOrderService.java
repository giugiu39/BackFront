package com.codeForProject.ecom.services.admin.adminOrder;

import com.codeForProject.ecom.dto.AnalyticsResponse;
import com.codeForProject.ecom.dto.OrderDto;

import java.util.List;

public interface AdminOrderService {

    List<OrderDto> getAllPlaceOrders();

    OrderDto changeOrderStatus(Long orderId, String status);

    AnalyticsResponse calculateAnalytics();

}
