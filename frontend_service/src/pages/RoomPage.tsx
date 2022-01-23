import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Drawer, Grid, IconButton } from '@mui/material';
import { User } from '../types/User';
import CallControlsBar from '../components/CallControlsBar';
import { makeStyles } from 'tss-react/mui';
import CloseIcon from '@mui/icons-material/Close';
import RoomChat from '../components/RoomChat';
import UserCard from '../components/UserCard';
import { Breakpoint } from '@mui/system/createTheme/createBreakpoints';
import { useParams } from 'react-router-dom';
import { deleteParticipant, getRoom, joinToRoom } from '../api/actions';
import { store } from '../utils/store';
import { GetRoomResponse } from '../api/types/GetRoomResponse';

const users: User[] = [
    {
        id: 1,
        login: 'test',
        profileName: 'Test test',
        profilePicture: '',
    },
];

const useStyles = makeStyles()((theme) => ({
    drawerPaper: {
        padding: theme.spacing(2),
    },
}));

function RoomPage() {
    const { classes } = useStyles();
    const [chatOpen, setChatOpen] = useState(false);
    const [room, setRoom] = useState<GetRoomResponse | null>(null);
    const { roomId } = useParams();
    const {
        state: { user },
    } = useContext(store);

    useEffect(() => {
        if (roomId) {
            (async () => {
                try {
                    await joinToRoom(roomId);
                } catch (e) {}

                const { data } = await getRoom(roomId);
                if (data) {
                    setRoom(data);
                }
            })();
        }

        return () => {
            if (roomId && user?.id) {
                (async () => {
                    await deleteParticipant(roomId, user.id);
                })();
            }
        };
    }, [roomId, user?.id]);

    const handleDrawerClose = () => setChatOpen(false);

    const gridItemWidth = useCallback((breakpoint: Breakpoint) => {
        switch (breakpoint) {
            case 'xl':
                if (users.length === 1) {
                    return 9;
                }
                return 12 / users.length < 4 ? 4 : 12 / users.length;
            case 'lg':
                if (users.length === 1) {
                    return 9;
                }
                return 12 / users.length < 5 ? 5 : 12 / users.length;
            case 'md':
                if (users.length === 1) {
                    return 12;
                }
                return 12 / users.length < 6 ? 6 : 12 / users.length;
            case 'sm':
                if (users.length === 1) {
                    return 12;
                }
                return 12 / users.length < 8 ? 8 : 12 / users.length;
            case 'xs':
                return 12;
        }
    }, []);

    console.log(room);

    return (
        <>
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                {room?.participants.map((item) => (
                    <Grid
                        item
                        key={item.id}
                        xs={gridItemWidth('xs')}
                        sm={gridItemWidth('sm')}
                        md={gridItemWidth('md')}
                        lg={gridItemWidth('lg')}
                        xl={gridItemWidth('xl')}
                    >
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
