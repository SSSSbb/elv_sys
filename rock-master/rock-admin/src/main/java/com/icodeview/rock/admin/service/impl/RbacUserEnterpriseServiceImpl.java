package com.icodeview.rock.admin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.icodeview.rock.admin.mapper.RbacUserEnterpriseMapper;
import com.icodeview.rock.admin.pojo.RbacUserEnterprise;
import com.icodeview.rock.admin.service.RbacUserEnterpriseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RbacUserEnterpriseServiceImpl extends ServiceImpl<RbacUserEnterpriseMapper, RbacUserEnterprise> implements RbacUserEnterpriseService {
    @Override
    @Transactional
    public void attachRelation(Integer userId, Integer enterpriseId) {
        lambdaUpdate().eq(RbacUserEnterprise::getUserId,userId)
                .remove();
        RbacUserEnterprise userEnterprise = new RbacUserEnterprise();
        userEnterprise.setEnterpriseId(enterpriseId);
        userEnterprise.setUserId(userId);
        save(userEnterprise);
    }
}
