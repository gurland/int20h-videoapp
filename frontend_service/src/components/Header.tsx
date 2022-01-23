import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Routes } from '../constants/routes';
import { Actions, store } from '../utils/store';
import LogoutIcon from '@mui/icons-material/Logout';

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
    const {
        state: { user },
        dispatch,
    } = useContext(store);
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
        dispatch({ type: Actions.SetUser, payload: null });
        navigate(Routes.Homepage);
    };

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
                {!!user && (
                    <>
                        <Link to={Routes.CreateRoom} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" disableElevation sx={{ mr: 3 }}>
                                Create room
                            </Button>
                        </Link>
                        <Link to={Routes.Profile}>
                            <Avatar src="https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png" />
                        </Link>
                        <IconButton onClick={handleLogOut} sx={{ marginLeft: 2 }}>
                            <LogoutIcon />
                        </IconButton>
                    </>
                )}
            </Box>
        </div>
    );
}

export default Header;
