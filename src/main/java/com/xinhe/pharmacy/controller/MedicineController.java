package com.xinhe.pharmacy.controller;


import com.xinhe.common.JsonResult;
import com.xinhe.pharmacy.entity.Medicine;
import com.xinhe.pharmacy.service.IMedicineService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
@Api(value = "/api/activity", tags = "", description = "")
public class MedicineController {

    @Autowired
    private IMedicineService medicineService;

    @ResponseBody
    @RequestMapping({"/list"})
    @ApiOperation(value = "", notes = "", httpMethod = "POST", response = Medicine.class)
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

