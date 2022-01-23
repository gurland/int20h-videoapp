import React, { useEffect, useState } from 'react';
import { Room } from '../types/Room';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import RoomCard from '../components/RoomCard';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../constants/routes';
import { getRooms } from '../api/actions';

function Homepage() {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        if (token) {
            (async () => {
                const { data } = await getRooms();
                if (data) {
                    setRooms(data);
                }
            })();
        }
    }, [token]);

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
                <Grid item xl={3} lg={4} md={6} sm={12} xs={12} key={item.uuid}>
                    <RoomCard room={item} />
                </Grid>
            ))}
        </Grid>
    );
}

export default Homepage;
