import ChatHistoryItem from "./ChatHistoryItem";
import { CircularProgress, List } from "@mui/material";
import React from "react";
import '../css/BotChatPage.css'
import { BotChatHistory } from "../service/BotChat";
import { useTranslation } from "react-i18next";
import theme from "./theme";


const ChatHistoryList = (
    {
        botChatHistoryList,
        selectedId,
        onItemClicked,
        loading,
        onItemDeleted
    }: {
        botChatHistoryList: BotChatHistory[];
        selectedId: number;
        onItemClicked: (id: number) => void;
        loading: boolean;
        onItemDeleted: (id: number) => void;
    }) => {

    const {t } = useTranslation();
    return (
        <List>{
                loading ? <CircularProgress /> : 
                botChatHistoryList.length ? 
                botChatHistoryList.map((botChatHistory, index) =>
                <React.Fragment key={index}>
                    <ChatHistoryItem
                        title={botChatHistory.title}
                        message={botChatHistory.content}
                        selected={selectedId === botChatHistory.id}
                        onClick={() => { onItemClicked(botChatHistory.id); }}
                        onDelete={() => { onItemDeleted(botChatHistory.id);}}
                    />
                </React.Fragment>
            ) :
            <div
                className="drawer-item-title"
                style={{ color: theme.palette.secondary.dark, margin: 25 }}
            >
                {t('No chat history yet.')}
            </div>
        } </List>
    )
};

export default ChatHistoryList;
