import React, { useState } from 'react';
import { Avatar, Box, Drawer, Grid, IconButton, Typography } from '@mui/material';
import { User } from '../types/User';
import CustomCard from '../components/CustomCard';
import CallControlsBar from '../components/CallControlsBar';
import { makeStyles } from 'tss-react/mui';
import CloseIcon from '@mui/icons-material/Close';
import RoomChat from '../components/RoomChat';

const users: User[] = [
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
    {
        id: 1,
        name: 'Test test',
    },
];

const useStyles = makeStyles()((theme) => ({
    userCard: {
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
    },
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
            <Grid container spacing={2}>
                {users.map(({ id, name, profileImage }) => (
                    <Grid item key={id} xl={3} lg={4} md={6} sm={12} xs={12}>
                        <CustomCard key={id} className={classes.userCard}>
                            <video autoPlay controls muted>
                                <source src="https://shattereddisk.github.io/rickroll/rickroll.mp4" type="video/mp4" />
                            </video>
                            <Box display="flex" mt={1} alignItems="center">
                                <Avatar alt={name} src={profileImage} sx={{ mr: 1, width: 30, height: 30 }} />
                                <Typography>{name}</Typography>
                            </Box>
                        </CustomCard>
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
