import { Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from "react-router-dom";
import { BotList, BotListType } from '../components/BotList';
import SnackBar from '../components/Snackbar';
import UserCard from '../components/UserCard';
import '../css/Profile.css';
import { LanguageContext } from "../provider/LanguageProvider";
import { User, getMe, getUser, getUserCreatedBots, getUserFavoriteBots } from '../service/user';


export function BotListTabs({ value, setValue }: { value: number, setValue: React.Dispatch<React.SetStateAction<number>>; }) {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

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

const ProfilePage = () => {

    const [searchParams] = useSearchParams();
    const pageIndexStr = searchParams.get("pageIndex");
    const pageSizeStr = searchParams.get("pageSize");
    const pageIndex = pageIndexStr != null ? Number.parseInt(pageIndexStr) : 0;
    const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 10;

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    const [tabValue, setTabValue] = React.useState(0);
    const [bots, setBots] = useState([]);

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // 语言切换
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    let { id } = useParams<{ id: string; }>();
    // 获取用户信息
    const [user, setUser] = useState<User | null>(null);

    // if id == null, get me
    useEffect(() => {
        const fetchUser = async () => {
            let response = null;

            if (id == null) {
                response = await getMe();
            } else {
                response = await getUser(id);
            }

            if (response != null) {
                setUser(response);
            } else {
                setUser(null);
                setAlert(true);
                setAlertMessage("获取用户信息失败！");
            }
            console.log("me", user);
        };
        fetchUser();
    }, [id]);

    const [isMe, setIsMe] = useState(false);

    useEffect(() => {
        const fetchMe = async () => {
            const response = await getMe();
            if (response != null) {
                setIsMe(user?.id === response.id);
            }
        };
        fetchMe();
    }, [user]);

    // 获取机器人列表
    useEffect(() => {
        const fetchBots = async () => {
            if (user == null) return;
            let response;
            if (tabValue === 0) {
                console.log("Created");
                response = await getUserCreatedBots(user.id, pageIndex, pageSize);
            }
            else {
                console.log("Favorite");
                response = await getUserFavoriteBots(user.id, pageIndex, pageSize);
            }

            if (response != null) {
                setBots(response.bots);
            } else {
                setBots([]);
            }
            console.log("bots", bots);
        };
        fetchBots();
    }, [tabValue, user, pageIndex, pageSize]);

    const botListType: BotListType = {
        type: 'Profile'
    };

    return (
        <>
            <SnackBar
                open={alert}
                message={alertMessage}
                setOpen={setAlert}
            />
            {
                user == null ? <></> :
                    <>
                        <div className='profile-container'>
                            <UserCard user={user} isMe={isMe}></UserCard>
                        </div>
                        <div className='botlist-tabs'>
                            <BotListTabs value={tabValue} setValue={setTabValue}></BotListTabs>
                        </div>
                        <div className='botlist-container'>
                            <BotList type={botListType} bots={bots}></BotList>
                        </div>
                    </>
            }
        </>
    );
};
export default ProfilePage;