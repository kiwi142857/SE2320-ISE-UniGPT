import React from 'react';
import BotChatPage from '../page/BotChatPage';
import BotDetailPage from '../page/BotDetailPage';
import BotEditPage from '../page/BotEditPage';
import HomePage from '../page/HomePage';
import LoginPage from '../page/LoginPage';
import MarketPage from '../page/MarketPage';
import ProfilePage from '../page/ProfilePage';
import UserListPage from '../page/UserListPage';
import Navigator from './Navigator';

import {
    Outlet,
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element:
            <div>
                <Navigator />
                <Outlet />
            </div>,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/botchat/:botID",
                element: <BotChatPage />
            },
            {
                path: "/market",
                element: <MarketPage />
            },
            {
                path: "/botdetail/:id",
                element: <BotDetailPage />
            },
            {
                path: "/profile/me",
                element: <ProfilePage/>
            },
            {
                path: "/profile/:id",
                element: <ProfilePage/>
            },
            {
                path: "/botcreate",
                element: <BotEditPage edit={false} />
            },
            {
                path: "/botedit/:id",
                element: <BotEditPage edit={true} />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/home",
                element: <HomePage />
            },
            {
                path: "/userlist",
                element: <UserListPage />
            },

        ],
    }
]);

// react路由，根据url显示不同的页面
const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default AppRouter;
