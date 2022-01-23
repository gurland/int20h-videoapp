import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Box, Drawer, Grid, IconButton } from '@mui/material';
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
import { initPeerToPeer } from '../utils/p2pHelpers';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../types/ChatMessage';

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

    const users = room?.participants || [];
    const localVideoRef = useRef(null);
    const socketRef = useRef<Socket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const mapped = useRef({});
    const peers = useRef({});
    const muteButtonRef = useRef<HTMLButtonElement | null>(null);
    const vidButtonRef = useRef<HTMLButtonElement | null>(null);
    console.log(peers.current);

    const joinRequest = async (roomId: string) => {
        try {
            await joinToRoom(roomId);
        } catch (e) {}
    };

    const sendMessage = (message: string, senderName?: string) => {
        socketRef.current?.emit('message', { messageType: 'text', content: message, senderName });
    };

    const getRoomInfo = async (roomId: string) => {
        const { data } = await getRoom(roomId);
        if (data) {
            setRoom(data);
        }
    };

    useEffect(() => {
        socketRef.current = io('http://157.90.230.141', {
            path: '/ws/chat',
            query: {
                token: localStorage.getItem('accessToken'),
                roomId,
            },
        });

        socketRef.current?.on('message-broadcast', (data) => {
            setMessages(data);
        });

        socketRef.current.on('join', (a: any[][]) => {
            a.forEach(([userId, socketId]) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                mapped.current[socketId] = userId;
            });
        });

        if (roomId) {
            (async () => {
                await joinRequest(roomId);
                await getRoomInfo(roomId);
                initPeerToPeer(
                    socketRef.current as Socket,
                    localVideoRef.current as unknown as HTMLVideoElement,
                    peers.current,
                    mapped.current,
                );
            })();
        }

        return () => {
            socketRef.current?.disconnect();

            if (roomId && user?.id) {
                (async () => {
                    await deleteParticipant(roomId, user.id);
                })();
            }
        };
    }, [roomId, user?.id]);

    const handleDrawerClose = () => setChatOpen(false);

    const gridItemWidth = useCallback(
        (breakpoint: Breakpoint) => {
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
        },
        [users.length],
    );

    return (
        <>
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                {users.map((item) => (
                    <Grid
                        item
                        key={item.id}
                        xs={gridItemWidth('xs')}
                        sm={gridItemWidth('sm')}
                        md={gridItemWidth('md')}
                        lg={gridItemWidth('lg')}
                        xl={gridItemWidth('xl')}
                    >
                        <UserCard userItem={item} getRoomInfo={getRoomInfo} room={room} localVideoRef={localVideoRef} />
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
                <RoomChat messages={messages} sendMessage={sendMessage} />
            </Drawer>
            <CallControlsBar setChatOpen={setChatOpen} muteButtonRef={muteButtonRef} vidButtonRef={vidButtonRef} />
        </>
    );
}

export default RoomPage;
