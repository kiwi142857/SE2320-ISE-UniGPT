import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import BotEditBasicPart from '../components/BotEditBasicPart';
import BotEditMarketPart from "../components/BotEditMarketPart";
import BotEditPromptPart from '../components/BotEditPromptPart';
import SnackBar from "../components/Snackbar";
import '../css/App.css';
import '../css/BotEditPage.css';
import { LanguageContext } from "../provider/LanguageProvider";
import { botEditInfo, createBot, fewShot, getBotEditInfo, updateBot } from '../service/BotEdit';
import { apiToString, stringToApi } from "../utils/api";
import { getPromptKeysFromFewShot } from "../utils/strUtils";

// bot创建/修改页
const BotEditPage = ({ edit }: { edit: boolean }) => {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    let { id } = useParams<{ id: string }>();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const [botEditInfo, setBotEditInfo] = useState<botEditInfo>({
        name: '',
        avatar: '/assets/bot-default.png',
        description: '',
        temperature: 0.5,
        baseModelAPI: 0,
        published: false,
        detail: '',
        photos: [],
        prompted: false,
        promptChats: [],
        promptKeys: []
    });
    const [avatarImg, setAvatarImg] = useState<string>('/assets/bot-default.png');
    const [photoImgs, setPhotoImgs] = useState<string[]>([]);
    const [fewShots, setFewShots] = useState<fewShot[]>([]);
    const [promptCheck, setPromptCheck] = useState<boolean>(false);
    const [publishCheck, setPublishCheck] = useState<boolean>(false);
    const [promptKeys, setPromptKeys] = useState<string[]>([]);

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (edit) {
            initInfo();
        }
    }, [edit]);

    useEffect(() => {
        let newPromptKeys = getPromptKeysFromFewShot(fewShots);
        setPromptKeys(newPromptKeys);
    }, [fewShots]);

    

    const initInfo = async () => {
        if (!id) {
            return;
        }
        let info = await getBotEditInfo(id);
        if (info !== null) {
            info.baseModelAPI = Number(info.baseModelAPI);
            info.temperature = Number(info.temperature);
            console.log(info);
            setBotEditInfo(info);
            setAvatarImg(info.avatar);
            setPhotoImgs(info.photos);
            setPromptCheck(info.prompted);
            setPublishCheck(info.published);
            setFewShots(info.promptChats);
        } else {
            setAlert(true);
            setAlertMessage("获取bot信息失败");
        }
    }

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string };
            description: { value: string };
            api: { value: string };
            temperature: { value: number };
            detail: { value: string };
        };

        const name = target.name.value;
        const description = target.description.value;
        const temperature = target.temperature.value;
        const api = target.api.value;
        let detail;

        if (publishCheck) {
            detail = target.detail.value;
        } else {
            detail = null;
        }

        if (promptCheck && promptKeys.length === 0) {
            setAlert(true);
            setAlertMessage("请至少添加一个变量");
            return;
        }

        let newInfo: botEditInfo = {
            name: name,
            avatar: avatarImg,
            description: description,
            temperature: temperature,
            baseModelAPI: stringToApi(api),
            published: publishCheck,
            detail: detail,
            photos: photoImgs,
            prompted: promptCheck,
            promptChats: fewShots,
            promptKeys: promptKeys
        };

        console.log(newInfo);

        let res;

        if (edit) {
            if (id) {
                res = await updateBot(id, newInfo);
            }
        } else {
            res = await createBot(newInfo);
        }

        if (res) {
            if (res.ok) {
                let href = '/botChat/';

                if (edit) {
                    href += id;
                } else {
                    href += res.message;
                }

                setTimeout(() => {
                    window.location.href = href;
                }, 100);
            } else {
                setAlert(true);
                setAlertMessage("bot创建/修改表单提交失败: " + res.message);
            }
        }
    };

    return [
        <div className='main-container bot-edit-container'>
            <form onSubmit={onSubmit}>

                <SnackBar
                    open={alert}
                    setOpen={setAlert}
                    message={alertMessage}
                />

                <BotEditBasicPart
                    avatarImg={avatarImg}
                    setAvatarImg={setAvatarImg}
                    defaultName={botEditInfo.name}
                    defaultDescription={botEditInfo.description}
                    defaultApi={apiToString(botEditInfo.baseModelAPI)}
                    defaultTemperature={botEditInfo.temperature}
                />
                <Divider />

                <BotEditPromptPart
                    promptCheck={promptCheck}
                    setPromptCheck={setPromptCheck}
                    promptKeys={promptKeys}
                    fewShots={fewShots}
                    setFewShots={setFewShots}
                />

                <Divider style={{ marginTop: '20px' }} />

                <BotEditMarketPart
                    publishCheck={publishCheck}
                    setPublishCheck={setPublishCheck}
                    photoImgs={photoImgs}
                    setPhotoImgs={setPhotoImgs}
                    defaultDetail={botEditInfo.detail}
                />

                <Button
                    type="submit"
                    size='large'
                    variant="contained"
                    sx={{ backgroundColor: 'primary.main' }}
                >
                    {t('Submit')}
                </Button>
            </form>
        </div>
    ];
}

export default BotEditPage;