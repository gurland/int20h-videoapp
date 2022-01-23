import React from 'react';
import { Room } from '../types/Room';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import RoomCard from '../components/RoomCard';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../constants/routes';

const rooms: Room[] = [
    {
        id: 1,
        maxUsers: 10,
        title: 'Title',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 2,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 3,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 3,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 3,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 3,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 3,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [],
    },
];

function Homepage() {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    if (!token) {
        return (
            <Container sx={{ height: '80%' }}>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100%">
                    <Typography variant="h3" mb={4}>
                        Please authorize to see available rooms
                    </Typography>
                    <Button variant="outlined" size="large" onClick={() => navigate(Routes.Auth)}>
                        Go to Auth Page
                    </Button>
                </Box>
            </Container>
        );
    }
    return (
        <Grid container spacing={3}>
            {rooms.map((item) => (
                <Grid item xl={3} lg={4} md={6} sm={12} xs={12} key={item.id}>
                    <RoomCard room={item} />
                </Grid>
            ))}
        </Grid>
    );
}

export default Homepage;
