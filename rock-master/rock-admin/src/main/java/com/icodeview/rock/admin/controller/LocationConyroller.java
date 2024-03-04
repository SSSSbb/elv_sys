package com.icodeview.rock.admin.controller;

import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.github.xiaoymin.knife4j.annotations.ApiSort;
import com.icodeview.rock.admin.dto.RbacLocationDto;
import com.icodeview.rock.admin.service.RbacLocationService;
import com.icodeview.rock.admin.vo.RbacLocationVo;
import com.icodeview.rock.vo.CommonResult;
import com.icodeview.rock.vo.PageResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.math.BigDecimal;

@Api(tags = "基本信息-安装地点")
@ApiSort(2)
@RestController
@RequestMapping("/basic/location")
public class LocationConyroller {

    @Resource
    private RbacLocationService rbacLocationService;
    @ApiOperation("列表")
    @ApiOperationSupport(order = 1, author = "刘紫璇")
    @GetMapping("index")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name",value = "名称"),
            @ApiImplicitParam(name = "longitude",value = "经度"),
            @ApiImplicitParam(name = "latitude",value = "纬度"),
            @ApiImplicitParam(name = "belongto",value = "属于"),
            @ApiImplicitParam(name = "current",value = "页码"),
            @ApiImplicitParam(name = "pageSize",value = "条数")
    })

    public CommonResult<PageResult<RbacLocationVo>> index(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "longitude", required = false) BigDecimal longitude,
            @RequestParam(value = "latitude", required = false) BigDecimal latitude,
            @RequestParam(value = "belongto", required = false) Integer belongto,
            @RequestParam(value = "current", required = false, defaultValue = "1") Long pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "20") Long pageSize
    ) {
        PageResult<RbacLocationVo> result = rbacLocationService.getIndex(name,longitude,latitude,belongto,pageNum, pageSize);
        return CommonResult.success(result);
    }
    @ApiOperationSupport(order = 2, author = "刘紫璇")
    @ApiOperation("更新")
    @PostMapping("update")
    public CommonResult<Void> update(@RequestBody @Validated RbacLocationDto dto) {
        rbacLocationService.updateLocation(dto);
        return CommonResult.success("编辑成功！");
    }


    @ApiOperationSupport(order = 3, author = "刘紫璇")
    @ApiOperation("添加")
    @PostMapping("create")
    public CommonResult<Void> create(@RequestBody @Validated RbacLocationDto dto) {
        rbacLocationService.createLocation(dto);
        return CommonResult.success("添加成功！");
    }
    @ApiOperationSupport(order = 4, author = "刘紫璇")
    @ApiOperation("删除")
    @GetMapping("delete")
    @ApiImplicitParam(value = "id", name = "id", required = true)
    public CommonResult<Void> delete(@RequestParam(value = "id") Integer id) {
        rbacLocationService.deleteLocation(id);
        return CommonResult.success("删除成功！");
    }


}
