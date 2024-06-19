import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../css/BotDetailPage.css';
import { LanguageContext } from "../provider/LanguageProvider";
import { disLikeBot, likeBot, starBot, unStarBot } from '../service/BotDetail';

// bot详情页的最上方的简介
const BotDetailCard = (
    {
        id,
        name,
        author,
        authorId,
        avatar,
        description,
        likeNumber,
        starNumber,
        isLiked,
        isStarred,
        isCreator,
        isAdmin
    }
        : {
            id: string;
            name: string;
            author: string;
            authorId: string;
            avatar: string;
            description: string;
            likeNumber: string;
            starNumber: string;
            isLiked: boolean;
            isStarred: boolean;
            isCreator: boolean;
            isAdmin: boolean;
        }) => {
    const [liked, setLiked] = React.useState(isLiked);
    const [starred, setStarred] = React.useState(isStarred);
    const [localLikeNumber, setLocalLikeNumber] = React.useState(likeNumber);
    const [localStarNumber, setLocalStarNumber] = React.useState(starNumber);

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    const like = () => {
        likeBot(id);
        setLocalLikeNumber((parseInt(localLikeNumber) + 1).toString());
        setLiked(true);
    }

    const disLike = () => {
        disLikeBot(id);
        setLocalLikeNumber((parseInt(localLikeNumber) - 1).toString());
        setLiked(false);
    }

    const star = () => {
        starBot(id);
        setLocalStarNumber((parseInt(localStarNumber) + 1).toString());
        setStarred(true);
    }

    const unStar = () => {
        unStarBot(id);
        setLocalStarNumber((parseInt(localStarNumber) - 1).toString());
        setStarred(false);
    }

    const use = () => {
        // TODO
    }

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        setLocalLikeNumber(likeNumber);
        setLocalStarNumber(starNumber);
        setLiked(isLiked);
        setStarred(isStarred);
    }, [likeNumber, starNumber, isLiked, isStarred]);

    return (
        <div className='detail-card-container'>
            <img
                src={avatar}
                alt='bot'
                className='detail-card-avatar'
            ></img>
            <div className='detail-card-right'>
                <Typography sx={{ color: 'primary.main' }}>
                    <p className='detail-card-name'>
                        {t(name)}
                    </p>
                </Typography>
                {/* <Typography sx={{ color: 'primary.light' }}> */}
                <Link className="detail-card-author" to={`/profile/${authorId}`}>
                    {`@${author}`}
                </Link>
                {/* </Typography> */}
                <Typography sx={{ color: 'primary.light' }}>
                    <p className='detail-card-description'>
                        {t(description)}
                    </p>
                </Typography>
                <div className='detail-card-btn-group'>
                    {liked ? (
                        <FavoriteIcon
                            sx={{ color: 'primary.main' }}
                            fontSize='large'
                            onClick={() => disLike()}
                        />
                    ) : (
                        <FavoriteBorderIcon
                            sx={{ color: 'primary.main' }}
                            fontSize='large'
                            onClick={() => like()}
                        />
                    )}
                    <span className='detail-card-like'>
                        {localLikeNumber}
                    </span>
                    {starred ? (
                        <StarIcon
                            sx={{ color: 'primary.main' }}
                            fontSize='large'
                            onClick={() => unStar()}
                        />
                    ) : (
                        <StarBorderIcon
                            sx={{ color: 'primary.main' }}
                            fontSize='large'
                            onClick={() => star()}
                        />
                    )}
                    <span className='detail-card-collect'>
                        {localStarNumber}
                    </span>
                    <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        href={`/botchat/${id}`}
                        size='large'
                        onClick={() => use()}
                    >
                        {t('Use')}
                    </Button>
                    {
                        (isCreator || isAdmin) &&
                        <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            href={`/botedit/${id}`}
                            size='large'
                        >
                            {t('Edit')}
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}

export default BotDetailCard;
