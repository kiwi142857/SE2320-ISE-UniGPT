import { Grid, Typography } from '@mui/material';
import React from 'react';
import '../css/BotEditPage.css';

interface LayoutProps {
    title: string;
    leftSpace?: number;
    children: React.ReactNode;
}

const EditLayout: React.FC<LayoutProps> = ({ title, leftSpace = 2, children }) => {
    return (
        <Grid container>
            <Grid item xs={leftSpace}>
                <Typography
                    className='edit-label'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    sx={{ color: 'primary.main' }}
                >
                    <p>{title}</p>
                </Typography>
            </Grid>
            <Grid item xs={12 - leftSpace}>
                {children}
            </Grid>
        </Grid>
    );
};

export default EditLayout;