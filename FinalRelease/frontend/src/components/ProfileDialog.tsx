import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useTranslation } from "react-i18next";
import '../css/BotChatPage.css';
import BasicInput from './BasicInput';
import EditLayout from './EditLayout';
import theme from "./theme";

const ProfileDialog =
    ({
        open,
        handleClose,
        handleUpdate,
        username,
        description,
        canvasUrl,
        handleUsernameChange,
        handleDescriptionChange,
        handleCanvasUrlChange
    }: {
        open: boolean;
        handleClose: () => void;
        handleUpdate: () => void;
        username: string;
        description: string;
        canvasUrl: string;
        handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        handleCanvasUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }) => {

        const { t } = useTranslation();

        return (
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
                            width: '100%'
                        }
                    }}
                >
                    <DialogTitle className="table-create-title">
                        {t('Profile')}
                    </DialogTitle>
                    <DialogContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <EditLayout title={t('Username')} leftSpace={3}>
                                <BasicInput
                                    placeholder={t("Maximum 25 characters input")}
                                    name='name'
                                    value={username}
                                    onChange={handleUsernameChange}
                                    maxLength={25}
                                    required
                                />
                            </EditLayout>
                            <EditLayout title={t('Description')} leftSpace={3}>
                                <BasicInput
                                    placeholder={t("Write your description here...")}
                                    name='description'
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    maxLength={255}
                                    required
                                />
                            </EditLayout>
                            <EditLayout title={t('Canvas Url')} leftSpace={3}>
                                <BasicInput
                                    placeholder={t("Log in to canvas, click \"Calendar\" - \"Calendar Subscription\", then copy the link to here")}
                                    name='canvasUrl'
                                    value={canvasUrl}
                                    onChange={handleCanvasUrlChange}
                                    required
                                />
                            </EditLayout>
                        </div>
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
                        <Button
                            className="drawer-button"
                            style={{
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                            }}
                            onClick={handleUpdate}
                        >{t('Update')}
                        </Button>
                    </DialogActions>
                </Dialog>
        );
    }

export default ProfileDialog;
