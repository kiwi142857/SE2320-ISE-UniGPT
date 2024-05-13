import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TableCreateInput} from "./Inputs";
import '../css/BotChatPage.css'
import theme from "./theme";
import {useTranslation} from "react-i18next";

const TableCreateDialog =
    ({
         open,
         handleClose,
         handleSubmit
    } : {
        open: boolean;
        handleClose: ()=> void;
        handleSubmit: ()=> void;
    }) => {

    const { t } = useTranslation();
    return (
        <Dialog
            open={open}
            onClose={()=> {handleClose();}}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>)=> {
                    event.preventDefault();
                    handleSubmit();
                    handleClose();
                },
                style: {
                    borderRadius: 32,
                    padding: 50,
                    display: 'flex',
                    flexDirection: 'column',
                }
            }}
        >
            <DialogTitle className="table-create-title">
                {'Assistant Name'}
            </DialogTitle>
            <DialogContent>
                <TableCreateInput title={"item1"} placeholder={"item1"} name={"item1"} />
                <TableCreateInput title={"item2"} placeholder={"item2"} name={"item2"} />
                <TableCreateInput title={"item3"} placeholder={"item3"} name={"item3"} />
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
                    type="submit"
                >{t('Submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TableCreateDialog;
