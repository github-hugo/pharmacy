package com.xinhe.common;

import java.util.List;

/**
 * created by xuyahui on 2019/2/16
 */
public class JsonResult<T> {

    private Object obj;
    private List<T> data;
    private Integer total;
    private boolean success;
    private boolean successResult;
    private boolean failureResult;
    private Exception exception;

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }

    public List<?> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public static JsonResult getSuccessResult() {
        JsonResult jsonResult = new JsonResult();
        jsonResult.setSuccessResult(true);
        jsonResult.setSuccess(true);
        return jsonResult;
    }

    public void setSuccessResult(boolean successResult) {
        this.successResult = successResult;
    }

    public boolean isFailureResult() {
        return failureResult;
    }

    public void setFailureResult(boolean failureResult) {
        this.failureResult = failureResult;
    }

    public Exception getException() {
        return exception;
    }

    public void setException(Exception exception) {
        this.exception = exception;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
