package com.ise.unigpt.service;

import com.ise.unigpt.dto.UpdateUserInfoRequestDTO;
import com.ise.unigpt.model.User;
import com.ise.unigpt.dto.*;

import javax.security.sasl.AuthenticationException;

public interface UserService {

    /**
     * @brief 根据用户id查找用户
     * @param id 用户id
     * @return 用户
     */
    User findUserById(Integer id);

    /**
     * @brief 更新用户信息
     * @param id                       用户id
     * @param updateUserInfoRequestDTO 更新用户信息请求
     * @param token                    用户token
     */
    void updateUserInfo(
            Integer id,
            UpdateUserInfoRequestDTO updateUserInfoRequestDTO,
            String token) throws AuthenticationException;

    /**
     * @brief 获取使用过的机器人
     * @param userid   用户id
     * @param token    用户token
     * @param page     页码
     * @param pageSize 每页大小
     */
    GetBotsOkResponseDTO getUsedBots(Integer userid, String token, Integer page, Integer pageSize)
            throws AuthenticationException;

    /**
     * @brief 获取收藏的机器人
     * @param userid   用户id
     * @param token    用户token
     * @param page     页码
     * @param pageSize 每页大小
     */
    GetBotsOkResponseDTO getStarredBots(Integer userid, String token, Integer page, Integer pageSize)
            throws AuthenticationException;

    /**
     * @brief 获取创建的机器人
     * @param userid   用户id
     * @param token    用户token
     * @param page     页码
     * @param pageSize 每页大小
     */
    GetBotsOkResponseDTO getCreatedBots(Integer userid, String token, Integer page, Integer pageSize);

}
