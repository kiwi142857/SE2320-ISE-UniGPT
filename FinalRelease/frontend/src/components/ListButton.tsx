import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LanguageContext } from "../provider/LanguageProvider";

export function ListButton({ isAdmin }: { isAdmin: boolean; }) {


    const { t, i18n } = useTranslation();
    const context = React.useContext(LanguageContext);

    const [anchorEl, setAnchorEl] = React.useState<EventTarget & HTMLButtonElement | null>(null);
    const unorderListIConUrl = process.env.PUBLIC_URL + '/assets/unordered_list.png';

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button onMouseEnter={handleMouseEnter}>
                <img src={unorderListIConUrl} alt="Unorder List" style={{ height: 40 }} />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMouseLeave}
                MenuListProps={{ onMouseLeave: handleMouseLeave }}
            >
                <MenuItem onClick={handleMouseLeave}>
                    <Link to="/market" style={{ textDecoration: 'none', color: 'inherit' }}>{t("Market")}</Link>
                </MenuItem>
                <MenuItem onClick={handleMouseLeave}>
                    <Link to="/botcreate" style={{ textDecoration: 'none', color: 'inherit' }}>{t("Bot Create")}</Link>
                </MenuItem>
                {isAdmin && <MenuItem onClick={handleMouseLeave}>
                    <Link to="/userlist" style={{ textDecoration: 'none', color: 'inherit' }}>{t("UserList")}</Link>
                </MenuItem>}
            </Menu>
        </div>
    );
}