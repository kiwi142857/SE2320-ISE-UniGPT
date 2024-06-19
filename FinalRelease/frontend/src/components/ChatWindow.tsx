import { Box } from "@mui/system";
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import OneChat from "./OneChat";
import theme from "../components/theme";
import '../css/App.css';
import '../css/BotChatPage.css';
import { BotChat } from "../service/BotChat";

const ChatWindow = (
    { botChatList, resendLast, loading }:
        { botChatList: BotChat[], resendLast: (text: string) => void, loading: boolean }
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

    const { t } = useTranslation();

    useEffect(() => {
        scrollToBottom();
    }, [botChatList]);

    const shuffleLast = () => {
        console.log("shuffleLast");
        if (botChatList.length >= 2) {
            const lastUserChat = botChatList[botChatList.length - 2];
            console.log("lastUserChat: ", lastUserChat);
            resendLast(lastUserChat.content);
        }
    }

    const editLast = (editedContent: string) => {
        console.log("editLast");
        if (botChatList.length >= 2) {
            const lastUserChat = botChatList[botChatList.length - 2];
            console.log("lastUserChat: ", lastUserChat);
            resendLast(editedContent);
        }
    }


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
                            type={botChat.type}
                            last={index >= botChatList.length - 2}
                            shuffleLast={shuffleLast}
                            editLast={editLast}
                            loading={loading && index === botChatList.length - 1}
                        />
                    ))}
                </Box>
            ) : (
                <div className="chat-hint-container">
                    <div
                        className="chat-hint-text"
                        style={{ color: theme.palette.secondary.main }}
                    >
                        {t("Fill in the prompt table and start chatting!")}
                    </div>
                </div>
            )}
        </Box>
    );
}

export default ChatWindow;