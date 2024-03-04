package com.icodeview.rock.admin.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class RbacProfileDto {
    private Integer id;

    @ApiModelProperty(value = "标题",name = "name",required = true)
    private String name;

    @ApiModelProperty(value = "电梯类型",name = "type",required = true)
    private String type;

    @ApiModelProperty(value = "保养类型",name = "type",required = true)
    private String maintaintype;

    @ApiModelProperty(value = "电梯状态",name = "status",required = true)
    private String status;

    @ApiModelProperty(value = "安装地点",name = "location",required = true)
    private String location;

    @ApiModelProperty(value = "规格",name = "spec",required = true)
    private String spec;

    @ApiModelProperty(value = "设备代码",name = "deviceCode",required = true)
    private String deviceCode;

    @ApiModelProperty(value = "是否需维保",name = "maintain",required = true)
    private Integer maintain;

    @ApiModelProperty(value = "是否需维修",name = "repair",required = true)
    private Integer repair;

    @ApiModelProperty(value = "负责人",name = "user",required = true)
    private String user;

    @ApiModelProperty(value = "生产厂家",name = "man",required = true)
    private String man;

    @ApiModelProperty(value = "供货商",name = "sup",required = true)
    private String sup;

    @ApiModelProperty(value = "购买时间",name = "buyAt",required = true)
    private LocalDateTime buyAt;

    @ApiModelProperty(value = "启动时间",name = "startAt",required = true)
    private LocalDateTime startAt;

    @ApiModelProperty(value = "上次维保时间",name = "lastMaintain",required = true)
    private LocalDateTime lastMaintain;

    @ApiModelProperty(value = "上次维修时间",name = "lastRepair",required = true)
    private LocalDateTime lastRepair;

    @ApiModelProperty(value = "电梯相关",name = "doc",required = true)
    private byte[] doc;

    @ApiModelProperty(value = "电梯图片",name = "pic",required = true)
    private byte[] pic;

    @ApiModelProperty(value = "属于",name = "belongto",required = true)
    private Integer belongto;

    @ApiModelProperty(value = "注册代码",name = "regCode",required = true)
    private String regCode;

}
