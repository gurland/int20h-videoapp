import React, { useState } from 'react';
import { Box, Drawer, Grid, IconButton } from '@mui/material';
import { User } from '../types/User';
import CallControlsBar from '../components/CallControlsBar';
import { makeStyles } from 'tss-react/mui';
import CloseIcon from '@mui/icons-material/Close';
import RoomChat from '../components/RoomChat';
import UserCard from '../components/UserCard';

const users: User[] = [
    {
        id: 1,
        name: 'Test test',
    },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
    // {
    //     id: 1,
    //     name: 'Test test',
    // },
];

const useStyles = makeStyles()((theme) => ({
    drawerPaper: {
        padding: theme.spacing(2),
    },
}));

function RoomPage() {
    const { classes } = useStyles();
    const [chatOpen, setChatOpen] = useState(false);

    const handleDrawerClose = () => setChatOpen(false);

    return (
        <>
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                {users.map((item) => (
                    <Grid item key={item.id} xs={12 / users.length < 4 ? 4 : 12 / users.length}>
                        <UserCard userItem={item} />
                    </Grid>
                ))}
            </Grid>
            <Drawer
                classes={{ paper: classes.drawerPaper }}
                elevation={0}
                variant="persistent"
                open={chatOpen}
                onClose={handleDrawerClose}
                anchor="right"
            >
                <Box>
                    <IconButton onClick={handleDrawerClose}>{<CloseIcon />}</IconButton>
                </Box>
                <RoomChat />
            </Drawer>
            <CallControlsBar setChatOpen={setChatOpen} />
        </>
    );
}

export default RoomPage;
