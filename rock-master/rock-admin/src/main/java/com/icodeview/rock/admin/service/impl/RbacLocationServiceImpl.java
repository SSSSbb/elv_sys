package com.icodeview.rock.admin.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.icodeview.rock.admin.dto.RbacConditionDto;
import com.icodeview.rock.admin.dto.RbacLocationDto;
import com.icodeview.rock.admin.mapper.RbacLocationMapper;
import com.icodeview.rock.admin.pojo.RbacCondition;
import com.icodeview.rock.admin.pojo.RbacLocation;
import com.icodeview.rock.admin.service.RbacLocationService;
import com.icodeview.rock.admin.vo.RbacLocationVo;
import com.icodeview.rock.vo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class RbacLocationServiceImpl extends ServiceImpl<RbacLocationMapper, RbacLocation> implements RbacLocationService {
    public PageResult<RbacLocationVo> getIndex(String name, BigDecimal longitude, BigDecimal latitude, Integer belongto, Long pageNum, Long pageSize) {
        Page<RbacLocation> rbacLocationPage = new Page<>(pageNum, pageSize);
        Page<RbacLocation> page = lambdaQuery()
                .and(StrUtil.isNotBlank(name), q -> q.like(RbacLocation::getName, "%" + name + "%"))
                .eq(belongto != null , RbacLocation::getBelongto, belongto)
                .eq(longitude != null , RbacLocation::getLongitude, longitude)
                .eq(latitude != null , RbacLocation::getLatitude, latitude)
                .orderByDesc(RbacLocation::getId)
                .page(rbacLocationPage);
        List<RbacLocationVo> record = page.getRecords().stream()
                .map(rbacLocation -> BeanUtil.copyProperties(rbacLocation, RbacLocationVo.class))
                .collect(Collectors.toList());
        System.out.println(record);
        return PageResult.page(record,page);
    }


    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void updateLocation(RbacLocationDto locationDto) {
        RbacLocation location = BeanUtil.copyProperties(locationDto, RbacLocation.class);
        location.setId(locationDto.getId());
        location.setName(locationDto.getName());
        location.setLongitude(locationDto.getLongitude());
        location.setLatitude(locationDto.getLatitude());
        location.setBelongto(locationDto.getBelongto());
        location.setUpdatedAt(LocalDateTime.now());
        updateById(location);
    }
    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void deleteLocation(Integer id) {
        RbacLocation location = getById(id);
        removeById(location.getId());

    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void createLocation(RbacLocationDto locationDto) {
        RbacLocation location = BeanUtil.copyProperties(locationDto, RbacLocation.class);
        location.setName(locationDto.getName());
        location.setLongitude(locationDto.getLongitude());
        location.setLatitude(locationDto.getLatitude());
        location.setBelongto(locationDto.getBelongto());
        location.setCreatedAt(LocalDateTime.now());
        location.setUpdatedAt(LocalDateTime.now());
        save(location);
    }
}
