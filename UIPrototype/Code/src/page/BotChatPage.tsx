import {
    Drawer,
    Toolbar, Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import OneChat from "../components/OneChat";

import '../css/App.css'
import '../css/BotChatPage.css'
import { PromptInput } from "../components/Inputs";
import ChatHistoryList from "../components/ChatHistoryList";
import BotBriefCard from "../components/BotBriefCard";
import TableCreateDialog from "../components/TableCreateDialog";
import { BotChat, BotChatHistory, getBotChatHistoryList, getBotChatList } from "../service/BotChat";
import { useTranslation } from "react-i18next";
import theme from "../components/theme";

// bot聊天页
// 侧边栏宽度
let drawerWidth = 350;
const BotChatPage = () => {
    const [tableCreateOpen, setTableCreateOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(0);
    const [botChatHistoryList, setBotChatHistoryList] = useState<BotChatHistory[]>([]);
    const [botChatList, setBotChatList] = useState<BotChat[]>([]);

    const { t } = useTranslation();
    const getChatHistoryList = async () => {
        const list = await getBotChatHistoryList();
        setBotChatHistoryList(list);
    };

    useEffect(() => {
        getChatHistoryList();
    }, []);


    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar
                        style={{ height: 100, }}
                    />
                    <BotBriefCard />
                    <ChatHistoryList
                        botChatHistoryList={botChatHistoryList}
                        selectedId={selectedHistory}
                        onItemClicked={async (id) => {
                            setSelectedHistory(id);
                            const list = await getBotChatList(id);
                            setBotChatList(list);
                        }}
                    />
                </Drawer>
                <Box
                    className="main-container bot-chat-container"
                    flexDirection="column"
                    alignItems="center"
                    display="flex"
                    width="100%"
                >
                    {botChatList.length ? (
                        <Box sx={{
                            width: '90%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            {(botChatList.map((botChat, index) =>
                                <React.Fragment key={index}>
                                    <OneChat
                                        id={botChat.id}
                                        name={botChat.name}
                                        avatar={botChat.avatar}
                                        content={botChat.content}
                                    />
                                </React.Fragment>))}
                        </Box>) : (
                        <div className="chat-hint-container">
                            <div
                                className="chat-hint-text"
                                style={{ color: theme.palette.secondary.main }}
                            >
                                {t('Fill the table template and start messaging with your own assistant!')}
                            </div>
                        </div>
                    )
                    }
                    <PromptInput
                        onAltTable={() => {
                            setTableCreateOpen(true);
                        }}
                        onSend={(text) => {
                            setBotChatList([
                                ...botChatList,
                                {
                                    id: '',
                                    name: '你',
                                    historyId: selectedHistory,
                                    avatar: '/assets/user-default.png',
                                    content: text
                                }]);
                            window.scrollTo(0, document.body.scrollHeight);
                        }} />
                    <TableCreateDialog
                        open={tableCreateOpen}
                        handleClose={() => {
                            setTableCreateOpen(false);
                        }}
                        handleSubmit={() => {
                        }} />
                </Box>
            </div>
        </>
    );
}

export default BotChatPage;
