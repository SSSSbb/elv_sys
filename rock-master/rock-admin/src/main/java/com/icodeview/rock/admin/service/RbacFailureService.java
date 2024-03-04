package com.icodeview.rock.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.icodeview.rock.admin.dto.RbacConditionDto;
import com.icodeview.rock.admin.dto.RbacFailureDto;
import com.icodeview.rock.admin.pojo.RbacFailure;
import com.icodeview.rock.admin.vo.RbacFailureVo;
import com.icodeview.rock.vo.PageResult;

public interface RbacFailureService extends IService<RbacFailure> {
    PageResult<RbacFailureVo> getIndex(String name, String type, Integer belongto, Long pageNum, Long pageSize);
    void createFailure(RbacFailureDto failureDto);
    void deleteFailure(Integer id);
    void updateFailure(RbacFailureDto failureDto);
}
