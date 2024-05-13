import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/BotDetailPage.css';
import { LanguageContext } from "../provider/LanguageProvider";

// bot详情页的最上方的简介
const BotDetailCard = ({id, name, author, avatar, description, like, collect}
    : {id:string ; name:string; author:string; avatar:string; description:string; like:string; collect:string;}) => {
    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);
    
    const [isLiked, setIsLiked] = React.useState(false);
    const [isCollected, setIsCollected] = React.useState(false);

    return (
        <div className='detail-card-container'>
            <img
                src={avatar}
                alt='bot'
                className='detail-card-avatar'
            ></img>
            <div className='detail-card-right'>
                <Typography sx={{color: 'primary.main'}}>
                    <p className='detail-card-name'>
                        {t(name)}
                    </p>
                </Typography>
                <Typography sx={{color: 'primary.light'}}>
                    <p className='detail-card-author'>
                        {`@${author}`}
                    </p>
                </Typography>
                <Typography sx={{color: 'primary.light'}}>
                    <p className='detail-card-description'>
                        {t(description)}
                    </p>
                </Typography>
                <div className='detail-card-btn-group'>
                    {isLiked ? (
                            <FavoriteIcon
                                sx={{color: 'primary.main'}}
                                fontSize='large'
                                onClick={() => setIsLiked(false)}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                sx={{color: 'primary.main'}}
                                fontSize='large'
                                onClick={() => setIsLiked(true)}
                            />
                    )}
                    <span className='detail-card-like'>
                        {isLiked ? parseInt(like) + 1 : like}
                    </span>
                    {isCollected ? (
                            <StarIcon
                                sx={{color: 'primary.main'}}
                                fontSize='large'
                                onClick={() => setIsCollected(false)}
                            />
                        ) : (
                            <StarBorderIcon
                                sx={{color: 'primary.main'}}
                                fontSize='large'
                                onClick={() => setIsCollected(true)}
                            />
                    )}
                    <span className='detail-card-collect'>
                        {isCollected ? parseInt(collect) + 1 : collect}
                    </span>
                    <Button 
                        variant="contained" 
                        endIcon={<SendIcon />} 
                        href={'/botchat'}
                        size='large'
                    >
                        {t('Use')}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BotDetailCard;
