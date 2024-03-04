package com.icodeview.rock.admin.controller.rabc;

import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.github.xiaoymin.knife4j.annotations.ApiSort;
import com.icodeview.rock.admin.dto.RbacTypeDto;
import com.icodeview.rock.admin.service.RbacTypeService;
import com.icodeview.rock.admin.vo.RbacTypeVo;
import com.icodeview.rock.vo.CommonResult;
import com.icodeview.rock.vo.PageResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Api(tags = "基本信息-电梯类型管理")
@ApiSort(2)
@RestController
@RequestMapping("/basic/type")
public class TypeController {


    @Resource
    private RbacTypeService rbacTypeService;
    @ApiOperation("列表")
    @ApiOperationSupport(order = 1, author = "刘紫璇")
    @GetMapping("index")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name",value = "供货商名称"),
            @ApiImplicitParam(name = "extrainfo",value = "备注"),
            @ApiImplicitParam(name = "belongto",value = "属于"),
            @ApiImplicitParam(name = "current",value = "页码"),
            @ApiImplicitParam(name = "pageSize",value = "条数")
    })

    public CommonResult<PageResult<RbacTypeVo>> index(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "belongto", required = false) Integer belongto,
            @RequestParam(value = "current", required = false, defaultValue = "1") Long pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "20") Long pageSize
    ) {
        PageResult<RbacTypeVo> result = rbacTypeService.getIndex(name,belongto,pageNum, pageSize);
        return CommonResult.success(result);
    }



    @ApiOperationSupport(order = 2, author = "刘紫璇")
    @ApiOperation("添加")
    @PostMapping("create")
    public CommonResult<Void> create(@RequestBody @Validated RbacTypeDto dto) {
        rbacTypeService.createType(dto);
        return CommonResult.success("添加成功！");
    }
    @ApiOperationSupport(order = 3, author = "刘紫璇")
    @ApiOperation("删除")
    @GetMapping("delete")
    @ApiImplicitParam(value = "id", name = "id", required = true)
    public CommonResult<Void> delete(@RequestParam(value = "id") Integer id) {
        rbacTypeService.deleteType(id);
        return CommonResult.success("删除成功！");
    }

    @ApiOperationSupport(order = 3, author = "刘紫璇")
    @ApiOperation("更新")
    @PostMapping("update")
    public CommonResult<Void> update(@RequestBody @Validated RbacTypeDto dto) {
        rbacTypeService.updateType(dto);
        return CommonResult.success("编辑成功！");
    }




}
