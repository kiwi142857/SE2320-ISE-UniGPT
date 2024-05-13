import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArticleIcon from "@mui/icons-material/Article";
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../css/BotChatPage.css";
import "../css/BotDetailPage.css";
import "../css/BotEditPage.css";
import { LanguageContext } from "../provider/LanguageProvider";
import BasicInput from './BasicInput';

// botDetail页的评论输入框
export function CommentInput ({onSend}:{onSend: (content: string)=>void}) {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const [message, setMessage] = useState('');

    return (
            <Grid container className='comment-input-container'>
                <Grid xs={11}>
                    <BasicInput
                        placeholder={t('Enter your comment here...')}
                        name='prompt'
                        onChange={(event)=> {
                            setMessage(event.target.value);
                        }}
                        value={message}
                    />
                </Grid>
                <Grid xs={1}>
                    <Fab
                        variant="extended"
                        size="large"
                        sx={{color:'secondary.main'}}
                        onClick={() => {
                                onSend(message);
                                setMessage('');
                            }}
                    >
                        <ArrowCircleUpIcon
                            fontSize='large'
                            style={{ color:'white' }}
                        />
                    </Fab>
                </Grid>
            </Grid>
    );
};

// botEdit页的项目输入框
export function EditInput ({title, placeholder, name}:{title:string; placeholder:string; name:string}) {
    return (
        <Grid container>
            <Grid item xs={2}>
                    <Typography
                        className='edit-label'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        sx={{color: 'primary.main'}}
                    >
                        <p>{title}</p>
                    </Typography>
            </Grid>
            <Grid item xs={10}>
                <BasicInput
                    placeholder={placeholder}
                    name={name}
                    required
                />
            </Grid>
        </Grid>
    );
}

// botEdit页的项目输入框
export function EditSelect ({title, name}:{title:string; name:string}) {
    const [value, setValue] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    return (
        <Grid container>
            <Grid item xs={2}>
                    <Typography
                        className='edit-label'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        sx={{color: 'primary.main'}}
                    >
                        <p>{title}</p>
                    </Typography>
            </Grid>
            <Grid item xs={2}>
                <FormControl fullWidth>
                    <Select
                        value={value}
                        name={name}
                        onChange={handleChange}
                        style={{borderRadius: '20px'}}
                        required
                    >
                        <MenuItem value={'GPT-4'}>GPT-4</MenuItem>
                        <MenuItem value={'chatGLM'}>chatGLM</MenuItem>
                        <MenuItem value={'llama'}>llama</MenuItem>
                        <MenuItem value={'kimiAI'}>kimiAI</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

// botEdit页的promptList中的单条prompt（可修改，删除）
export function OnePromptInput 
({
    item, 
    index,
    onItemNameChange, 
    onPromptChange,
    handleDelete
}: {
    item: {itemName: string, prompt: string}, 
    index: number, 
    onItemNameChange: (event: React.ChangeEvent<HTMLInputElement>)=>void, 
    onPromptChange: (event: React.ChangeEvent<HTMLInputElement>)=>void,
    handleDelete: (index: number)=>void
}){
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={1}/>
            <Grid item xs={1}>
                <div className='oneprompt-element'>
                    <IconButton
                        sx={{backgroundColor: 'secondary.main'}}
                        onClick={()=>handleDelete(index)}
                    >
                        <RemoveIcon />
                    </IconButton>
                </div>
            </Grid>
            <Grid item xs={2}>
                <div className='oneprompt-element'>
                    <BasicInput
                        placeholder={t('Item Name')}
                        name='oneItemName'
                        value={item.itemName}
                        onChange={onItemNameChange}
                        required
                    />
                </div>
            </Grid>
            <Grid item xs={7}>
                <div className='oneprompt-element'>
                    <BasicInput
                        placeholder={t('Prompt for this item' )}
                        name='onePrompt'
                        value={item.prompt}
                        onChange={onPromptChange}
                        required
                    />
                </div>
            </Grid>
        </Grid>
    );
}


// BotChat页的终端输入框
export function PromptInput
({
     onAltTable,
     onSend
}: {
    onAltTable: ()=>void,
    onSend: (content: string)=>void}
){
    const [message, setMessage] = useState('');
    const {t} = useTranslation();
    return (
        <Box className="prompt-input-container">
            <Fab
                onClick={onAltTable}
                variant="extended"
                size="large"
                style={{color: 'white'}}
            >
                <ArticleIcon fontSize='large'/>
            </Fab>
            <div style={{width: '604px', margin: '20px'}}>
                <BasicInput
                    placeholder={t('Enter your message here...')}
                    name="message"
                    onChange={(event)=> {
                        setMessage(event.target.value);
                    }}
                    value={message}
                />
            </div>
            <Fab
                disabled={message === ''}
                onClick={() => {
                    onSend(message);
                    setMessage('');
                }}
                variant="extended"
                size="large"
                style={{color: 'white'}}>
                <ArrowCircleUpIcon fontSize='large'/>
            </Fab>
        </Box>
    );
}

export function TableCreateInput({
         title,
         placeholder,
         name
    }:{
        title: string,
        placeholder: string,
        name:string}) {
    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Typography
                className='table-create-edit-label'
                style={{
                    display: 'flex',
                    alignItems: 'center'
                }}
                sx={{color: 'primary.main'}}
            >
                {title}
            </Typography>
            <div style={{width: '604px', margin: '20px'}}>
                <BasicInput placeholder={placeholder} name={name}/>
            </div>
        </Box>);
}
