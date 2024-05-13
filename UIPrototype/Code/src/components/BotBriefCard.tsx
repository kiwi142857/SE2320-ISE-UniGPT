import React from "react";
import {Button, ListItem} from "@mui/material";
import theme from "./theme";
import '../css/BotChatPage.css'
import {useTranslation} from "react-i18next";
const BotBriefCard = () => {
    const {t} = useTranslation();
    return (
        <ListItem
            className="drawer-item"
            style={{backgroundColor: theme.palette.secondary.main}}
        >
            <div className="drawer-item-container">
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                }}>
                    <img
                        src={"/assets/bot-default.png"}
                        alt='bot'
                        className='brief-card-avatar'
                    ></img>
                    <Button
                        className="drawer-button"
                        style={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                        }}
                        href="/botedit"
                    >
                        {t('Modify')}
                    </Button>
                </div>
                <div className="drawer-item-title">
                    {t('Programming Debug Assistant')}
                </div>
                <div
                    className="drawer-item-content"
                    style={{color: theme.palette.primary.light}}
                >
                    {t('The robot can help you debug your code. It can help you find the bug in your ...')}
                   
                </div>
            </div>
        </ListItem>
    );
};

export default BotBriefCard;
