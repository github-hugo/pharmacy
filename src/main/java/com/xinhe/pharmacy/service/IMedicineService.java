package com.xinhe.pharmacy.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.xinhe.pharmacy.entity.Medicine;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author ${author}
 * @since 2019-02-16
 */
public interface IMedicineService extends IService<Medicine> {

    Integer countMedicine();

    List<Medicine> listMedicine();
}
