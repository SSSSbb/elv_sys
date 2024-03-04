package com.icodeview.rock.admin.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RbacManDto {
    private Integer id;
    @ApiModelProperty(value = "用户名",name = "name",required = true)
    private String name;
    @ApiModelProperty(value = "所属公司",name = "belongto",required = true)
    private Integer belongto;
    @ApiModelProperty(value = "负责人姓名",name = "adminname",required = true)
    private String adminname;
    @ApiModelProperty(value = "负责人电话",name = "adminphone",required = true)
    private String adminphone;
    @ApiModelProperty(value = "资质",name = "qualifiction",required = true)
    private String qualification;

}
