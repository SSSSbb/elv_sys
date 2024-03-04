package com.icodeview.rock.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.icodeview.rock.admin.dto.RbacSupDto;
import com.icodeview.rock.admin.pojo.RbacSup;
import com.icodeview.rock.admin.vo.RbacSupVo;
import com.icodeview.rock.vo.PageResult;

public interface RbacSupService extends IService<RbacSup> {
    PageResult<RbacSupVo> getIndex(String name, String adminname, String adminphone, Integer belongto, Long pageNum, Long pageSize);
    void createSup(RbacSupDto supDto);

    void updateSup(RbacSupDto supDto);
    void deleteSup(Integer id);


}
