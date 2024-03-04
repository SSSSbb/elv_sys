package com.icodeview.rock.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.icodeview.rock.admin.dto.RbacEnterpriseDto;
import com.icodeview.rock.admin.dto.RbacManDto;
import com.icodeview.rock.admin.pojo.RbacMan;
import com.icodeview.rock.admin.vo.RbacManVo;
import com.icodeview.rock.vo.PageResult;

public interface RbacManService extends IService<RbacMan> {
    PageResult<RbacManVo> getIndex(String name, String adminname,String adminphone, Integer belongto,Long pageNum, Long pageSize);
    void createMan(RbacManDto manDto);

    void updateMan(RbacManDto manDto);
    void deleteMan(Integer id);


}
