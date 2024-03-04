package com.icodeview.rock.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.icodeview.rock.admin.dto.RbacMaintainDto;
import com.icodeview.rock.admin.dto.RbacTypeDto;
import com.icodeview.rock.admin.pojo.RbacMaintain;
import com.icodeview.rock.admin.vo.RbacMaintainVo;
import com.icodeview.rock.vo.PageResult;

public interface RbacMaintainService extends IService<RbacMaintain> {

    PageResult<RbacMaintainVo> getIndex(String level,Integer belongto,Long pageNum, Long pageSize);

    void createMaintain(RbacMaintainDto maintainDto);
    void deleteMaintain(Integer id);
    void updateMaintain(RbacMaintainDto maintainDto);
}
