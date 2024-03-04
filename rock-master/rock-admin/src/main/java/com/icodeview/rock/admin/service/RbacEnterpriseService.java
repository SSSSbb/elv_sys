package com.icodeview.rock.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.icodeview.rock.admin.dto.RbacEnterpriseDto;
import com.icodeview.rock.admin.pojo.RbacEnterprise;
import com.icodeview.rock.admin.vo.RbacEnterpriseVo;
import com.icodeview.rock.vo.PageResult;

import java.util.List;

public interface RbacEnterpriseService extends IService<RbacEnterprise> {
    PageResult<RbacEnterpriseVo> getIndex(Integer id,String name, String extrainfo, String adminname,Long pageNum, Long pageSize);
    void createEnterprise(RbacEnterpriseDto enterpriseDto);
    void deleteEnterprise(Integer id);
    void updateEnterprise(RbacEnterpriseDto enterpriseDto);
    RbacEnterprise getIndexById(Integer id);

}
