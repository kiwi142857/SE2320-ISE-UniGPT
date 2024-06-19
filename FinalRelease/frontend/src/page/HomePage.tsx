import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FavoriteHeader, BotList, RecentUsedHeader } from "../components/BotList";
import '../css/Home.css';
import { useSearchParams } from "react-router-dom";
import { LanguageContext } from "../provider/LanguageProvider";
import { Bot } from '../service/bot';
import { use } from 'i18next';
import { useState } from 'react';
import { getUserFavoriteBots } from '../service/user';
import { getUerUsedBots, User } from '../service/user';
import { getMe } from '../service/user';
import { BotListType } from '../components/BotList';

const HomePage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const pageIndexStr = searchParams.get("pageIndex");
    const pageSizeStr = searchParams.get("pageSize");
    const pageIndex = pageIndexStr != null ? Number.parseInt(pageIndexStr) : 0;
    const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 17;

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    const [Usedbots, setUsedBots] = React.useState<Bot[] | null>([]);

    const [Favoritebots, setFavoriteBots] = React.useState<Bot[] | null>([]);

    // 获取用户信息
    const [me, setMe] = useState<User | null>(null);
    useEffect(() => {
        const fetchMe = async () => {
            const response = await getMe();

            setMe(response);
            console.log("response", response);
            console.log("me", me);
        };
        fetchMe();
    }, []);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        const fetchBots = async () => {
            if (!me) return;
            let response;
            response = await getUerUsedBots(me.id, pageIndex, pageSize);
            setUsedBots(response.bots);
            response = await getUserFavoriteBots(me.id, pageIndex, pageSize);
            setFavoriteBots(response.bots);
        };
        fetchBots();
    }, [me]);

    const usedBotsType: BotListType = {
        type: 'Recently used'
    };

    const favoriteBotsType: BotListType = {
        type: 'Favorite'
    };

    console.log("me", me);
    return (
        <div>
            <div>
                <video className='home-bg' autoPlay loop muted>
                    <source src="/assets/homepage.mp4" type="video/mp4" />
                </video>
            </div>

            {me && <Grid container spacing={8} className='bot-box' >
                <Grid item xs={6}>
                    <FavoriteHeader></FavoriteHeader>
                    <BotList type={favoriteBotsType} bots={Favoritebots}></BotList>
                </Grid>
                <Grid item xs={6}>
                    <RecentUsedHeader></RecentUsedHeader>
                    <BotList type={usedBotsType} bots={Usedbots}></BotList>
                </Grid>
            </Grid>}
        </div>
    );
}
    ;
;
;
export default HomePage;
