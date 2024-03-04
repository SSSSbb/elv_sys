package com.icodeview.rock.admin.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Setter
@Getter
public class RbacLocationDto {
    private Integer id;
    @ApiModelProperty(value = "标题",name = "name",required = true)
    private String name;
    @ApiModelProperty(value = "经度",name = "longitude",required = true)
    private BigDecimal longitude;
    @ApiModelProperty(value = "纬度",name = "latitude",required = true)
    private BigDecimal latitude;
    @ApiModelProperty(value = "属于",name = "belongto",required = true)
    private Integer belongto;
}
