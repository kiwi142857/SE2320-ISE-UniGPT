import * as React from 'react';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../css/Home.css';
import { Bot } from '../service/bot';


export default function BotCard({ Bot }: { Bot: Bot }) {

  return (
    <Link href={'/botdetail/' + Bot.id} style={{ textDecoration: 'none' }} >
      <Card className='bot-card' style={{ height: '100%' }}>
        <CardMedia style={{ width: '70px', height: '70px', marginLeft: '5%', borderRadius: '20px', marginBottom: '0px', marginTop: '25px' }}
          component="img"
          image={Bot.avatar}
          alt="bot-default"
        />
        <CardContent >
          <Typography className='bot-card-name'>
            {Bot.name}
          </Typography>
          <Typography variant="body2" align="left" color="text.secondary" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginBottom: '0',
          }}>
            {Bot.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}