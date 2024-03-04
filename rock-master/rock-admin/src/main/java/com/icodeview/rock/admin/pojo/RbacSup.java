package com.icodeview.rock.admin.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
/**
 * null
 * @TableName rbac_sup
 */
public class RbacSup {
    @TableId
    @Setter
    @Getter
    private Integer id;
    @Setter
    @Getter
    private Integer belongto;
    @Setter
    @Getter
    private String name;
    @Setter
    @Getter
    private String adminname;
    @Setter
    @Getter
    private String adminphone;
    @Setter
    @Getter
    private String qualification;

    @Setter
    @Getter
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    /**
     *
     */
    @Setter
    @Getter
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    /**
     *
     */
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

}
