import React from 'react';
import '../css/Profile.css';
import UserCard from '../components/UserCard';
import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BotCard from '../components/BotCard';
import GetBotInfo from '../service/BotInfo';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { LanguageContext } from "../provider/LanguageProvider";
// 个人主页

export function BotListTabs() {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab label={t("Created")} className='botlist-tab' />
                <Tab label={t("Favorite")} className='botlist-tab' />
            </Tabs>
        </div>
    );
}

function ProfileBotList() {
    const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={1}>
                <Grid container item spacing={6}>
                    {ids.map(id => (
                        <Grid item xs={3} key={id}>
                            <BotCard BotInfo={GetBotInfo(id)} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

const ProfilePage: React.FC = () => {

    return (
        <>
            <div className='profile-container'>
                <UserCard></UserCard>
            </div>
            <div className='botlist-tabs'>
                <BotListTabs></BotListTabs>
            </div>
            <div className='botlist-container'>
                <ProfileBotList></ProfileBotList>
            </div>
        </>
    );
};

export default ProfilePage;