package com.icodeview.rock.admin.controller.rabc;

import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.github.xiaoymin.knife4j.annotations.ApiSort;
import com.icodeview.rock.admin.dto.RbacManDto;
import com.icodeview.rock.admin.dto.RbacSupDto;
import com.icodeview.rock.admin.service.RbacSupService;
import com.icodeview.rock.admin.vo.RbacSupVo;
import com.icodeview.rock.vo.CommonResult;
import com.icodeview.rock.vo.PageResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Api(tags = "用户列表--供货商管理")
@ApiSort(1)
@RestController("RbacSupController")
@RequestMapping("/sup/list")
public class SupController {
    @Resource
    private RbacSupService rbacSupService;
    @ApiOperation("供货商列表")
    @ApiOperationSupport(order = 1, author = "刘紫璇")
    @GetMapping("index")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name",value = "供货商名称"),
            @ApiImplicitParam(name = "adminname",value = "负责人姓名"),
            @ApiImplicitParam(name = "adminphone",value = "负责人电话"),
            @ApiImplicitParam(name = "qualification",value = "资质"),
            @ApiImplicitParam(name = "belongto",value = "所属公司"),
            @ApiImplicitParam(name = "current",value = "页码"),
            @ApiImplicitParam(name = "pageSize",value = "条数")
    })

    public CommonResult<PageResult<RbacSupVo>> index(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "adminname", required = false) String adminname,
            @RequestParam(value = "adminphone", required = false) String adminphone,
            @RequestParam(value = "belongto", required = false) Integer belongto,
            @RequestParam(value = "current", required = false, defaultValue = "1") Long pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "20") Long pageSize
    ) {
        PageResult<RbacSupVo> result = rbacSupService.getIndex(name, adminname,adminphone,belongto,pageNum, pageSize);
        return CommonResult.success(result);
    }


    @ApiOperationSupport(order = 2, author = "刘紫璇")
    @ApiOperation("添加")
    @PostMapping("create")
    public CommonResult<Void> create(@RequestBody @Validated RbacSupDto dto) {
        rbacSupService.createSup(dto);
        return CommonResult.success("添加成功！");
    }


    @ApiOperationSupport(order = 3, author = "刘紫璇")
    @ApiOperation("更新")
    @PostMapping("update")
    public CommonResult<Void> update(@RequestBody @Validated RbacSupDto dto) {
        rbacSupService.updateSup(dto);
        return CommonResult.success("编辑成功！");
    }

    @ApiOperationSupport(order = 4, author = "刘紫璇")
    @ApiOperation("删除")
    @GetMapping("delete")
    @ApiImplicitParam(value = "id", name = "id", required = true)
    public CommonResult<Void> delete(@RequestParam(value = "id") Integer id) {
        rbacSupService.deleteSup(id);
        return CommonResult.success("删除成功！");
    }
}
