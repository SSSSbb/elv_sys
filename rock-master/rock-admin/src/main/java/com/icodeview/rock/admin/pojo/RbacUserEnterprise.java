package com.icodeview.rock.admin.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * null
 * @TableName rbac_user_enterprise
 */
@TableName(value ="rbac_user_enterprise")
@Data
public class RbacUserEnterprise implements Serializable {
    /**
     *
     */
    @TableId
    private Integer id;

    /**
     *
     */
    private Integer userId;

    /**
     *
     */
    private Integer enterpriseId;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}