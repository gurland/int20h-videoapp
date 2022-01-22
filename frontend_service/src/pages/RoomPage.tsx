import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { User } from '../types/User';
import CustomCard from '../components/CustomCard';
import CallControlsBar from '../components/CallControlsBar';
import { makeStyles } from 'tss-react/mui';

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

const useStyles = makeStyles()(() => ({
    userCard: {
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
    },
}));

function RoomPage() {
    const { classes } = useStyles();

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
            <CallControlsBar />
        </>
    );
}

export default RoomPage;