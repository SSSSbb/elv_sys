package com.icodeview.rock.admin.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.icodeview.rock.admin.dto.RbacMaintainDto;
import com.icodeview.rock.admin.dto.RbacTypeDto;
import com.icodeview.rock.admin.mapper.RbacMaintainMapper;
import com.icodeview.rock.admin.mapper.RbacTypeMapper;
import com.icodeview.rock.admin.pojo.RbacMaintain;
import com.icodeview.rock.admin.pojo.RbacType;
import com.icodeview.rock.admin.service.RbacMaintainService;
import com.icodeview.rock.admin.service.RbacTypeService;
import com.icodeview.rock.admin.vo.RbacMaintainVo;
import com.icodeview.rock.admin.vo.RbacTypeVo;
import com.icodeview.rock.vo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class RbacMaintainServiceImpl extends ServiceImpl<RbacMaintainMapper, RbacMaintain> implements RbacMaintainService {

    @Override
    public PageResult<RbacMaintainVo> getIndex(String level, Integer belongto,Long pageNum, Long pageSize) {
        Page<RbacMaintain> rbacMaintainPage = new Page<>(pageNum, pageSize);
        Page<RbacMaintain> page = lambdaQuery()
                .and(StrUtil.isNotBlank(level), q -> q.like(RbacMaintain::getName, "%" + level + "%"))
                .eq(belongto != null , RbacMaintain::getBelongto, belongto)
                .orderByDesc(RbacMaintain::getId)
                .page(rbacMaintainPage);
        List<RbacMaintainVo> record = page.getRecords().stream()
                .map(rbacMaintain -> BeanUtil.copyProperties(rbacMaintain, RbacMaintainVo.class))
                .collect(Collectors.toList());
        System.out.println(record);
        return PageResult.page(record,page);
    }
    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void createMaintain(RbacMaintainDto maintainDto) {
        RbacMaintain maintain = BeanUtil.copyProperties(maintainDto, RbacMaintain.class);
        maintain.setName(maintainDto.getName());
        maintain.setDays(maintainDto.getDays());
        maintain.setLevel(maintainDto.getLevel());
        maintain.setFrequency(maintainDto.getFrequency());
        maintain.setBelongto(maintainDto.getBelongto());
        maintain.setCreatedAt(LocalDateTime.now());
        maintain.setUpdatedAt(LocalDateTime.now());
        save(maintain);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void deleteMaintain(Integer id) {
        RbacMaintain type = getById(id);
        removeById(type.getId());
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void updateMaintain(RbacMaintainDto maintainDto) {
        RbacMaintain maintain = BeanUtil.copyProperties(maintainDto, RbacMaintain.class);
        maintain.setId(maintainDto.getId());
        maintain.setName(maintainDto.getName());
        maintain.setDays(maintainDto.getDays());
        maintain.setLevel(maintainDto.getLevel());
        maintain.setFrequency(maintainDto.getFrequency());
        maintain.setBelongto(maintainDto.getBelongto());
        maintain.setUpdatedAt(LocalDateTime.now());
        updateById(maintain);

    }

}
