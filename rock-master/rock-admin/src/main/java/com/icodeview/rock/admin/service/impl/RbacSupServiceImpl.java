package com.icodeview.rock.admin.service.impl;


import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.icodeview.rock.admin.dto.RbacSupDto;
import com.icodeview.rock.admin.mapper.RbacSupMapper;
import com.icodeview.rock.admin.pojo.RbacSup;
import com.icodeview.rock.admin.service.RbacSupService;
import com.icodeview.rock.admin.vo.RbacSupVo;
import com.icodeview.rock.vo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class RbacSupServiceImpl extends ServiceImpl<RbacSupMapper, RbacSup> implements RbacSupService {

    @Override
    public PageResult<RbacSupVo> getIndex(String name, String adminname, String adminphone, Integer belongto, Long pageNum, Long pageSize) {
        Page<RbacSup> rbacSupPage = new Page<>(pageNum, pageSize);
        Page<RbacSup> page = lambdaQuery()
                .and(StrUtil.isNotBlank(name), q -> q.like(RbacSup::getName, "%" + name + "%"))
                .and(StrUtil.isNotBlank(adminname), q -> q.like(RbacSup::getAdminname, "%" + adminname + "%"))
                .and(StrUtil.isNotBlank(adminphone), q -> q.like(RbacSup::getAdminphone, "%" + adminphone + "%"))
                .eq(belongto != null , RbacSup::getBelongto, belongto)
                .orderByDesc(RbacSup::getId)
                .page(rbacSupPage);
        List<RbacSupVo> record = page.getRecords().stream()
                .map(rbacSup -> BeanUtil.copyProperties(rbacSup, RbacSupVo.class))
                .collect(Collectors.toList());
        System.out.println(record);
        return PageResult.page(record,page);
    }



    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void createSup(RbacSupDto supDto) {
        RbacSup sup = BeanUtil.copyProperties(supDto, RbacSup.class);
        sup.setName(supDto.getName());
        sup.setAdminname(supDto.getAdminname());
        sup.setAdminphone(supDto.getAdminphone());
        sup.setBelongto(supDto.getBelongto());
        sup.setQualification(supDto.getQualification());
        sup.setCreatedAt(LocalDateTime.now());
        sup.setUpdatedAt(LocalDateTime.now());
        save(sup);
    }
    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void deleteSup(Integer id) {
        RbacSup sup = getById(id);
        removeById(sup.getId());
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void updateSup(RbacSupDto supDto) {
        RbacSup sup = BeanUtil.copyProperties(supDto, RbacSup.class);
        sup.setId(supDto.getId());
        sup.setName(supDto.getName());
        sup.setAdminname(supDto.getAdminname());
        sup.setAdminphone(supDto.getAdminphone());
        sup.setQualification(supDto.getQualification());
        sup.setBelongto(supDto.getBelongto());
        sup.setUpdatedAt(LocalDateTime.now());
        updateById(sup);

    }
}
