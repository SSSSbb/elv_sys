package com.icodeview.rock.admin.controller.rabc;


import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.github.xiaoymin.knife4j.annotations.ApiSort;
import com.icodeview.rock.admin.dto.RbacManDto;
import com.icodeview.rock.admin.service.RbacManService;
import com.icodeview.rock.admin.vo.RbacManVo;
import com.icodeview.rock.vo.CommonResult;
import com.icodeview.rock.vo.PageResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Api(tags = "用户列表--生产厂家管理")
@ApiSort(1)
@RestController("RbacManufacturerController")
@RequestMapping("/manufacture/list")
public class ManufacturerController {
    @Resource
    private RbacManService rbacManService;
    @ApiOperation("生产厂家列表")
    @ApiOperationSupport(order = 1, author = "刘紫璇")
    @GetMapping("index")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name",value = "厂家名称"),
            @ApiImplicitParam(name = "adminname",value = "负责人姓名"),
            @ApiImplicitParam(name = "adminphone",value = "负责人电话"),
            @ApiImplicitParam(name = "qualification",value = "资质"),
            @ApiImplicitParam(name = "belongto",value = "所属公司"),
            @ApiImplicitParam(name = "current",value = "页码"),
            @ApiImplicitParam(name = "pageSize",value = "条数")
    })

    public CommonResult<PageResult<RbacManVo>> index(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "adminname", required = false) String adminname,
            @RequestParam(value = "adminphone", required = false) String adminphone,
            @RequestParam(value = "qualification", required = false) String qualification,
            @RequestParam(value = "belongto", required = false) Integer belongto,
            @RequestParam(value = "current", required = false, defaultValue = "1") Long pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "20") Long pageSize
    ) {
        PageResult<RbacManVo> result = rbacManService.getIndex(name, adminname,adminphone,belongto,pageNum, pageSize);
        return CommonResult.success(result);
    }

    @ApiOperationSupport(order = 2, author = "刘紫璇")
    @ApiOperation("添加生产厂家")
    @PostMapping("create")
    public CommonResult<Void> create(@RequestBody @Validated RbacManDto dto) {
        rbacManService.createMan(dto);
        return CommonResult.success("添加成功！");
    }

    @ApiOperationSupport(order = 3, author = "刘紫璇")
    @ApiOperation("更新生产厂家")
    @PostMapping("update")
    public CommonResult<Void> update(@RequestBody @Validated RbacManDto dto) {
        rbacManService.updateMan(dto);
        return CommonResult.success("编辑成功！");
    }
    @ApiOperationSupport(order = 3, author = "刘紫璇")
    @ApiOperation("删除生产厂家")
    @GetMapping("delete")
    @ApiImplicitParam(value = "id", name = "id", required = true)
    public CommonResult<Void> delete(@RequestParam(value = "id") Integer id) {
        rbacManService.deleteMan(id);
        return CommonResult.success("删除成功！");
    }

}
