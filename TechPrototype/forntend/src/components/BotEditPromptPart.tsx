import AddIcon from '@mui/icons-material/Add';
import { Checkbox, Grid, IconButton, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/BotEditPage.css';
import { LanguageContext } from '../provider/LanguageProvider';
import { PromptChatType, fewShot } from '../service/BotEdit';
import BasicInput from './BasicInput';
import EditLayout from './EditLayout';
import { MarkdownInput, OneFewShotInput } from './Inputs';

function BotEditPromptPart(
    {
        promptCheck, 
        setPromptCheck, 
        promptKeys,
        fewShots,
        setFewShots
    } :
    {
        promptCheck: boolean, 
        setPromptCheck: React.Dispatch<React.SetStateAction<boolean>>, 
        promptKeys: string[],
        fewShots: fewShot[],
        setFewShots: React.Dispatch<React.SetStateAction<fewShot[]>>
    }
) {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const onPromptCheck = (event: ChangeEvent<HTMLInputElement>) => {
        setPromptCheck(event.target.checked);
        if (!event.target.checked) {
            setFewShots([]);
        } else {
            setFewShots([{type: PromptChatType.SYSTEM, content: ''}, 
                {type: PromptChatType.USER, content: ''}, 
                {type: PromptChatType.ASSISTANT, content: ''},
                {type: PromptChatType.USER, content: ''},
            ]);
        }
    }

    const onFewShotChange = (index: number, newValue: string) => {
        setFewShots(fewShots.map((fewShot, i) => i === index ? {...fewShot, content: newValue} : fewShot));
    }

    const handleFewShotAdd = () => {
        const newFewShots = [
            ...fewShots.slice(0, fewShots.length - 1),
            {type: PromptChatType.USER, content: ''},
            {type: PromptChatType.ASSISTANT, content: ''},
            fewShots[fewShots.length - 1]
        ];
        setFewShots(newFewShots);
    }

    return (
        <div className='edit-prompts-container'>
            <div className='edit-title-container'>
                <Checkbox
                    checked={promptCheck}
                    onChange={onPromptCheck}
                />
                <Typography 
                    className='edit-label' 
                    style={{ display: 'flex', alignItems: 'center' }}
                    sx={{color: 'primary.main'}}
                >
                    {t('Define your own prompt list')}
                </Typography>
            </div>
            {promptCheck && (
                <div className='prompts-list-container'>
                    <EditLayout title={t('System Prompt')}>
                        <MarkdownInput
                            placeholder={t("System prompt for your assistant")}
                            name='system-prompt'
                            value={fewShots[0]?.content}
                            onChange={(event) => onFewShotChange(0, event.target.value)}
                        />
                    </EditLayout>

                    <EditLayout title={t('Few-shot')}>
                        <div className='prompts-list-container'>
                            {fewShots.map((fewShot, index) => {
                                if (fewShot.type === PromptChatType.USER && index !== fewShots.length - 1) {
                                    return <OneFewShotInput
                                        key={index}
                                        index={index}
                                        select={t('USER')}
                                        content={fewShot?.content}
                                        onFewShotChange={(event) => onFewShotChange(index, event.target.value)}
                                        handleDelete={() => setFewShots(fewShots.filter((_, i) => i !== index && i !== (index + 1)))}
                                    />
                                } else if (fewShot.type === PromptChatType.ASSISTANT && index !== fewShots.length - 1) {
                                    return <OneFewShotInput
                                        key={index}
                                        index={index}
                                        select={t('BOT')}
                                        content={fewShot?.content}
                                        onFewShotChange={(event) => onFewShotChange(index, event.target.value)}
                                        handleDelete={() => setFewShots(fewShots.filter((_, i) => i !== index && i !== (index - 1)))}
                                    />
                                }
                            })}
                            <Grid container spacing={2}>
                                <Grid item xs={1}>
                                    <IconButton
                                        sx={{backgroundColor: 'secondary.main'}}
                                        onClick={() => handleFewShotAdd()}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                    </EditLayout>

                    <EditLayout title={t('User Ask')}>
                        <MarkdownInput
                            placeholder={t("What User will Ask for your assistant")}
                            name='user-ask'
                            value={fewShots[fewShots.length - 1]?.content}
                            onChange={(event) => onFewShotChange(fewShots.length - 1, event.target.value)}
                        />
                    </EditLayout>

                    <EditLayout title={t('Prompt Key')}>
                        {
                            <Grid container spacing={2}>
                                {promptKeys.map((key, index) => (
                                    <Grid item xs={2}>
                                        <BasicInput
                                            key={index}
                                            placeholder=""
                                            name='prompt-key'
                                            value={key}
                                            required
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        }
                    </EditLayout>
                </div>
            )}
        </div>
    );
}

export default BotEditPromptPart;