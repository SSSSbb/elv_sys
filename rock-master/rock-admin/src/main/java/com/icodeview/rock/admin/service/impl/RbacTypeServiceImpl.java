package com.icodeview.rock.admin.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.icodeview.rock.admin.dto.RbacTypeDto;
import com.icodeview.rock.admin.mapper.RbacTypeMapper;
import com.icodeview.rock.admin.pojo.RbacType;
import com.icodeview.rock.admin.service.RbacTypeService;
import com.icodeview.rock.admin.vo.RbacTypeVo;
import com.icodeview.rock.vo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RbacTypeServiceImpl extends ServiceImpl<RbacTypeMapper, RbacType> implements RbacTypeService {

    @Override
    public PageResult<RbacTypeVo> getIndex(String name, Integer belongto ,Long pageNum, Long pageSize) {
        Page<RbacType> rbacTypePage = new Page<>(pageNum, pageSize);
        Page<RbacType> page = lambdaQuery()
                .and(StrUtil.isNotBlank(name), q -> q.like(RbacType::getName, "%" + name + "%"))
                .eq(belongto != null , RbacType::getBelongto, belongto)
                .orderByDesc(RbacType::getId)
                .page(rbacTypePage);
        System.out.println(name);
        List<RbacTypeVo> record = page.getRecords().stream()
                .map(rbacType -> BeanUtil.copyProperties(rbacType, RbacTypeVo.class))
                .collect(Collectors.toList());
        System.out.println(record);
        return PageResult.page(record,page);
    }


    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void createType(RbacTypeDto typeDto) {
        RbacType type = BeanUtil.copyProperties(typeDto, RbacType.class);
        type.setName(typeDto.getName());
        type.setExtrainfo(typeDto.getExtrainfo());
        type.setBelongto(typeDto.getBelongto());
        type.setCreatedAt(LocalDateTime.now());
        type.setUpdatedAt(LocalDateTime.now());
        save(type);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void deleteType(Integer id) {
        RbacType type = getById(id);
        removeById(type.getId());
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void updateType(RbacTypeDto typeDto) {
        RbacType type = BeanUtil.copyProperties(typeDto, RbacType.class);
        type.setId(typeDto.getId());
        type.setName(typeDto.getName());
        type.setExtrainfo(typeDto.getExtrainfo());
        type.setBelongto(typeDto.getBelongto());
        type.setUpdatedAt(LocalDateTime.now());
        updateById(type);
    }

}
