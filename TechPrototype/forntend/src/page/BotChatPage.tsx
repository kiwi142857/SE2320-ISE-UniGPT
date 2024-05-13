import {
    Drawer,
    Toolbar, Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import OneChat from "../components/OneChat";
import { createWebSocketConnection, sendMessage } from "../service/webSocket";
import { useTranslation } from "react-i18next";
import BotBriefCard from "../components/BotBriefCard";
import ChatHistoryList from "../components/ChatHistoryList";
import { PromptInput } from "../components/Inputs";
import TableCreateDialog from "../components/TableCreateDialog";
import theme from "../components/theme";
import '../css/App.css';
import '../css/BotChatPage.css';
import { Prompt, BotChat, BotChatHistory, BotBriefInfo, getBotChatHistoryList, getBotBrief, getBotChatList, createHistory } from "../service/BotChat";
import { useParams } from "react-router-dom";
import { use } from "i18next";
import { getMe } from "../service/user";
import ChatWindow from "../components/ChatWindow";


// bot聊天页
// 侧边栏宽度
let drawerWidth = 350;
const BotChatPage = () => {
    let { botID } = useParams<{ botID: string; }>();
    botID === undefined ? botID = "" : botID = botID;


    const [tableCreateOpen, setTableCreateOpen] = useState(false);
    const [selectedHistoryId, setSelectedHistoryId] = useState(0);
    const [botChatHistoryList, setBotChatHistoryList] = useState<BotChatHistory[] | null>([]);
    const [botChatList, setBotChatList] = useState<BotChat[]>([]);
    const [botBriefInfo, setBotBriefInfo] = useState<BotBriefInfo | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [user, setUser] = useState({ id: 0, name: '', avatar: '' })

    const { t } = useTranslation();

    useEffect(() => {
        const getBrief = async () => {
            const brief = await getBotBrief(botID);
            setBotBriefInfo(brief);
            console.log("brief: ", brief);
        };
        const getUser = async () => {
            let me = await getMe();
            if (me)
                setUser(me);
        }

        console.log(botID);
        getBrief();
        getUser();
    }, []);

    useEffect(() => {
        const getChatHistoryList = async () => {
            const list = await getBotChatHistoryList(botID, 0, 20);
            setBotChatHistoryList(list);
            console.log("BotChatHistoryList: ", list);
        };
        getChatHistoryList();
    }, [selectedHistoryId]);

    const onSubmit = async (promptlist: Prompt[]) => {
        console.log("PromptList: ", promptlist);
        const newHistoryId = await createHistory(botID, promptlist);
        setSelectedHistoryId(newHistoryId);
    };

    // websocket
    const WebSocketConnection = (id: number) => {
        // Create a new WebSocket connection
        // if websocket has been created, close it first
        if (socket) {
            console.log("WebSocketConnection close: ", socket);
            socket.close();
        }
        console.log("WebSocketConnection start: ", id);
        setSocket(createWebSocketConnection(id));
        console.log("WebSocketConnection: ", socket);

    };
    // update botChatList
    useEffect(() => {
        const getChatList = async () => {
            const list = await getBotChatList(selectedHistoryId);

            setBotChatList(list);
        };
        getChatList();
    }, [selectedHistoryId]);

    useEffect(() => {
        // 将 当前 selectedHistoryId 移动到 botChatHistoryList 的最前端
        if (botChatHistoryList && selectedHistoryId) {
            const index = botChatHistoryList.findIndex((item) => item.id === selectedHistoryId);
            if (index !== -1) {
                const temp = botChatHistoryList[index];
                botChatHistoryList.splice(index, 1);
                botChatHistoryList.unshift(temp);
            }
        }
    }, [botChatList]);

    // update socket
    useEffect(() => {
        if (socket) {
            // Handle incoming messages
            socket.onmessage = (event) => {
                console.log("In onmessage: ", botChatList);
                console.log('Message from server: ', event.data);
                let response: { replyMessage: string };
                try {
                    response = JSON.parse(event.data);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    response = { replyMessage: 'Error parsing JSON' };
                    // Handle the error as needed
                }
                console.log('Message from server: ', response.replyMessage);
                console.log('my botChatList: ', botChatList);

                setBotChatList(
                    botChatList =>
                        [...botChatList, {
                            id: 0,
                            name: botBriefInfo ? botBriefInfo.name : "",
                            historyId: selectedHistoryId,
                            avatar: botBriefInfo ? botBriefInfo.avatar : "",
                            content: response.replyMessage
                        }]);
            };

            // Handle any errors that occur.
            socket.onerror = (error) => {
                console.error('WebSocket Error: ', error);
                // TODO: Update your state to indicate that an error occurred
            };
        }
    }, [socket]); // Add socket as a dependency



    const onChatButtonClick = () => {
        console.log("Click Chat");
        setSelectedHistoryId(0);
    }
    return (
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
                <BotBriefCard botBriefInfo={botBriefInfo} onChatButtonClick={onChatButtonClick} />
                <Typography
                    className="drawer-item-content"
                    style={{
                        marginTop: 20,
                        marginLeft: 25,
                        color: theme.palette.primary.light,
                        fontWeight: 'bold',
                        fontFamily: 'Abril Face',
                        fontSize: 20,
                    }}
                >
                    {t('Chat History')}
                </Typography>
                {/* 判断 botChatHistoryList 是否为空*/}
                {botChatHistoryList && botChatHistoryList.length ? (
                    <ChatHistoryList
                        botChatHistoryList={botChatHistoryList}
                        selectedId={selectedHistoryId}
                        onItemClicked={async (id) => {
                            setSelectedHistoryId(id);
                            const list = await getBotChatList(id);
                            setBotChatList(list);
                            console.log("BotChatList 111: ", list);
                            WebSocketConnection(id);
                        }}
                    />
                ) : (
                    <div
                        className="drawer-item-title"
                        style={{ color: theme.palette.secondary.dark, margin: 25 }}
                    >
                        {t('No chat history yet.')}
                    </div>
                )}
            </Drawer>
            <Box
                className="main-container bot-chat-container"
                flexDirection="column"
                alignItems="center"
                display="flex"
                width="100%"
            >
                <ChatWindow botChatList={botChatList} />
                {/* 输入框，发送按钮，编辑按钮 */}
                <PromptInput
                    selectedHistoryId={selectedHistoryId}
                    onAltTable={() => {
                        setTableCreateOpen(true);
                    }}
                    onSend={(text) => {
                        setBotChatList(
                            botChatList =>
                                [...botChatList, {
                                    id: 0,
                                    name: user.name,
                                    historyId: selectedHistoryId,
                                    avatar: user.avatar,
                                    content: text,
                                }]);
                        // 向 WebSocket 发送消息
                        sendMessage(socket, text);
                    }} />
                {/* 弹出 prompt 表格 */}
                <TableCreateDialog
                    botID={botID}
                    historyId={selectedHistoryId}
                    open={tableCreateOpen}
                    handleClose={() => {
                        setTableCreateOpen(false);
                    }}
                    handleSubmit={onSubmit} />
            </Box>
        </div>
    );
};

export default BotChatPage;
