package com.icodeview.rock.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.icodeview.rock.admin.dto.RbacPermissionRoleAuthDto;
import com.icodeview.rock.admin.dto.RbacRoleDto;
import com.icodeview.rock.admin.pojo.RbacPermission;
import com.icodeview.rock.admin.pojo.RbacRole;

import java.util.List;
import java.util.Map;

/**
 *
 */
public interface RbacRoleService extends IService<RbacRole> {
    List<String> getRoleByIds(List<Integer> roleIds);
    Integer createRole(RbacRoleDto dto);
    void updateRole(RbacRoleDto dto);
    void deleteRole(Long id);
    Integer indexRoleByUserId(Long id);

    List<RbacRole> getIndex();
    void authPermission(RbacPermissionRoleAuthDto dto);
    List<Integer> getPermissionIdsByRoleId(Integer roleId);

    Map<String,Boolean> getRoleAccess(List<Integer> roleIds);
}
