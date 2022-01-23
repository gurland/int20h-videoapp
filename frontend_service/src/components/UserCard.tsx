import React, { useContext, useState } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MicOffIcon from '@mui/icons-material/MicOff';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomCard from './CustomCard';
import { makeStyles } from 'tss-react/mui';
import { User } from '../types/User';
import { useParams } from 'react-router-dom';
import { deleteParticipant } from '../api/actions';
import { GetRoomResponse } from '../api/types/GetRoomResponse';
import { store } from '../utils/store';

const useStyles = makeStyles()(() => ({
    userCard: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

interface UserCardProps {
    userItem: User;
    getRoomInfo: (roomId: string) => void;
    room: GetRoomResponse | null;
    localVideoRef: React.Ref<HTMLVideoElement>;
}

function UserCard({ userItem, getRoomInfo, room, localVideoRef }: UserCardProps) {
    const { classes } = useStyles();
    const { id, profileName, profilePicture } = userItem;
    const { roomId } = useParams();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const {
        state: { user },
    } = useContext(store);

    const handleCloseMenu = () => setAnchorEl(null);
    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleKickUser = () => {
        if (roomId && id) {
            (async () => {
                await deleteParticipant(roomId, id);
                await getRoomInfo(roomId);
            })();
        }
        handleCloseMenu();
    };

    return (
        <>
            <CustomCard key={id} className={classes.userCard}>
                <video
                    id={`user-video-${id}`}
                    autoPlay
                    muted
                    controls
                    ref={user?.id === id ? localVideoRef : undefined}
                >
                    <source src="https://shattereddisk.github.io/rickroll/rickroll.mp4" type="video/mp4" />
                </video>
                <Box display="flex" mt={1} alignItems="center">
                    <Avatar alt={profileName} src={profilePicture} sx={{ mr: 1, width: 30, height: 30 }} />
                    <Typography>{profileName}</Typography>
                    <MicOffIcon fontSize="small" sx={{ marginLeft: 1 }} />
                    {user?.id === room?.creator?.id && (
                        <IconButton sx={{ marginLeft: 'auto' }} onClick={handleOpenMenu}>
                            <MoreVertIcon />
                        </IconButton>
                    )}
                </Box>
            </CustomCard>
            {user?.id === room?.creator?.id && (
                <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleCloseMenu}>
                    <MenuItem onClick={handleKickUser}>Kick</MenuItem>
                </Menu>
            )}
        </>
    );
}

export default UserCard;
