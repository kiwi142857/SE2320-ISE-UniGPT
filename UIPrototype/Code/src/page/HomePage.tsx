import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BotList, { FavoriteHeader, RecentUsedHeader } from "../components/BotList";
import '../css/Home.css';
import { LanguageContext } from "../provider/LanguageProvider";

const HomePage: React.FC = () => {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    return (
        <div>
            <div>
                <img src="/assets/home-background.png" alt="home-bg" className='home-bg' />
            </div>

            <Grid container spacing={8} className='bot-box' >
                <Grid item xs={6}>
                    <FavoriteHeader></FavoriteHeader>
                    <BotList type='Favorite'></BotList>
                </Grid>
                <Grid item xs={6}>
                    <RecentUsedHeader></RecentUsedHeader>
                    <BotList type="Recently used"></BotList>
                </Grid>
            </Grid>
        </div>
    );
}
    ;
;
;
export default HomePage;
