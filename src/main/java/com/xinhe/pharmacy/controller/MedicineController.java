package com.xinhe.pharmacy.controller;


import com.xinhe.common.JsonResult;
import com.xinhe.pharmacy.entity.Medicine;
import com.xinhe.pharmacy.service.IMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.stereotype.Controller;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author ${author}
 * @since 2019-02-16
 */
@Controller
@RequestMapping("/medicine")
public class MedicineController {

    @Autowired
    private IMedicineService medicineService;

    @ResponseBody
    @RequestMapping({"/list"})
    public JsonResult<Medicine> list() {
        JsonResult json = JsonResult.getSuccessResult();
        try {
            System.out.println("访问后台成功");
            json.setTotal(medicineService.countMedicine());
            if (json.getTotal() > 0) {
                json.setData(medicineService.listMedicine());
            }
        } catch (Exception e) {
//            logger.error("获取信访列表信息异常", e);
            json.setException(e);
        }
        return json;
    }

}

