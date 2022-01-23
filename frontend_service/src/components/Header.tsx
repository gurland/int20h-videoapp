import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import { Avatar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Routes } from '../constants/routes';

const useStyles = makeStyles()((theme) => ({
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2, 4),
        transition: 'padding 0.2s ease-in-out',
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(2, 2),
        },
    },
}));

function Header() {
    const { classes } = useStyles();

    return (
        <div className={classes.navbar}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={Routes.Homepage}>
                <Typography variant="h4">
                    <i>
                        <b>Video</b>
                    </i>
                    Chat
                </Typography>
            </Link>
            <Box display="flex">
                <Link to={Routes.CreateRoom} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" disableElevation sx={{ mr: 3 }}>
                        Create room
                    </Button>
                </Link>

                <Link to={Routes.Profile}>
                    <Avatar src="https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png" />
                </Link>
            </Box>
        </div>
    );
}

export default Header;
