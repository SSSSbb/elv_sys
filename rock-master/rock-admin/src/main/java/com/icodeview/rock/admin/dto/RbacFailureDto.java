package com.icodeview.rock.admin.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RbacFailureDto {
    private Integer id;
    @ApiModelProperty(value = "标题",name = "name",required = true)
    private String name;
    @ApiModelProperty(value = "状态",name = "status",required = true)
    private String type;
    @ApiModelProperty(value = "属于",name = "belongto",required = true)
    private Integer belongto;
}
