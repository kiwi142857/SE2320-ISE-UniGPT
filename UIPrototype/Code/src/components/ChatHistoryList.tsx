import ChatHistoryItem from "./ChatHistoryItem";
import {Divider, List} from "@mui/material";
import React from "react";
import theme from './theme';
import '../css/BotChatPage.css'
import { BotChatHistory } from "../service/BotChat";


const ChatHistoryList = (
    {
        botChatHistoryList,
        selectedId ,
        onItemClicked,
    }: {
        botChatHistoryList: BotChatHistory[];
        selectedId: number ;
        onItemClicked: (id: number) => void;
    })=> {

    return (
        <List>
            {botChatHistoryList.map((botChatHistory, index)=>
                    <React.Fragment key={index}>
                        <ChatHistoryItem
                            title={botChatHistory.title}
                            message={botChatHistory.message}
                            selected={selectedId === botChatHistory.id}
                            onClick={()=>{onItemClicked(botChatHistory.id); } }
                        />
                        {index !== botChatHistoryList.length - 1 &&
                            <Divider
                                className="drawer-divider"
                                style={{ backgroundColor: theme.palette.secondary.main}}
                            />
                        }
                    </React.Fragment>
                )
            }
        </List>
    )
};

export default ChatHistoryList;
