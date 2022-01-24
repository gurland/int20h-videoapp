import React, { createRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
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
import SimplePeer from 'simple-peer';

const useStyles = makeStyles()((theme) => ({
    drawerPaper: {
        padding: theme.spacing(2),
    },
}));

const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
        // public turn server from https://gist.github.com/sagivo/3a4b2f2c7ac6e1b5267c2f1f59ac6c6b
        // set your own servers here
        {
            url: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808',
        },
    ],
};

const constraints = {
    audio: true,
    video: {
        facingMode: {},
        width: {
            max: 300,
        },
        height: {
            max: 300,
        },
    },
};

constraints.video.facingMode = {
    ideal: 'user',
};

const peers = {};
const mapped = {};
const videoRefs: Record<number, React.Ref<HTMLVideoElement>> = {};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let localStream: MediaStream = null;

function RoomPage() {
    const { classes } = useStyles();
    const [chatOpen, setChatOpen] = useState(false);
    const [room, setRoom] = useState<GetRoomResponse | null>(null);
    const { roomId } = useParams();
    const {
        state: { user },
    } = useContext(store);

    const users = room?.participants || [];
    const socketRef = useRef<Socket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const muteButtonRef = useRef<HTMLButtonElement | null>(null);
    const vidButtonRef = useRef<HTMLButtonElement | null>(null);
    // console.log('mapped', mapped);
    // console.log('peers', peers);

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function removePeer(socket_id) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const videoEl = videoRefs[mapped[socket_id]] as HTMLVideoElement;

        if (videoEl) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const tracks = videoEl?.srcObject?.getTracks();

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            tracks.forEach(function (track) {
                track.stop();
            });

            videoEl.srcObject = null;
            videoEl?.parentNode?.removeChild(videoEl);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (peers[socket_id]) peers[socket_id].destroy();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete peers[socket_id];
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function addPeer(socket_id, am_initiator) {
        console.log('peers', peers);
        console.log('mapped', mapped);
        console.log('socket_id', socket_id);
        console.log(videoRefs);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        peers[socket_id] = new SimplePeer({
            initiator: am_initiator,
            stream: localStream,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            config: configuration,
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        peers[socket_id].on('signal', (data) => {
            socketRef.current?.emit('signal', {
                signal: data,
                socket_id: socket_id,
            });
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        peers[socket_id].on('stream', (stream) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const newVid = videoRefs[mapped[socket_id]] as HTMLVideoElement;
            newVid.srcObject = stream;
            newVid.id = socket_id;
            newVid.playsInline = false;
            newVid.autoplay = true;
        });
    }

    useEffect(() => {
        if (roomId) {
            (async () => {
                await joinRequest(roomId);
                await getRoomInfo(roomId);
                try {
                    const stream = await navigator.mediaDevices.getUserMedia(constraints);
                    if (user?.id) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        videoRefs[user?.id].srcObject = stream;
                    }
                    localStream = stream;

                    socketRef.current = io('https://int20h-videoapp.fun', {
                        path: '/ws/chat',
                        query: {
                            token: localStorage.getItem('accessToken'),
                            roomId,
                        },
                    });

                    socketRef.current?.on('message-broadcast', (data) => {
                        setMessages(data);
                    });

                    socketRef.current?.on('join', (a: any[][]) => {
                        // console.log('socket_id', socket_id);
                        if (roomId) {
                            getRoomInfo(roomId);
                        }
                        a.forEach(([userId, socketId]) => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            mapped[socketId] = userId;
                        });
                    });

                    socketRef.current?.on('initReceive', (socket_id) => {
                        console.log('initReceive peers', peers);

                        console.log('INIT RECEIVE ' + socket_id);
                        addPeer(socket_id, false);

                        socketRef.current?.emit('initSend', socket_id);
                    });

                    socketRef.current?.on('initSend', (socket_id) => {
                        console.log('initSend peers', peers);

                        console.log('INIT SEND ' + socket_id);
                        addPeer(socket_id, true);
                    });

                    socketRef.current?.on('removePeer', (socket_id) => {
                        console.log('removing peer ' + socket_id);
                        removePeer(socket_id);
                    });

                    socketRef.current?.on('disconnect', () => {
                        console.log('GOT DISCONNECTED');
                        for (const socket_id in peers) {
                            removePeer(socket_id);
                        }
                    });

                    socketRef.current?.on('signal', (data) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        peers[data.socket_id].signal(data.signal);
                    });
                } catch (e) {
                    console.log(e);
                }
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

    // const videosCnt = Object.keys(videoRefs).length;
    //
    // // useEffect(() => {
    // //
    // // }, [videosCnt]);

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
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <UserCard userItem={item} getRoomInfo={getRoomInfo} room={room} videoRefs={videoRefs} />
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
