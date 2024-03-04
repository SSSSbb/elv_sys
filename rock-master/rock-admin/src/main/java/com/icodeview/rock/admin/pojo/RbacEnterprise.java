package com.icodeview.rock.admin.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * null
 * @TableName rbac_enterprise
 */
@TableName(value ="rbac_enterprise")
@Data
public class RbacEnterprise  implements Serializable {
    @Setter
    @Getter
    @TableId
    private Integer id;



    /**
     *
     */
    @Setter
    @Getter
    private String name;

    @Getter
    @Setter
    private String extrainfo;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    /**
     *
     */
    @Setter
    @Getter
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @Setter
    @Getter
    private String adminname;

    /**
     *
     */


    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

}
