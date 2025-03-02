package com.ise.unigpt.dto;

import com.ise.unigpt.model.User;
import lombok.Data;

@Data
public class UserDTO {
    private Integer id;
    private String name;
    private String avatar;
    private String description;
    private String account;

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.avatar = user.getAvatar();
        this.description = user.getDescription();
        this.account = user.getAccount();
    }
}
