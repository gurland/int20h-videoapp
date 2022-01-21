import React, { useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CustomCard from './CustomCard/CustomCard';
import { Box, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

interface DeviceControlIconProps {
    onIcon: React.ReactElement;
    offIcon: React.ReactElement;
    isOff: boolean;
    setIsOff: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeviceControlIcon = ({ isOff, setIsOff, onIcon, offIcon }: DeviceControlIconProps) => {
    const handleIconClick = () => {
        if (isOff) {
            setIsOff(false);
        } else {
            setIsOff(true);
        }
    };
    return (
        <IconButton size="large" onClick={handleIconClick}>
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
    },
    controlsWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

function CallControlsBar() {
    const [micOff, setMicOff] = useState(false);
    const [soundOff, setSoundOff] = useState(false);
    const [videoOff, setVideoOff] = useState(false);

    const { classes } = useStyles();

    return (
        <CustomCard className={classes.card}>
            <Box className={classes.controlsWrapper}>
                <DeviceControlIcon isOff={micOff} setIsOff={setMicOff} offIcon={<MicOffIcon />} onIcon={<MicIcon />} />
                <DeviceControlIcon
                    isOff={soundOff}
                    setIsOff={setSoundOff}
                    offIcon={<VolumeOffIcon />}
                    onIcon={<VolumeUpIcon />}
                />
                <DeviceControlIcon
                    isOff={videoOff}
                    setIsOff={setVideoOff}
                    offIcon={<VideocamOffIcon />}
                    onIcon={<VideocamIcon />}
                />
                <IconButton size="large">
                    <CallEndIcon color="error" />
                </IconButton>
            </Box>
        </CustomCard>
    );
}

export default CallControlsBar;
