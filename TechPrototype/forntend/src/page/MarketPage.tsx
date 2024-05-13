import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import { BotList, BotListType } from '../components/BotList';
import MarketSearch from '../components/MarketSearch';
import '../css/Market.css';
import { LanguageContext } from "../provider/LanguageProvider";
import { getSearchBotList } from '../service/bot';
// bot市场
const MarketPage: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndexStr = searchParams.get("pageIndex");
    const pageSizeStr = searchParams.get("pageSize");
    const [pageIndex, setPageIndex] = useState(pageIndexStr != null ? Number.parseInt(pageIndexStr) -1  : 0);
    const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 15;
    const [tabValue, setTabValue] = React.useState(0);
    const [totalPage, setTotalPage] = useState(0); 

    const [bots, setBots] = useState([]); // [botListType
    const getSearchBots = async () => {
        let order = tabValue === 0 ? "latest" : "star";
        let response = await getSearchBotList(pageIndex, pageSize, searchParams.get("keyword") || "", order);
        console.log(response);
        setBots(response.bots);
        setTotalPage(response.total % pageSize === 0 ? response.total / pageSize : Math.floor(response.total / pageSize) + 1);
    }

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        getSearchBots();
    }, [searchParams,tabValue]);

    console.log("bots", bots);

    const keyword = searchParams.get("keyword");

    const handleSearch = (keyword: string) => {
        setSearchParams({ keyword: keyword });
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log("page change", value -1);
        setPageIndex(value - 1);
        setSearchParams({ pageIndex: (value).toString() }); // Update the pageIndex when the page changes
    };

    const botListType: BotListType = {
        type: 'Market'
    };

    return (
        <div className='nav'>
            <div style={{ marginTop: '100px' }}>
                <MarketSearch tabValue={tabValue} setTabValue={setTabValue} onChange={handleSearch}></MarketSearch>
            </div>
            <div style={{ marginTop: '20px' }} className='market-card'>
                <BotList type={botListType} bots={bots}></BotList>
            </div>
            <div style={{ marginTop: '20px',display: 'flex', justifyContent: 'center'}}>
                <Pagination count={totalPage} page={pageIndex +1 } onChange={handlePageChange} className='pagination'/> 
            </div>
        </div>
    );
};
export default MarketPage;