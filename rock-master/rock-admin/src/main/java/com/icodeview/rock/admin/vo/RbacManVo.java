package com.icodeview.rock.admin.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.icodeview.rock.admin.pojo.RbacRole;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class RbacManVo {
    private Integer id;
    private String name;
    private String adminname;
    private String adminphone;
    private Integer belongto;
    private String qualification;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
