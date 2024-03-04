package com.icodeview.rock.admin.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.icodeview.rock.admin.dto.RbacProfileDto;
import com.icodeview.rock.admin.mapper.RbacProfileMapper;
import com.icodeview.rock.admin.pojo.RbacProfile;
import com.icodeview.rock.admin.service.RbacProfileService;
import com.icodeview.rock.admin.vo.RbacProfileVo;
import com.icodeview.rock.vo.PageResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RbacProfileServiceImpl extends ServiceImpl<RbacProfileMapper, RbacProfile> implements RbacProfileService {
    @Override
    public PageResult<RbacProfileVo> getIndex(Integer id,String name,String type,String status,String location,String deviceCode,Integer maintain,Integer repair,String user,String man,String sup,String maintaintype,Integer belongto, Long pageNum, Long pageSize) {
        Page<RbacProfile> rbacProfilePage = new Page<>(pageNum, pageSize);
        Page<RbacProfile> page = lambdaQuery()
                .eq(id != null , RbacProfile::getId, id)
                .and(StrUtil.isNotBlank(name), q -> q.like(RbacProfile::getName, "%" + name + "%"))
                .and(StrUtil.isNotBlank(type), q -> q.like(RbacProfile::getType, "%" + type + "%"))
                .and(StrUtil.isNotBlank(status), q -> q.like(RbacProfile::getStatus, "%" + status + "%"))
                .and(StrUtil.isNotBlank(location), q -> q.like(RbacProfile::getLocation, "%" + location + "%"))
                .and(StrUtil.isNotBlank(deviceCode), q -> q.like(RbacProfile::getDeviceCode, "%" + deviceCode + "%"))
                .eq(maintain != null , RbacProfile::getMaintain, maintain)
                .eq(repair != null , RbacProfile::getRepair, repair)
                .and(StrUtil.isNotBlank(user), q -> q.like(RbacProfile::getUser, "%" + user + "%"))
                .and(StrUtil.isNotBlank(man), q -> q.like(RbacProfile::getMan, "%" + man + "%"))
                .and(StrUtil.isNotBlank(sup), q -> q.like(RbacProfile::getSup, "%" + sup + "%"))
                .and(StrUtil.isNotBlank(maintaintype), q -> q.like(RbacProfile::getMaintaintype, "%" + maintaintype + "%"))
                .eq(belongto != null , RbacProfile::getBelongto, belongto)
                .orderByDesc(RbacProfile::getId)
                .page(rbacProfilePage);
        List<RbacProfileVo> record = page.getRecords().stream()
                .map(rbacProfile -> BeanUtil.copyProperties(rbacProfile, RbacProfileVo.class))
                .collect(Collectors.toList());
        return PageResult.page(record,page);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void createProfile(RbacProfileDto profilenDto) {
        RbacProfile profile = BeanUtil.copyProperties(profilenDto, RbacProfile.class);
        profile.setName(profilenDto.getName());
        profile.setType(profilenDto.getType());
        profile.setStatus(profilenDto.getStatus());
        profile.setLocation(profilenDto.getLocation());
        profile.setSpec(profilenDto.getSpec());
        profile.setDeviceCode(profilenDto.getDeviceCode());
        profile.setMaintain(profilenDto.getMaintain());
        profile.setRepair(profilenDto.getRepair());
        profile.setUser(profilenDto.getUser());
        profile.setMaintaintype(profilenDto.getMaintaintype());
        profile.setMan(profilenDto.getMan());
        profile.setSup(profilenDto.getSup());
        profile.setBuyAt(profilenDto.getBuyAt());
        profile.setStartAt(profilenDto.getStartAt());
        profile.setLastMaintain(profilenDto.getLastMaintain());
        profile.setLastRepair(profilenDto.getLastRepair());
        profile.setDoc(profilenDto.getDoc());
        profile.setPic(profilenDto.getPic());
        profile.setRegCode(profilenDto.getRegCode());
        profile.setBelongto(profilenDto.getBelongto());
        profile.setCreatedAt(LocalDateTime.now());
        profile.setUpdatedAt(LocalDateTime.now());
        System.out.println(profile);
        save(profile);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void deleteProfile(Integer id) {
        RbacProfile pro = getById(id);
        removeById(pro.getId());
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void updateProfile(RbacProfileDto profilenDto) {
        RbacProfile profile = BeanUtil.copyProperties(profilenDto, RbacProfile.class);
        profile.setId(profilenDto.getId());
        profile.setName(profilenDto.getName());
        profile.setType(profilenDto.getType());
        profile.setStatus(profilenDto.getStatus());
        profile.setLocation(profilenDto.getLocation());
        profile.setSpec(profilenDto.getSpec());
        profile.setDeviceCode(profilenDto.getDeviceCode());
        profile.setMaintain(profilenDto.getMaintain());
        profile.setRepair(profilenDto.getRepair());
        profile.setUser(profilenDto.getUser());
        profile.setMan(profilenDto.getMan());
        profile.setSup(profilenDto.getSup());
        profile.setBuyAt(profilenDto.getBuyAt());
        profile.setStartAt(profilenDto.getStartAt());
        profile.setLastMaintain(profilenDto.getLastMaintain());
        profile.setLastRepair(profilenDto.getLastRepair());
        profile.setDoc(profilenDto.getDoc());
        profile.setPic(profilenDto.getPic());
        profile.setRegCode(profilenDto.getRegCode());
        profile.setBelongto(profilenDto.getBelongto());
        profile.setUpdatedAt(LocalDateTime.now());
        profile.setUpdatedAt(LocalDateTime.now());
        updateById(profile);
    }
}
