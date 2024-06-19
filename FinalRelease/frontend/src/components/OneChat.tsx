import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Avatar, Divider, Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactMarkdown from 'react-markdown';
import '../css/OneChat.css';
import { useState } from 'react';
import { use } from 'i18next';
import { TailSpin } from 'react-loader-spinner';

// 聊天或评论区的一句对话
// 注意，只有一个单词的时候是不会换行的！
const OneChat = (
    { id, name, avatar, content, type, last = false, shuffleLast, editLast, loading }:
        { id: number, name: string, avatar: string, content: string, type: boolean, last: boolean, shuffleLast: () => void, editLast: (editedContent: string) => void, loading: boolean }
) => {
    const [pressCopy, setPressCopy] = useState(false);
    const [pressReplay, setPressReplay] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const onSave = () => {
        editLast(editedContent);
        setEditing(false);
    }

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
                <div className='one-chat-markdown'>
                    {
                        editing ? (
                            <TextField
                                multiline
                                fullWidth
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                        ) : (
                            loading && type ? (
                                <TailSpin
                                    color='grey'
                                    height={20}
                                    width={20}
                                />
                            ) : (
                                <ReactMarkdown>
                                    {content}
                                </ReactMarkdown>
                            )
                        )
                    }

                </div>

                <Grid container sx={{ marginLeft: 11, marginTop: 2 }} >
                    {
                        (type == true && loading == false) &&
                        // 复制按钮，浅灰色，左对齐，小号
                        <Grid>
                            <CopyToClipboard text={content}>
                                <ContentCopyIcon
                                    sx={{ color: pressCopy ? 'grey' : 'darkgrey', fontSize: 20 }}
                                    onMouseDown={() => setPressCopy(true)}
                                    onMouseUp={() => setPressCopy(false)}
                                />
                            </CopyToClipboard>
                        </Grid>
                    }

                    {
                        (type == true && last == true && !loading) &&
                        // 重新生成按钮，浅灰色，小号
                        <Grid>
                            <ReplayIcon
                                sx={{ color: pressReplay ? 'grey' : 'darkgrey', fontSize: 20, marginLeft: 2 }}
                                onMouseDown={() => setPressReplay(true)}
                                onMouseUp={() => setPressReplay(false)}
                                onClick={() => shuffleLast()}
                            />
                        </Grid>
                    }

                    {
                        (type == false && last == true) && (
                            editing ? (
                                // 保存，浅灰色，小号
                                <Grid>
                                    <SaveIcon
                                        sx={{ color: 'grey', fontSize: 20 }}
                                        onClick={onSave}
                                    />
                                </Grid>
                            ) : (
                                // 编辑，浅灰色，小号
                                <Grid>
                                    <EditIcon
                                        sx={{ color: 'grey', fontSize: 20 }}
                                        onClick={() => setEditing(true)}
                                    />
                                </Grid>)
                        )
                    }
                </Grid>
            </div >
            <br />
            <Divider />
        </>);
};


export default OneChat;
