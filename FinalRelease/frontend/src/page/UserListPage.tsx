import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import UserListSearch from '../components/UserListSearch';
import MarketSearch from '../components/MarketSearch';
import '../css/Market.css';
import { LanguageContext } from "../provider/LanguageProvider";
import { getSearchUserList } from '../service/user';
import { UserListType } from '../components/UserList';
import { UserList } from '../components/UserList';
// bot市场
const UserListPage: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndexStr = searchParams.get("pageIndex");
    const pageSizeStr = searchParams.get("pageSize");
    const [pageIndex, setPageIndex] = useState(pageIndexStr != null ? Number.parseInt(pageIndexStr) - 1 : 0);
    const pageSize = pageSizeStr != null ? Number.parseInt(pageSizeStr) : 15;
    const [tabValue, setTabValue] = React.useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const [users, setUsers] = useState([]); // [botListType
    const getSearchUsers = async () => {
        let type = tabValue === 0 ? "id" : "name";
        
        let response = await getSearchUserList(pageIndex, pageSize, searchParams.get("keyword") || "", type);
        console.log(response);
        setUsers(response.users || []);
        if(!response.total) response.total = 0;
        setTotalPage(response.total % pageSize === 0 ? response.total / pageSize : Math.floor(response.total / pageSize) + 1);
    };

    const context = React.useContext(LanguageContext);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(context?.language);
    }, [context?.language, i18n]);

    useEffect(() => {
        getSearchUsers();
    }, [searchParams, tabValue]);

    console.log("users", users);

    const handleSearch = (keyword: string) => {
        setSearchParams({ keyword: keyword });
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log("page change", value - 1);
        setPageIndex(value - 1);
        setSearchParams({ pageIndex: (value).toString() }); // Update the pageIndex when the page changes
    };

    const userListType: UserListType = {
        type: 'Market'
    };

    return (
        <div className='nav'>
            <div style={{ marginTop: '100px' }}>
                <UserListSearch tabValue={tabValue} setTabValue={setTabValue} onChange={handleSearch}></UserListSearch>
            </div>
            <div style={{ marginTop: '20px' }} className='market-card'>
                <UserList type={userListType} users={users}></UserList>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <Pagination count={totalPage} page={pageIndex + 1} onChange={handlePageChange} className='pagination' />
            </div>
        </div>
    );
};
export default UserListPage;