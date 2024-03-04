package com.icodeview.rock.admin.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RbacMaintainDto {
    private Integer id;
    @ApiModelProperty(value = "标题",name = "name",required = true)
    private String name;
    @ApiModelProperty(value = "等级",name = "level",required = true)
    private String level;
    @ApiModelProperty(value = "频次",name = "frequency",required = true)
    private String frequency;
    @ApiModelProperty(value = "间隔天数",name = "days",required = true)
    private Integer days;
    @ApiModelProperty(value = "属于",name = "belongto",required = true)
    private Integer belongto;
}
