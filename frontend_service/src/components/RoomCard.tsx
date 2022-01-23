import React from 'react';
import { createRoute, createS3Path } from '../utils/common';
import { Routes } from '../constants/routes';
import { Avatar, AvatarGroup, Box, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CustomCard from './CustomCard';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { Room } from '../types/Room';

const useStyles = makeStyles()(() => ({
    roomCard: {
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        cursor: 'pointer',
    },
    description: {
        height: 50,
        overflow: 'auto',
    },
}));

interface RoomCardProps {
    room: Room;
}

function RoomCard({ room: item }: RoomCardProps) {
    const navigate = useNavigate();
    const { classes } = useStyles();

    return (
        <CustomCard
            className={classes.roomCard}
            onClick={() => navigate(createRoute(Routes.Room, { roomId: item.id }))}
        >
            <CardHeader title={item.title} />
            <CardContent>
                <Typography component="p" variant="body2" className={classes.description}>
                    {item.description}
                </Typography>
                <AvatarGroup max={3}>
                    {item.userList.map((user) => (
                        <Avatar alt={user.profileName} key={user.id} src={createS3Path(user.profilePicture)} />
                    ))}
                </AvatarGroup>
            </CardContent>
            <CardActions sx={{ alignSelf: 'self-end', marginTop: 'auto' }}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="body2">
                        {item.userList.length} / {item.maxUsers}
                    </Typography>
                    <PersonIcon fontSize="small" sx={{ marginLeft: 1 }} />
                </Box>
            </CardActions>
        </CustomCard>
    );
}

export default RoomCard;
