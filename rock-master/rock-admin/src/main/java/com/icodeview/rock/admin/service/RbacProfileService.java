package com.icodeview.rock.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.icodeview.rock.admin.dto.RbacConditionDto;
import com.icodeview.rock.admin.dto.RbacProfileDto;
import com.icodeview.rock.admin.pojo.RbacProfile;
import com.icodeview.rock.admin.vo.RbacProfileVo;
import com.icodeview.rock.vo.PageResult;

public interface RbacProfileService  extends IService<RbacProfile> {
    PageResult<RbacProfileVo> getIndex(Integer id,String name,String type,String status,String location,String deviceCode,Integer maintain,Integer repair,String user,String man,String sup,String maintaintype,Integer belongto, Long pageNum, Long pageSize);
    void createProfile(RbacProfileDto profileDto);
    void deleteProfile(Integer id);
    void updateProfile(RbacProfileDto profileDto);

}
