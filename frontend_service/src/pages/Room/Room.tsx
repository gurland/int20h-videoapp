import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useStyles } from './styles';
import { User } from '../../types/User';
import CustomCard from '../../components/CustomCard/CustomCard';
import CallControlsBar from '../../components/CallControlsBar';

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

function Room() {
    const { classes } = useStyles();

    return (
        <>
            <Grid container spacing={2}>
                {users.map((item) => (
                    <Grid item key={item.id} xl={3} lg={4} md={6} sm={12}>
                        <CustomCard key={item.id} className={classes.userCard}>
                            <video autoPlay controls muted>
                                <source src="https://shattereddisk.github.io/rickroll/rickroll.mp4" type="video/mp4" />
                            </video>
                            <Typography mt={1}>{item.name}</Typography>
                        </CustomCard>
                    </Grid>
                ))}
            </Grid>
            <CallControlsBar />
        </>
    );
}

export default Room;
