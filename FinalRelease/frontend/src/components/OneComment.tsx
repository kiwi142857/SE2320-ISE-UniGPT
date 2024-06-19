import { Avatar, Divider, Grid } from '@mui/material';
import React from 'react';
import '../css/OneComment.css';

// 评论区的一句对话
// 注意，只有一个单词的时候是不会换行的！
const OneComment = ({
    id,
    name,
    avatar,
    content,
    time,
    avatarLink
}:
    {
        id: number, 
        name: string, 
        avatar: string, 
        content: string ,
        time: Date,
        avatarLink?: string,
    }) => {
    return (
        <>
            <div className='one-comment-container'>
                <Grid container className='one-comment-header'>
                    <Grid>
                        <a href={avatarLink}>
                            <Avatar
                                alt={name}
                                src={avatar}
                                className='one-comment-avatar'
                            />
                        </a>
                        
                    </Grid>
                    <Grid className='one-comment-name'>
                        {name}
                    </Grid>
                </Grid>
                <div className="one-comment-content">
                    {content}
                </div>
                <div className="one-comment-date">
                    {time.toLocaleString("zh-CN")}
                </div>
            </div>
            <br />
            <Divider />
        </>);
};


export default OneComment;
