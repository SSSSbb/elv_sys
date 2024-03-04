package com.icodeview.rock.admin.controller.rabc;

import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.github.xiaoymin.knife4j.annotations.ApiSort;
import com.icodeview.rock.admin.dto.RbacConditionDto;
import com.icodeview.rock.admin.dto.RbacProfileDto;
import com.icodeview.rock.admin.service.RbacProfileService;
import com.icodeview.rock.admin.vo.RbacConditionVo;
import com.icodeview.rock.admin.vo.RbacProfileVo;
import com.icodeview.rock.vo.CommonResult;
import com.icodeview.rock.vo.PageResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Api(tags = "电梯档案")
@ApiSort(2)
@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Resource
    private RbacProfileService rbacProfileService;
    @ApiOperation("列表")
    @ApiOperationSupport(order = 1, author = "刘紫璇")
    @GetMapping("index")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id",value = "ID"),
            @ApiImplicitParam(name = "name",value = "标题"),
            @ApiImplicitParam(name = "type",value = "电梯类型"),
            @ApiImplicitParam(name = "status",value = "电梯状态"),
            @ApiImplicitParam(name = "location",value = "安装地点"),
            @ApiImplicitParam(name = "deviceCode",value = "设备代码"),
            @ApiImplicitParam(name = "maintain",value = "是否需维保"),
            @ApiImplicitParam(name = "repair",value = "是否需维修"),
            @ApiImplicitParam(name = "user",value = "负责人"),
            @ApiImplicitParam(name = "man",value = "生产厂家"),
            @ApiImplicitParam(name = "sup",value = "供货商"),
            @ApiImplicitParam(name = "maintaintype",value = "维保类型"),
            @ApiImplicitParam(name = "belongto",value = "属于"),
            @ApiImplicitParam(name = "current",value = "页码"),
            @ApiImplicitParam(name = "pageSize",value = "条数")
    })
    public CommonResult<PageResult<RbacProfileVo>> index(
            @RequestParam(value = "id", required = false) Integer id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "deviceCode", required = false) String deviceCode,
            @RequestParam(value = "maintain", required = false) Integer maintain,
            @RequestParam(value = "repair", required = false) Integer repair,
            @RequestParam(value = "user", required = false) String user,
            @RequestParam(value = "man", required = false) String man,
            @RequestParam(value = "sup", required = false) String sup,
            @RequestParam(value = "maintaintype", required = false) String maintaintype,
            @RequestParam(value = "belongto", required = false) Integer belongto,
            @RequestParam(value = "current", required = false, defaultValue = "1") Long pageNum,
            @RequestParam(value = "pageSize", required = false, defaultValue = "20") Long pageSize
    ) {
        PageResult<RbacProfileVo> result = rbacProfileService.getIndex(id, name, type, status, location, deviceCode, maintain, repair, user, man, sup, maintaintype, belongto,  pageNum,  pageSize);
        return CommonResult.success(result);
    }


    @ApiOperationSupport(order = 2, author = "刘紫璇")
    @ApiOperation("添加")
    @PostMapping("create")
    public CommonResult<Void> create(@RequestBody @Validated RbacProfileDto dto) {
        rbacProfileService.createProfile(dto);
        return CommonResult.success("添加成功！");
    }
    @ApiOperationSupport(order = 3, author = "刘紫璇")
    @ApiOperation("删除")
    @GetMapping("delete")
    @ApiImplicitParam(value = "id", name = "id", required = true)
    public CommonResult<Void> delete(@RequestParam(value = "id") Integer id) {
        rbacProfileService.deleteProfile(id);
        return CommonResult.success("删除成功！");
    }


    @ApiOperationSupport(order = 3, author = "刘紫璇")
    @ApiOperation("更新")
    @PostMapping("update")
    public CommonResult<Void> update(@RequestBody @Validated RbacProfileDto dto) {
        rbacProfileService.updateProfile(dto);
        return CommonResult.success("编辑成功！");
    }
}
