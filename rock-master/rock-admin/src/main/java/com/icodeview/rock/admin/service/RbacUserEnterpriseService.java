package com.icodeview.rock.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.icodeview.rock.admin.pojo.RbacUserEnterprise;

public interface RbacUserEnterpriseService extends IService<RbacUserEnterprise> {

    void attachRelation(Integer userId,Integer enterpriseId);

}
