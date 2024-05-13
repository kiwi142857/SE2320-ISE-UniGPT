import React from 'react';
import MarketSearch from '../components/MarketSearch';
import MarketCard from '../components/MarketCard';
// bot市场
const MarketPage: React.FC = () => {
    return (
        <div className='nav'>
            <div style={{ marginTop: '100px' }}>
                <MarketSearch></MarketSearch>
            </div>
            <div style={{ marginTop: '20px' }}>
                <MarketCard></MarketCard>
            </div>
        </div>
    );
};

export default MarketPage;