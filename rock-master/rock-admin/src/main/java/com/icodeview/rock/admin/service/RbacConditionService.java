package com.icodeview.rock.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.icodeview.rock.admin.dto.RbacConditionDto;
import com.icodeview.rock.admin.pojo.RbacCondition;
import com.icodeview.rock.admin.vo.RbacConditionVo;
import com.icodeview.rock.vo.PageResult;

public interface RbacConditionService extends IService<RbacCondition> {
    PageResult<RbacConditionVo> getIndex(String name, String status,Integer belongto, Long pageNum, Long pageSize);


    void createCondition(RbacConditionDto conditionDto);
    void deleteCondition(Integer id);
    void updateCondition(RbacConditionDto conditionDto);

}
