import Snackbar from '@mui/material/Snackbar';
import React from 'react';

function SnackBar({ open, setOpen, message} 
    : { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, message: string}) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            style={{ marginTop: '70px'}}
            onClose={() => setOpen(false)}
            message={message}
            ContentProps={
                { style: {background: '#ffffff', color: '#ff0000', fontWeight: 'bold'}}
            }
        />
    );
}

export default SnackBar;