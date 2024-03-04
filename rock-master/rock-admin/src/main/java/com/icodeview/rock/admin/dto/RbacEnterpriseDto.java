package com.icodeview.rock.admin.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Setter
@Getter
public class RbacEnterpriseDto {
    private Integer id;
    @ApiModelProperty(value = "用户名",name = "name",required = true)
    private String name;
    @ApiModelProperty(value = "负责人姓名",name = "adminname",required = true)
    private String adminname;
    @ApiModelProperty(value = "备注",name = "extrainfo")
    private String extrainfo;

}
