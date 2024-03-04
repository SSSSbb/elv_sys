package com.icodeview.rock.admin.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.icodeview.rock.admin.dto.RbacConditionDto;
import com.icodeview.rock.admin.mapper.RbacConditionMapper;
import com.icodeview.rock.admin.pojo.RbacCondition;
import com.icodeview.rock.admin.service.RbacConditionService;
import com.icodeview.rock.admin.vo.RbacConditionVo;
import com.icodeview.rock.vo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class RbacConditionServiceImpl extends ServiceImpl<RbacConditionMapper, RbacCondition> implements RbacConditionService {

    @Override
    public PageResult<RbacConditionVo> getIndex(String name,String status, Integer belongto, Long pageNum, Long pageSize) {
        Page<RbacCondition> rbacConditionPage = new Page<>(pageNum, pageSize);
        Page<RbacCondition> page = lambdaQuery()
                .and(StrUtil.isNotBlank(name), q -> q.like(RbacCondition::getName, "%" + name + "%"))
                .and(StrUtil.isNotBlank(status), q -> q.like(RbacCondition::getStatus, "%" + status + "%"))
                .eq(belongto != null , RbacCondition::getBelongto, belongto)
                .orderByDesc(RbacCondition::getId)
                .page(rbacConditionPage);
        List<RbacConditionVo> record = page.getRecords().stream()
                .map(rbacCondition -> BeanUtil.copyProperties(rbacCondition, RbacConditionVo.class))
                .collect(Collectors.toList());
        System.out.println(record);
        return PageResult.page(record,page);
    }


    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void createCondition(RbacConditionDto conditionDto) {
        RbacCondition condition = BeanUtil.copyProperties(conditionDto, RbacCondition.class);
        condition.setName(conditionDto.getName());
        condition.setStatus(conditionDto.getStatus());
        condition.setBelongto(conditionDto.getBelongto());
        condition.setCreatedAt(LocalDateTime.now());
        condition.setUpdatedAt(LocalDateTime.now());
        save(condition);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void deleteCondition(Integer id) {
        RbacCondition condition = getById(id);
        removeById(condition.getId());

    }
    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void updateCondition(RbacConditionDto conditionDto) {
        RbacCondition condition = BeanUtil.copyProperties(conditionDto, RbacCondition.class);
        condition.setId(conditionDto.getId());
        condition.setName(conditionDto.getName());
        condition.setStatus(conditionDto.getStatus());
        condition.setBelongto(conditionDto.getBelongto());
        condition.setUpdatedAt(LocalDateTime.now());
        updateById(condition);

    }

}
