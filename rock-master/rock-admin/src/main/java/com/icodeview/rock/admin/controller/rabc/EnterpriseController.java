package com.icodeview.rock.admin.controller.rabc;

import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.github.xiaoymin.knife4j.annotations.ApiSort;
import com.icodeview.rock.admin.dto.RbacEnterpriseDto;
import com.icodeview.rock.admin.dto.RbacUserDto;
import com.icodeview.rock.admin.pojo.RbacEnterprise;
import com.icodeview.rock.admin.service.RbacEnterpriseService;
import com.icodeview.rock.admin.vo.RbacEnterpriseVo;
import com.icodeview.rock.admin.vo.RbacUserVo;
import com.icodeview.rock.vo.CommonResult;
import com.icodeview.rock.vo.PageResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Api(tags = "用户管理--物业公司管理")
@ApiSort(1)
@RestController("EnterpriseController")
@RequestMapping("/rbac/enterprise")
public class EnterpriseController {
    @Resource
    private RbacEnterpriseService rbacEnterpriseService;

    @ApiOperationSupport(order = 1, author = "刘紫璇")
    @ApiOperation("添加用户公司")
    @PostMapping("create")
    public CommonResult<Void> create(@RequestBody @Validated RbacEnterpriseDto dto) {
        rbacEnterpriseService.createEnterprise(dto);
        return CommonResult.success("添加成功！");
    }


    @ApiOperation("用户公司列表")
    @ApiOperationSupport(order = 2, author = "刘紫璇")
    @GetMapping("index")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name",value = "公司名称"),
            @ApiImplicitParam(name = "extrainfo",value = "备注"),
            @ApiImplicitParam(name = "adminname",value = "负责人姓名"),
            @ApiImplicitParam(name = "current",value = "页码"),
            @ApiImplicitParam(name = "pageSize",value = "条数")
    })

    public CommonResult<PageResult<RbacEnterpriseVo>> index(
            @RequestParam(value = "id", required = false) Integer id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "extrainfo", required = false) String extrainfo,
            @RequestParam(value = "adminname", required = false) String adminname,
            @RequestParam(value = "current", required = false, defaultValue = "1") Long pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "20") Long pageSize
    ) {
        PageResult<RbacEnterpriseVo> result = rbacEnterpriseService.getIndex(id,name, extrainfo,adminname,pageNum, pageSize);
        return CommonResult.success(result);
    }


    @ApiOperationSupport(order = 3, author = "刘紫璇")
    @ApiOperation("删除用户公司")
    @GetMapping("delete")
    @ApiImplicitParam(value = "公司id", name = "id", required = true)
    public CommonResult<Void> delete(@RequestParam(value = "id") Integer id) {
        rbacEnterpriseService.deleteEnterprise(id);
        return CommonResult.success("删除成功！");
    }

    @ApiOperationSupport(order = 4, author = "刘紫璇")
    @ApiOperation("更新用户公司")
    @PostMapping("update")
    public CommonResult<Void> update(@RequestBody @Validated RbacEnterpriseDto dto) {
        rbacEnterpriseService.updateEnterprise(dto);
        return CommonResult.success("编辑成功！");
    }

    @ApiOperationSupport(order = 5, author = "刘紫璇")
    @ApiOperation("根据id查找")
    @GetMapping("getIndexById")
    public RbacEnterprise getIndexById(@RequestParam(value = "id") Integer id) {
        System.out.println(id);
       return rbacEnterpriseService.getIndexById(id);
    }
}
