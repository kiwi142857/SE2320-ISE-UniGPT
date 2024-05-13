import { AppBar, Avatar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import '../css/Navigator.css';
import LanguageButton from './LanguageButton';

// 顶部导航栏
const Navigator: React.FC<{}> = () => {
    return (
        <AppBar
            position="fixed"
            className="navigator"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Toolbar>
                <LanguageButton></LanguageButton>
                {/* logo与标题 */}
                <Box
                    className='navigator-title-box'
                    sx={{ flexGrow: 1 }}
                    flexDirection="column"
                    alignItems="center"
                    display="flex"
                    width="100%"
                >
                    <Link
                        href="/"
                        underline="none"
                        sx={{ color: 'primary.dark' }}
                    >
                        <IconButton>
                            <img
                                src="/assets/logo.png"
                                alt='logo'
                                style={{ width: '60px' }}
                            />
                        </IconButton>
                        <span className='navigator-title'>
                            UniGPT
                        </span>
                    </Link>
                </Box>

                {/* 用户头像 */}
                <Link href="/profile">
                    <IconButton className='navigator-user' size='medium'>
                        <Avatar
                            alt="/assets/user-default.png"
                            src="/assets/user-default.png"
                            sx={{ width: 50, height: 50 }}
                        />
                    </IconButton>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navigator;
