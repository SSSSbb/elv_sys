package com.icodeview.rock.admin.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
@Data

public class RbacProfileVo {
    private Integer id;
    private String name;
    private String type;
    private String status;
    private String location;
    private String spec;
    private String deviceCode;
    private Integer belongto;
    private Integer maintain;
    private Integer repair;
    private String user;
    private String man;
    private String sup;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime buyAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastMaintain;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastRepair;
    private String maintaintype;
    private byte[] doc;
    private byte[] pic;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
    private String regCode;
}
