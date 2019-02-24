package com.xinhe.pharmacy.service.impl;

import com.xinhe.pharmacy.entity.Medicine;
import com.xinhe.pharmacy.mapper.MedicineMapper;
import com.xinhe.pharmacy.service.IMedicineService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author ${author}
 * @since 2019-02-16
 */
@Service
public class MedicineServiceImpl extends ServiceImpl<MedicineMapper, Medicine> implements IMedicineService {

    public Integer countMedicine() {
        return this.baseMapper.countMedicine();
    }

    public List<Medicine> listMedicine() {
        return this.baseMapper.listMedicine();
    }
}
