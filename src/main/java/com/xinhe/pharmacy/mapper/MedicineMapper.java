package com.xinhe.pharmacy.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xinhe.pharmacy.entity.Medicine;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author ${author}
 * @since 2019-02-16
 */
public interface MedicineMapper extends BaseMapper<Medicine> {

    Integer countMedicine();

    List<Medicine> listMedicine();
}
