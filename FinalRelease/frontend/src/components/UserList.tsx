import React from 'react';
import { Box, Grid, Card } from '@mui/material';
import { User } from '../service/user';
import UserListCard from './UserListCard';
export interface UserListType {
    type: 'Market';
}

export function UserList({ type, users }: { type: UserListType, users: User[] | null; }) {

    
    console.log("type", type);
    
    return (
        <>
            {users == null ? <></> :
                <Box sx={{ flexGrow: 1 }} >
                    <Grid container item spacing={4}>
                        
                        {users.map(user => (
                            <Grid item xs={4} key={user.id}>
                                <UserListCard User={user} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>}
        </>
    );
};