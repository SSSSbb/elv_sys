package com.icodeview.rock.admin.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.icodeview.rock.admin.dto.RbacFailureDto;
import com.icodeview.rock.admin.mapper.RbacFailureMapper;
import com.icodeview.rock.admin.pojo.RbacFailure;
import com.icodeview.rock.admin.service.RbacFailureService;
import com.icodeview.rock.admin.vo.RbacFailureVo;
import com.icodeview.rock.vo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class RbacFailureServiceImpl extends ServiceImpl<RbacFailureMapper, RbacFailure> implements RbacFailureService {


    @Override
    public PageResult<RbacFailureVo> getIndex(String name, String type, Integer belongto, Long pageNum, Long pageSize) {
        Page<RbacFailure> rbacFailurePage = new Page<>(pageNum, pageSize);
        Page<RbacFailure> page = lambdaQuery()
                .and(StrUtil.isNotBlank(name), q -> q.like(RbacFailure::getName, "%" + name + "%"))
                .and(StrUtil.isNotBlank(type), q -> q.like(RbacFailure::getType, "%" + type + "%"))
                .eq(belongto != null , RbacFailure::getBelongto, belongto)
                .orderByDesc(RbacFailure::getId)
                .page(rbacFailurePage);
        List<RbacFailureVo> record = page.getRecords().stream()
                .map(RbacFailure -> BeanUtil.copyProperties(RbacFailure, RbacFailureVo.class))
                .collect(Collectors.toList());
        System.out.println(record);
        return PageResult.page(record,page);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void createFailure(RbacFailureDto failureDto) {
        RbacFailure failure = BeanUtil.copyProperties(failureDto, RbacFailure.class);
        failure.setName(failureDto.getName());
        failure.setType(failureDto.getType());
        failure.setBelongto(failureDto.getBelongto());
        failure.setCreatedAt(LocalDateTime.now());
        failure.setUpdatedAt(LocalDateTime.now());
        save(failure);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void deleteFailure(Integer id) {
        RbacFailure failure = getById(id);
        removeById(failure.getId());
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void updateFailure(RbacFailureDto failureDto) {
        RbacFailure failure = BeanUtil.copyProperties(failureDto, RbacFailure.class);
        failure.setId(failureDto.getId());
        failure.setName(failureDto.getName());
        failure.setType(failureDto.getType());
        failure.setBelongto(failureDto.getBelongto());
        failure.setUpdatedAt(LocalDateTime.now());
        updateById(failure);

    }



}
