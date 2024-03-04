package com.icodeview.rock.admin.controller.rabc;

import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.github.xiaoymin.knife4j.annotations.ApiSort;
import com.icodeview.rock.admin.dto.RbacMaintainDto;
import com.icodeview.rock.admin.dto.RbacTypeDto;
import com.icodeview.rock.admin.service.RbacMaintainService;
import com.icodeview.rock.admin.service.RbacTypeService;
import com.icodeview.rock.admin.vo.RbacMaintainVo;
import com.icodeview.rock.admin.vo.RbacTypeVo;
import com.icodeview.rock.vo.CommonResult;
import com.icodeview.rock.vo.PageResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Api(tags = "基本信息-保养等级与频次管理")
@ApiSort(2)
@RestController
@RequestMapping("/basic/maintain")
public class MaintainController {

    @Resource
    private RbacMaintainService rbacMaintainService;
    @ApiOperation("列表")
    @ApiOperationSupport(order = 1, author = "刘紫璇")
    @GetMapping("index")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name",value = "名称"),
            @ApiImplicitParam(name = "level",value = "等级"),
            @ApiImplicitParam(name = "frequency",value = "频率"),
            @ApiImplicitParam(name = "days",value = "间隔天数"),
            @ApiImplicitParam(name = "belongto",value = "属于"),
            @ApiImplicitParam(name = "current",value = "页码"),
            @ApiImplicitParam(name = "pageSize",value = "条数")
    })

    public CommonResult<PageResult<RbacMaintainVo>> index(
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "belongto", required = false) Integer belongto,
            @RequestParam(value = "current", required = false, defaultValue = "1") Long pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "20") Long pageSize
    ) {
        PageResult<RbacMaintainVo> result = rbacMaintainService.getIndex(level,belongto,pageNum, pageSize);
        return CommonResult.success(result);
    }


    @ApiOperationSupport(order = 2, author = "刘紫璇")
    @ApiOperation("添加")
    @PostMapping("create")
    public CommonResult<Void> create(@RequestBody @Validated RbacMaintainDto dto) {
        rbacMaintainService.createMaintain(dto);
        return CommonResult.success("添加成功！");
    }
    @ApiOperationSupport(order = 3, author = "刘紫璇")
    @ApiOperation("删除")
    @GetMapping("delete")
    @ApiImplicitParam(value = "id", name = "id", required = true)
    public CommonResult<Void> delete(@RequestParam(value = "id") Integer id) {
        rbacMaintainService.deleteMaintain(id);
        return CommonResult.success("删除成功！");
    }


    @ApiOperationSupport(order = 3, author = "刘紫璇")
    @ApiOperation("更新")
    @PostMapping("update")
    public CommonResult<Void> update(@RequestBody @Validated RbacMaintainDto dto) {
        rbacMaintainService.updateMaintain(dto);
        return CommonResult.success("编辑成功！");
    }
}
