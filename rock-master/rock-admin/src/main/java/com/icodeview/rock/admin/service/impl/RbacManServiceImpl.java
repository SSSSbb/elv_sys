package com.icodeview.rock.admin.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.icodeview.rock.admin.dto.RbacEnterpriseDto;
import com.icodeview.rock.admin.dto.RbacManDto;
import com.icodeview.rock.admin.mapper.RbacMacMapper;
import com.icodeview.rock.admin.pojo.*;
import com.icodeview.rock.admin.service.RbacManService;
import com.icodeview.rock.admin.service.RbacUserService;
import com.icodeview.rock.admin.vo.RbacEnterpriseVo;
import com.icodeview.rock.admin.vo.RbacManVo;
import com.icodeview.rock.admin.vo.RbacUserVo;
import com.icodeview.rock.vo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RbacManServiceImpl extends ServiceImpl<RbacMacMapper, RbacMan> implements RbacManService {

    @Override
    public PageResult<RbacManVo> getIndex(String name, String adminname, String adminphone, Integer belongto,Long pageNum, Long pageSize) {
        Page<RbacMan> rbacManPage = new Page<>(pageNum, pageSize);
        Page<RbacMan> page = lambdaQuery()
                .and(StrUtil.isNotBlank(name), q -> q.like(RbacMan::getName, "%" + name + "%"))
                .and(StrUtil.isNotBlank(adminname), q -> q.like(RbacMan::getAdminname, "%" + adminname + "%"))
                .and(StrUtil.isNotBlank(adminphone), q -> q.like(RbacMan::getAdminphone, "%" + adminphone + "%"))
                .eq(belongto != null , RbacMan::getBelongto, belongto)
                .orderByDesc(RbacMan::getId)
                .page(rbacManPage);
        List<RbacManVo> record = page.getRecords().stream()
                .map(rbacMan -> BeanUtil.copyProperties(rbacMan, RbacManVo.class))
                .collect(Collectors.toList());
        System.out.println(record);
        return PageResult.page(record,page);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void createMan(RbacManDto manDto) {
        RbacMan man = BeanUtil.copyProperties(manDto, RbacMan.class);
        man.setName(manDto.getName());
        man.setAdminname(manDto.getAdminname());
        man.setAdminphone(manDto.getAdminphone());
        man.setBelongto(manDto.getBelongto());
        man.setQualification(manDto.getQualification());
        man.setCreatedAt(LocalDateTime.now());
        man.setUpdatedAt(LocalDateTime.now());
        save(man);
    }
    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void deleteMan(Integer id) {
        RbacMan man = getById(id);
        removeById(man.getId());
    }


    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void updateMan(RbacManDto manDto) {
        RbacMan man = BeanUtil.copyProperties(manDto, RbacMan.class);
        man.setId(manDto.getId());
        man.setName(manDto.getName());
        man.setAdminname(manDto.getAdminname());
        man.setAdminphone(manDto.getAdminphone());
        man.setQualification(manDto.getQualification());
        man.setBelongto(manDto.getBelongto());
        man.setCreatedAt(LocalDateTime.now());
        man.setUpdatedAt(LocalDateTime.now());
        updateById(man);

    }
}
