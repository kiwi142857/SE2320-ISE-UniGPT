import { Box } from "@mui/system";
import React, { useEffect, useRef } from 'react';
import OneChat from "../components/OneChat";
import theme from "../components/theme";
import '../css/App.css';
import '../css/BotChatPage.css';
import { BotChat } from "../service/BotChat";

const ChatWindow = (
    { botChatList }: { botChatList: BotChat[] }
) => {

    const chatWindowRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        // console.log("scrollToBottom: current scrollHeight clientHeight", chatWindowRef.current, chatWindowRef.current?.scrollHeight, chatWindowRef.current?.clientHeight);
        // if (chatWindowRef.current) {
        //     console.log("Before scrollToBottom: scrollTop", chatWindowRef.current.scrollTop);
        //     chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        //     console.log("After scrollToBottom: scrollTop", chatWindowRef.current.scrollTop);
        // }
        window.scrollTo(0, document.body.scrollHeight + 1000);

    }

    useEffect(() => {
        scrollToBottom();
    }, [botChatList]);

    return (
        <Box
            ref={chatWindowRef}
            sx={{
                width: '90%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {botChatList.length ? (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {botChatList.map((botChat, index) => (
                        <OneChat
                            key={index}
                            id={botChat.id}
                            name={botChat.name}
                            avatar={botChat.avatar}
                            content={botChat.content}
                        />
                    ))}
                </Box>
            ) : (
                <div className="chat-hint-container">
                    <div
                        className="chat-hint-text"
                        style={{ color: theme.palette.secondary.main }}
                    >
                        Fill in the prompt table and start chatting!
                    </div>
                </div>
            )}
        </Box>
    );
}

export default ChatWindow;