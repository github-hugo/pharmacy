package com.xinhe.pharmacy.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 
 * </p>
 *
 * @author ${author}
 * @since 2019-02-16
 */
public class Medicine extends Model<Medicine> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    private Integer id;

    /**
     * 药品名称
     */
    private String name;

    /**
     * 俗称、通用名称
     */
    private String genericName;

    /**
     * 进货价格
     */
    private Double purchasePrice;

    /**
     * 价格、销售价格
     */
    private Double price;

    /**
     * 当前药品库存数量
     */
    private Integer quantity;

    /**
     * 规格
     */
    private String standard;

    /**
     * 进货日期
     */
    private Date purchaseDate;

    /**
     * 生产日期
     */
    private Date productionDate;

    /**
     * 失效日期
     */
    private Date expirationDate;

    /**
     * 生产厂家
     */
    private String manufacturer;

    /**
     * 创建人
     */
    private String createdBy;

    /**
     * 创建日期
     */
    private Date createdTime;

    /**
     * 修改人
     */
    private String editedBy;

    /**
     * 自改日期
     */
    private Date editedTime;

    /**
     * 删除标记
     */
    private String deleteFlag;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGenericName() {
        return genericName;
    }

    public void setGenericName(String genericName) {
        this.genericName = genericName;
    }

    public Double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(Double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public Date getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(Date productionDate) {
        this.productionDate = productionDate;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public String getEditedBy() {
        return editedBy;
    }

    public void setEditedBy(String editedBy) {
        this.editedBy = editedBy;
    }

    public Date getEditedTime() {
        return editedTime;
    }

    public void setEditedTime(Date editedTime) {
        this.editedTime = editedTime;
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "Medicine{" +
        "id=" + id +
        ", name=" + name +
        ", genericName=" + genericName +
        ", purchasePrice=" + purchasePrice +
        ", price=" + price +
        ", quantity=" + quantity +
        ", purchaseDate=" + purchaseDate +
        ", productionDate=" + productionDate +
        ", expirationDate=" + expirationDate +
        ", manufacturer=" + manufacturer +
        ", createdBy=" + createdBy +
        ", createdTime=" + createdTime +
        ", editedBy=" + editedBy +
        ", editedTime=" + editedTime +
        ", deleteFlag=" + deleteFlag +
        "}";
    }
}
