package com.icodeview.rock.admin.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RbacTypeDto {
    private Integer id;
    @ApiModelProperty(value = "用户名",name = "name",required = true)
    private String name;
    @ApiModelProperty(value = "所属公司",name = "belongto",required = true)
    private Integer belongto;
    @ApiModelProperty(value = "负责人姓名",name = "adminname",required = true)
    private String extrainfo;
}
