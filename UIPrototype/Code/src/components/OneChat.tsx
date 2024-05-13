import { Avatar, Divider, Grid } from '@mui/material';
import React from 'react';
import '../css/OneChat.css';

// 聊天或评论区的一句对话
// 注意，只有一个单词的时候是不会换行的！
const OneChat = ({ id, name, avatar, content }: { id:string, name:string, avatar:string, content:string }) => {
  return (
      <>
          <div className='one-chat-container'>
              <div>
                  <Grid container className='one-chat-header'>
                      <Grid>
                          <Avatar
                              alt={name}
                              src={avatar}
                              className='one-chat-avatar'
                          />
                      </Grid>
                      <Grid className='one-chat-name'>
                          {name}
                      </Grid>
                  </Grid>
              </div>
              <div className='one-chat-content'>
                  {content}
              </div>
          </div>
          <br/>
          <Divider/>
      </>);
};


export default OneChat;
