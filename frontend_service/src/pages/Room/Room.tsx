import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
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
    const { roomId } = useParams();
    const { classes } = useStyles();

    return (
        <>
            <Box className={classes.usersWrapper}>
                {users.map((item) => (
                    <CustomCard key={item.id} className={classes.userCard}>
                        <video autoPlay controls muted>
                            <source src="https://shattereddisk.github.io/rickroll/rickroll.mp4" type="video/mp4" />
                        </video>
                        <Typography mt={1}>{item.name}</Typography>
                    </CustomCard>
                ))}
            </Box>
            <CallControlsBar />
        </>
    );
}

export default Room;
