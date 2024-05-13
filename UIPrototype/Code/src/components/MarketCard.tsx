import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import {HomeCreateCard} from "./BotList";
import BotCard from './BotCard';
import GetBotInfo from '../service/BotInfo';
import React from 'react';
import '../css/Market.css';

export default function MarketCard() {
    const ids = ['1', '2', '3', '4', '5', '6'];
    return (
        <div className='market-card'>
            <Grid container style={{ display: 'flex', alignItems: 'stretch' }}>
                <Grid container item spacing={5} style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Grid item xs={3}>
                        <Card className='create-bot-card'>
                            <div style={{ height: '100%' }}>
                                <HomeCreateCard></HomeCreateCard>
                            </div>
                        </Card>
                    </Grid>
                    {ids.map(id => (
                        <Grid item xs={3} key={id}>
                            <BotCard BotInfo={GetBotInfo(id)} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}
