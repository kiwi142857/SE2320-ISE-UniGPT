import React from 'react';
import { Tabs, Tab, Grid, Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import '../css/Market.css';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { LanguageContext } from "../provider/LanguageProvider";

export function UserListSearchTabs({tabValue, setTabValue}: {tabValue: number, setTabValue: React.Dispatch<React.SetStateAction<number>>}) {
    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <div>
            <Tabs value={tabValue} onChange={handleChange}>
                <Tab label={t("ID")} className='search-tab'/>
                <Tab label={t("Name")} className='search-tab'/>
            </Tabs>
        </div>
    );
}

function SearchBox({onChange}: {onChange: (keyword: string) => void}) {
    return (
        <div className='search-box'>
            <Input disableUnderline inputProps={{ 'aria-label': 'search' }} className='input-box'
            onChange={(e) => onChange(e.target.value)}></Input>
        </div>
    );
}

export default function UserListSearch({tabValue, setTabValue, onChange}: {tabValue: number, setTabValue: React.Dispatch<React.SetStateAction<number>>, onChange: (keyword: string) => void}) {
    return (
        <Grid container spacing={0} className='market-search' >
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={4}>
                <UserListSearchTabs tabValue={tabValue} setTabValue={setTabValue}></UserListSearchTabs>
            </Grid>
            <Grid item xs={3}>
                <SearchBox onChange={onChange}></SearchBox>
            </Grid>
            <Grid item xs={2}>
                <IconButton style={{ backgroundColor: '#D9D9D9', color:'#FFFFFF', marginLeft:'-50%' }}>
                    <SearchOutlinedIcon fontSize='large'/>
                </IconButton>
            </Grid>
        </Grid>
    );
}