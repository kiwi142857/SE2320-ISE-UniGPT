import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import '../css/BotChatPage.css';
import { Prompt, getEmptyPromptList, getPromptList } from '../service/BotChat';
import { TableCreateInput } from "./Inputs";
import theme from "./theme";

const TableCreateDialog =
    ({
        botID,
        historyId,
        open,
        handleClose,
        handleSubmit
    }: {
        botID: string | undefined;
        historyId: number;
        open: boolean;
        handleClose: () => void;
        handleSubmit: (promptList: Prompt[]) => void;
    }) => {

        const { t } = useTranslation();
        const [promptList, setPromptList] = useState<Prompt[]>([]);
        const [inputValues, setInputValues] = useState<string[]>([]);

        useEffect(() => {
            const getPrompt = async () => {
                console.log("In getPrompt:");
                console.log("historyId: ", historyId);
                console.log("botID: ", botID);
                console.log("cond: ", historyId == 0);

                const list = historyId == 0 ? await getEmptyPromptList(botID) : await getPromptList(historyId);
                setPromptList(list);

                console.log("PromptList: ", list);
            };
            getPrompt();
        }, [historyId, botID]);

        const handleInputChange = (index: number, value: string) => {
            setInputValues(prevValues => {
                const newInputValues = [...prevValues];
                newInputValues[index] = value;
                return newInputValues;
            });
            console.log("InputValues Changed: ", inputValues);
        };

        const onSubmit = async () => {
            console.log("In Dialog onSubmit");
            console.log("InputValues: ", inputValues);
            let newPromptList = promptList;
            // change the promptList
            for (let i = 0; i < promptList.length; i++) {
                if (inputValues[i] === "")
                    return;
                newPromptList[i].promptValue = inputValues[i];
            }
            handleSubmit(newPromptList);
            handleClose();
        }

        return (
            promptList.length === 0 ? <></> :
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        style: {
                            borderRadius: 32,
                            padding: 50,
                            display: 'flex',
                            flexDirection: 'column',
                        }
                    }}
                >
                    <DialogTitle className="table-create-title">
                        {t('Prompt Table')}
                    </DialogTitle>
                    <DialogContent>
                        {promptList.map((prompt, index) => (
                            <TableCreateInput
                                key={index}
                                title={prompt.promptKey}
                                placeholder={prompt.promptValue}
                                name={`item${index + 1}`}
                                lock={historyId !== 0}
                                onInputChange={(value: string) => handleInputChange(index, value)}
                                dealWithEnter={() => {
                                    if (index === promptList.length - 1) {
                                        onSubmit();
                                    } else {
                                        const nextInput = document.getElementById(`item${index + 2}`);
                                        if (nextInput) {
                                            nextInput.focus();
                                        }
                                    }
                                }}
                            />
                        ))}
                    </DialogContent>
                    <DialogActions
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            className="drawer-button"
                            style={{
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                            }}
                            onClick={handleClose}
                        >{t('Cancel')}
                        </Button>
                        {
                            historyId === 0 ? <Button
                                className="drawer-button"
                                style={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: 'white',
                                }}
                                onClick={onSubmit}
                            >{t('Submit')}
                            </Button> : <></>
                        }
                    </DialogActions>
                </Dialog>
        );
    }

export default TableCreateDialog;
