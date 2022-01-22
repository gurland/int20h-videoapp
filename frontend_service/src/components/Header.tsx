import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import { Typography } from '@mui/material';

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
            <Typography variant="h4">Title</Typography>
            <Button variant="contained" disableElevation sx={{ borderRadius: 16, mr: 1 }}>
                Create room
            </Button>
        </div>
    );
}

export default Header;
