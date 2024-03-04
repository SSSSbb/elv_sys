package com.icodeview.rock.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.icodeview.rock.admin.dto.RbacSupDto;
import com.icodeview.rock.admin.dto.RbacTypeDto;
import com.icodeview.rock.admin.pojo.RbacType;
import com.icodeview.rock.admin.vo.RbacTypeVo;
import com.icodeview.rock.vo.PageResult;

public interface RbacTypeService extends IService<RbacType> {
    PageResult<RbacTypeVo> getIndex(String name,  Integer belongto,Long pageNum, Long pageSize);
    void createType(RbacTypeDto typeDto);
    void deleteType(Integer id);

    void updateType(RbacTypeDto typeDto);


}
