package com.icodeview.rock.admin.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.icodeview.rock.admin.dto.RbacEnterpriseDto;
import com.icodeview.rock.admin.dto.RbacUserDto;
import com.icodeview.rock.admin.pojo.RbacCondition;
import com.icodeview.rock.admin.pojo.RbacEnterprise;
import com.icodeview.rock.admin.pojo.RbacUser;
import com.icodeview.rock.admin.service.RbacEnterpriseService;
import com.icodeview.rock.admin.mapper.RbacEnterpriseMapper;
import com.icodeview.rock.admin.vo.RbacEnterpriseVo;
import com.icodeview.rock.exception.BadHttpRequestException;
import com.icodeview.rock.vo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RbacEnterpriseServiceImpl extends ServiceImpl<RbacEnterpriseMapper, RbacEnterprise> implements RbacEnterpriseService {
    @Override
    public PageResult<RbacEnterpriseVo> getIndex(Integer id,String name, String extrainfo, String adminname, Long pageNum, Long pageSize) {
        Page<RbacEnterprise> rbacEnterprisePage = new Page<>(pageNum, pageSize);
        System.out.println(name);

        Page<RbacEnterprise> page = lambdaQuery()
                .eq(id != null , RbacEnterprise::getId, id)
                .and(StrUtil.isNotBlank(name), q -> q.like(RbacEnterprise::getName, "%" + name + "%"))
                .and(StrUtil.isNotBlank(extrainfo), q -> q.eq(RbacEnterprise::getExtrainfo, extrainfo))
                .and(StrUtil.isNotBlank(adminname), q -> q.eq(RbacEnterprise::getAdminname, adminname))
                .orderByDesc(RbacEnterprise::getId)
                .page(rbacEnterprisePage);

        List<RbacEnterpriseVo> record = page.getRecords().stream()
                .map(rbacEnterprise -> BeanUtil.copyProperties(rbacEnterprise, RbacEnterpriseVo.class))
                .collect(Collectors.toList());

        System.out.println(record);
        return PageResult.page(record, page);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void createEnterprise(RbacEnterpriseDto enterpriseDto) {
        RbacEnterprise enterprise = BeanUtil.copyProperties(enterpriseDto, RbacEnterprise.class);
        enterprise.setName(enterpriseDto.getName());
        enterprise.setExtrainfo(enterpriseDto.getExtrainfo());
        enterprise.setAdminname(enterpriseDto.getAdminname());
        enterprise.setCreatedAt(LocalDateTime.now());
        enterprise.setUpdatedAt(LocalDateTime.now());
        save(enterprise);

    }
    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void deleteEnterprise(Integer id) {
        RbacEnterprise enterprise = getById(id);
//todo 如果有用户存在此公司的话，无法删除
        removeById(enterprise.getId());
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void updateEnterprise(RbacEnterpriseDto enterpriseDto) {
//        if(!checkMobile(userDto.getId(),userDto.getMobile())){
//            throw new BadHttpRequestException("该手机号已被使用！");
//        }
        RbacEnterprise enterprise = BeanUtil.copyProperties(enterpriseDto, RbacEnterprise.class);
        enterprise.setId(enterpriseDto.getId());
        enterprise.setName(enterpriseDto.getName());
        enterprise.setAdminname(enterpriseDto.getAdminname());
        enterprise.setExtrainfo(enterpriseDto.getExtrainfo());
        enterprise.setCreatedAt(LocalDateTime.now());
        enterprise.setUpdatedAt(LocalDateTime.now());
        updateById(enterprise);

    }
    public RbacEnterprise getIndexById(Integer id) {
        RbacEnterprise rbacEnterprise = getById(id);
        if (rbacEnterprise != null) {
            return rbacEnterprise;
        }
        System.out.println(rbacEnterprise);
        return null;
    }

//    public List<String> getEnterpriseByIds(List<Integer> id){
//
//    }
}
