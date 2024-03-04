package com.icodeview.rock.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.icodeview.rock.admin.dto.RbacConditionDto;
import com.icodeview.rock.admin.dto.RbacLocationDto;
import com.icodeview.rock.admin.pojo.RbacLocation;
import com.icodeview.rock.admin.vo.RbacConditionVo;
import com.icodeview.rock.admin.vo.RbacLocationVo;
import com.icodeview.rock.vo.PageResult;

import java.math.BigDecimal;

public interface RbacLocationService extends IService<RbacLocation> {

    PageResult<RbacLocationVo> getIndex(String name, BigDecimal longitude, BigDecimal latitude, Integer belongto, Long pageNum, Long pageSize);
    void updateLocation(RbacLocationDto locationDto);
    void createLocation(RbacLocationDto locationDto);
    void deleteLocation(Integer id);

}
