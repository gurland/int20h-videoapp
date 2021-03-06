import React, { useContext, useEffect, useRef } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomCard from './CustomCard';
import { makeStyles } from 'tss-react/mui';
import { User } from '../types/User';
import { useParams } from 'react-router-dom';
import { deleteParticipant } from '../api/actions';
import { GetRoomResponse } from '../api/types/GetRoomResponse';
import { store } from '../utils/store';
import { createS3Path } from '../utils/common';

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
    videoRefs: Record<number, React.Ref<HTMLVideoElement>>;
}

function UserCard({ userItem, getRoomInfo, room, videoRefs }: UserCardProps) {
    const { classes } = useStyles();
    const { id, profileName, profilePicture } = userItem;
    const { roomId } = useParams();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const {
        state: { user },
    } = useContext(store);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const handleCloseMenu = () => setAnchorEl(null);
    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (videoRef.current) videoRef.current.muted = false;
    }, []);

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
                    ref={(v) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        videoRefs[id] = v;
                        videoRef.current = v;
                    }}
                >
                    <source src="https://shattereddisk.github.io/rickroll/rickroll.mp4" type="video/mp4" />
                </video>
                <Box display="flex" mt={1} alignItems="center">
                    <Avatar
                        alt={profileName}
                        src={createS3Path(profilePicture)}
                        sx={{ mr: 1, width: 30, height: 30 }}
                    />
                    <Typography>{profileName}</Typography>
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
