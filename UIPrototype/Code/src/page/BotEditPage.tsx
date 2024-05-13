import AddIcon from '@mui/icons-material/Add';
import { Button, Divider, Grid } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditInput, EditSelect, OnePromptInput } from '../components/Inputs';
import '../css/App.css';
import '../css/BotEditPage.css';
import { LanguageContext } from "../provider/LanguageProvider";

// bot创建/修改页

interface image {
    name: string;
    src: string;
};

interface item {
    itemName: string;
    prompt: string;
}

const BotEditPage: React.FC = () => {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const [avatarImg, setAvatarImg] = useState<string>('/assets/bot-default.png');
    const [photoImgs, setPhotoImgs] = useState<image[]>([]);
    const [items, setItems] = useState<item[]>([]);
    const [promptCheck, setPromptCheck] = useState<boolean>(false);
    const [publishCheck, setPublishCheck] = useState<boolean>(false);

    const onAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImg(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onPhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoImgs(prevImages => [...prevImages, { name: file.name, src: reader.result as string }]);
            };

            reader.readAsDataURL(file);
        }
    };

    const onPromptCheck = (event: ChangeEvent<HTMLInputElement>) => {
        setPromptCheck(event.target.checked);
        if (!event.target.checked) {
            setItems([]);
        } else {
            setItems([{ itemName: '', prompt: '' }]);
        }
    }

    const onItemNameChange = (index: number, newValue: string) => {
        setItems(items.map((item, i) => i === index ? { ...item, itemName: newValue } : item));
    };

    const onPromptChange = (index: number, newValue: string) => {
        setItems(items.map((item, i) => i === index ? { ...item, prompt: newValue } : item));
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const onPhotoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string };
            description: { value: string };
            api: { value: string };
        };

        const name = target.name.value;
        const description = target.description.value;
        const api = target.api.value;

        if (promptCheck && items.length === 0) {
            alert('Please add at least one item when prompt check is enabled.');
            return;
        }

        console.log(`name:${name}, description:${description}`, `api:${api}`);

        items.forEach((item, index) => {
            console.log(`item${index}: ${item.itemName}, prompt${index}: ${item.prompt}`);
        });

        setTimeout(() => {
            window.location.href = '/botchat';
        }, 1000);
    };

    return [
        <div className='main-container bot-edit-container'>
            <form onSubmit={onSubmit}>

                {/* 第一层，基本信息 */}
                <div className='edit-basic-container'>
                    <div style={{ position: 'relative' }}>
                        <Avatar
                            alt="bot-default"
                            src={avatarImg}
                            sx={{ width: 200, height: 200, borderRadius: '20px' }}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onAvatarUpload}
                            style={{ display: 'none' }}
                            id="imageUpload"
                        />
                        {/* 这里的htmlFor和input的id必须是一样的，否则无法选择文件！ */}
                        <label htmlFor="imageUpload">
                            <Typography className='avatar-overlay' style={{ height: 200 }}>
                                {t("Change photo for your assistant")}
                            </Typography>
                        </label>
                    </div>
                    <div className='edit-basic-right'>
                        <EditInput
                            title={t('Assistant Name')}
                            placeholder={t("Your assistant name")}
                            name='name'
                        />
                        <EditInput
                            title={t('Description')}
                            placeholder={t('Your description for your assistant')}
                            name='description'
                        />
                        <EditSelect
                            title={t('Base Model')}
                            name='api'
                        />
                    </div>
                </div>

                <Divider />

                {/* 第二层，自定义prompt */}
                <div className='edit-prompts-container'>
                    <div className='edit-title-container'>
                        <Checkbox
                            checked={promptCheck}
                            onChange={onPromptCheck}
                        />
                        <Typography
                            className='edit-label'
                            style={{ display: 'flex', alignItems: 'center' }}
                            sx={{ color: 'primary.main' }}
                        >
                            {t('Define your own prompt list')}
                        </Typography>
                    </div>
                    {promptCheck && (
                        <div className='prompts-list-container'>
                            {items.map((item, index) => (
                                <OnePromptInput
                                    key={index}
                                    index={index}
                                    item={item}
                                    onItemNameChange={(event) => onItemNameChange(index, event.target.value)}
                                    onPromptChange={(event) => onPromptChange(index, event.target.value)}
                                    handleDelete={() => setItems(items.filter((_, i) => i !== index))}
                                />
                            ))}
                            <Grid container spacing={2}>
                                <Grid item xs={1} />
                                <Grid item xs={1}>
                                    <IconButton
                                        sx={{ backgroundColor: 'secondary.main' }}
                                        onClick={() => setItems([...items, { itemName: '', prompt: '' }])}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </div>

                <Divider style={{ marginTop: '20px' }} />

                {/* 第三层，发布market的信息 */}
                <div className='edit-publish-container'>
                    <div className='edit-title-container'>
                        <Checkbox
                            checked={publishCheck}
                            onChange={(event) => setPublishCheck(event.target.checked)}
                        />
                        <Typography
                            className='edit-label'
                            style={{ display: 'flex', alignItems: 'center' }}
                            sx={{ color: 'primary.main' }}
                        >
                            {t('Publish to market')}
                        </Typography>
                    </div>

                    {publishCheck && (
                        <div>
                            <EditInput
                                title={t('Detailed Description')}
                                placeholder={t('Your detail description for your assistant')}
                                name='detail'
                            />
                            <div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={onPhotoUpload}
                                />
                                <Grid container>
                                    <Grid item xs={2}>
                                        <Typography
                                            className='edit-label'
                                            style={{ display: 'flex', alignItems: 'center' }}
                                            sx={{ color: 'primary.main' }}
                                        >
                                            {t('Photos')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {photoImgs.map((image, index) => (
                                            <div key={index} className='edit-photo-container'>
                                                <img src={image.src} alt={image.name} style={{ width: '30px' }} />
                                                <Typography sx={{ color: 'primary.light' }}>
                                                    {image.name}
                                                </Typography>
                                            </div>
                                        ))}
                                        <br />
                                        <Button
                                            variant="contained"
                                            onClick={onPhotoClick}
                                            sx={{ backgroundColor: 'primary.light' }}
                                        >
                                            {t('add image')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    )}
                </div>

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