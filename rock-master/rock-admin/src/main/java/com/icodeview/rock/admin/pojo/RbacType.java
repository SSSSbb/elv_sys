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
 * @TableName rbac_type
 */
@Setter
@Getter
public class RbacType  {
    @TableId
    private Integer id;

    /**
     *
     */
    private String name;
    private Integer belongto;
    private String extrainfo;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    /**
     *
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
