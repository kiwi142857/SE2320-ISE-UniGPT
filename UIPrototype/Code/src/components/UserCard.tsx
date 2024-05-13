import * as React from 'react';
import { useState, useRef } from 'react';
import { Avatar, Grid, Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { LanguageContext } from "../provider/LanguageProvider";
import '../css/Profile.css';

export default function UserCard() {
    const [description, setDescription] = useState('');
    const [usename, setUsename] = useState('user');
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);

    const handleUsernameFocus = () => {
        setIsUsernameFocused(true);
    };

    const handleUsernameBlur = () => {
        setIsUsernameFocused(false);
    };

    const handleDescriptionFocus = () => {
        setIsDescriptionFocused(true);
    };

    const handleDescriptionBlur = () => {
        setIsDescriptionFocused(false);
    };
    const [avatarSrc, setAvatarSrc] = useState('/assets/user-default.png');

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAvatarSrc(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleUsenameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsename(event.target.value);
    };
    const [isDiscriptionInputActive, setDiscriptionIsInputActive] = useState(false);
    const [isInputActive, setIsInputActive] = useState(false);
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    return (

        <Grid container spacing={5} >
            <Grid item >
                <div style={{ position: 'relative' }}>
                    <Avatar alt="user-default" src={avatarSrc} sx={{ width: 100, height: 100 }} />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                        id="avatar-input"
                    />
                    <label htmlFor="avatar-input" className="avatar-overlay-profile">{t("change your avatar")}</label>
                </div>
            </Grid>
            <Grid item >
                <Grid container spacing={2} className='user-box'>
                    <TextField
                        className='user-name'
                        label={t("Username")}
                        required
                        variant="standard"
                        value={usename}
                        onChange={handleUsenameChange}
                        onFocus={handleUsernameFocus}
                        onBlur={handleUsernameBlur}
                        onMouseEnter={() => setIsUsernameFocused(true)}
                        onMouseLeave={() => { if (!isInputActive) setIsUsernameFocused(false); }}
                        placeholder={t("Maximum 25 characters input")}
                        style={{ height: '50px', width: '120%' }}
                        inputProps={{ maxLength: 25 }}
                        InputProps={{
                            style: {
                                border: 'none',
                            },
                            disableUnderline: isUsernameFocused? false : true
                        }}
                    />
                </Grid>
                <Grid item >
                    <Typography className='email'>@jaccount</Typography>
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                    <TextField
                        className='description'
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder={t("Write your description here...")}
                        multiline
                        variant='standard'
                        onFocus={() => { handleDescriptionFocus(); setDiscriptionIsInputActive(true); }}
                        onBlur={() => { handleDescriptionBlur(); setDiscriptionIsInputActive(false); }}
                        onMouseEnter={() => setIsDescriptionFocused(true)}
                        onMouseLeave={() => { if (!isDiscriptionInputActive) setIsDescriptionFocused(false); }}
                        style={{ height: '100px', width: '200%' }}
                        InputProps={{
                            style: {
                                border: 'none',
                            },
                            disableUnderline: isDescriptionFocused ? false : true
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item >
            </Grid>
        </Grid>
    );
};
