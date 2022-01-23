/* eslint-disable */

import React, { useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ChatIcon from '@mui/icons-material/Chat';
import CustomCard from './CustomCard';
import { Box, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../constants/routes';

interface DeviceControlIconProps {
    onIcon: React.ReactElement;
    offIcon: React.ReactElement;
    isOff: boolean;
    setIsOff: React.Dispatch<React.SetStateAction<boolean>>;
    ref?: React.Ref<HTMLButtonElement>;
    onClick?: () => void;
}

const toggleControl = (dispatchFunc: React.Dispatch<React.SetStateAction<boolean>>) => () =>
    dispatchFunc((prevState) => !prevState);

const DeviceControlIcon = ({ onClick, isOff, setIsOff, onIcon, offIcon, ref }: DeviceControlIconProps) => {
    return (
        <IconButton
            size="large"
            onClick={() => {
                toggleControl(setIsOff);
                if (onClick) {
                    onClick();
                }
            }}
            ref={ref}
        >
            {isOff ? offIcon : onIcon}
        </IconButton>
    );
};

const useStyles = makeStyles()((theme) => ({
    card: {
        width: 500,
        position: 'absolute',
        bottom: theme.spacing(6),
        left: 0,
        right: 0,
        marginRight: 'auto',
        marginLeft: 'auto',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        [theme.breakpoints.down(530)]: {
            width: 'unset',
            bottom: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
    },
    controlsWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

interface CallControlsBarProps {
    setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
    muteButtonRef: React.Ref<HTMLButtonElement>;
    vidButtonRef: React.Ref<HTMLButtonElement>;
}

function CallControlsBar({ setChatOpen, vidButtonRef, muteButtonRef }: CallControlsBarProps) {
    const [micOff, setMicOff] = useState(false);
    const [soundOff, setSoundOff] = useState(false);
    const [videoOff, setVideoOff] = useState(false);

    const { classes } = useStyles();
    const navigate = useNavigate();

    const handleDisconnect = () => {
        navigate(Routes.Homepage);
    };

    return (
        <CustomCard className={classes.card}>
            <Box className={classes.controlsWrapper}>
                <DeviceControlIcon
                    // @ts-ignore
                    onClick={() => window.toggleMute()}
                    ref={muteButtonRef}
                    isOff={micOff}
                    setIsOff={setMicOff}
                    offIcon={<MicOffIcon />}
                    onIcon={<MicIcon />}
                />
                <DeviceControlIcon
                    isOff={soundOff}
                    setIsOff={setSoundOff}
                    offIcon={<VolumeOffIcon />}
                    onIcon={<VolumeUpIcon />}
                />
                <DeviceControlIcon
                    // @ts-ignore
                    onClick={() => window.toggleVid()}
                    ref={vidButtonRef}
                    isOff={videoOff}
                    setIsOff={setVideoOff}
                    offIcon={<VideocamOffIcon />}
                    onIcon={<VideocamIcon />}
                />
                <IconButton size="large" onClick={toggleControl(setChatOpen)}>
                    <ChatIcon color="info" />
                </IconButton>
                <IconButton size="large" onClick={handleDisconnect}>
                    <CallEndIcon color="error" />
                </IconButton>
            </Box>
        </CustomCard>
    );
}

export default CallControlsBar;
