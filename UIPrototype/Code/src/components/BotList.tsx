import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BotCard from './BotCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from '@mui/material/Link';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import GetBotInfo from '../service/BotInfo';
import { Favorite } from '@mui/icons-material';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { LanguageContext } from "../provider/LanguageProvider";


export type botListType = { Favorite: string, Recent: string; };

function HomeMarketCard() {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);
    return (
        <Link href='/market' style={{ textDecoration: 'none', width: '30%', height: '30%', borderRadius: '20px' }}>
            <Card elevation={0}>
                <ShoppingCartOutlinedIcon style={{ width: '30%', height: '30%', marginTop:'20%', color:'#666666' }} />
                <CardContent>
                    <Typography className='card-discription' color="text.secondary">
                        {t("More from market")}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export function HomeCreateCard() {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    return (
        <Link href='/botedit' style={{ textDecoration: 'none' }} >
            <Card elevation={0}>
                <AddCircleOutlineIcon style={{ width: '30%', height: '30%', marginTop:'20%', color:'#666666' }} />
                <CardContent>
                    <Typography className='card-discription' color="text.secondary">
                       {t(" Create your new bot")}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export function RecentUsedHeader() {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    return (
        <div style={{marginLeft:'20px', marginTop:'10px'}}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <IconButton>
                        <AccessTimeFilledIcon fontSize='large'/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography className='list-header'>{t('Recently Used')}</Typography>
                </Grid>
            </Grid>
            <Divider  className='Divider'/>
        </div>
    );
}

export function FavoriteHeader() {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);
    return (
        <div style={{marginLeft:'60px', marginTop:'10px'}}>
            <Grid container alignItems="center" spacing={3}>
                <Grid item>
                    <IconButton>
                        <Favorite fontSize='large'/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography className='list-header'>{t('Favorite')}</Typography>
                </Grid>
            </Grid>
            <Divider  className='Divider'/>
        </div>
    );
}

export interface BotListProps {
    type: 'Favorite' | 'Recently used';
}

export default function BotList({ type }: BotListProps) {
    const ids = ['1', '2', '3', '4', '5', '6'];
    return (
        <Box sx={{ flexGrow: 1 }} style={{ marginLeft: type === 'Favorite' ? '60px' : '0', marginRight: type === 'Favorite' ? '0' : '80px' }}>
            <Grid container spacing={1}>
                <Grid container item spacing={2}>
                    <Grid item xs={4}>
                    {type === 'Favorite' ? <HomeMarketCard /> : <HomeCreateCard></HomeCreateCard>}
                    </Grid>
                    {ids.map(id => (
                        <Grid item xs={4} key={id}>
                            <BotCard BotInfo={GetBotInfo(id)} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}