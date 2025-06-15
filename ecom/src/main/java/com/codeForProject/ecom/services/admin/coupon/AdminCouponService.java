package com.codeForProject.ecom.services.admin.coupon;

import com.codeForProject.ecom.entity.Coupon;

import java.util.List;

public interface AdminCouponService {

    Coupon createCoupon(Coupon coupon);

    List<Coupon> getAllCoupons();

}
