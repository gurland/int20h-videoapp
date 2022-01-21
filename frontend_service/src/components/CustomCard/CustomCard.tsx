import React from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

interface CustomCardProps extends Record<string, unknown> {
    children: React.ReactNode;
    className?: string;
}

const useStyles = makeStyles()((theme) => ({
    root: {
        transition: 'width 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        background: 'white',
        borderRadius: theme.spacing(2),
        padding: theme.spacing(2),
        '&:hover': {
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        },
    },
}));

function CustomCard({ children, className, ...props }: CustomCardProps) {
    const { classes, cx } = useStyles();
    return (
        <Paper elevation={0} className={cx(classes.root, className)} {...props}>
            {children}
        </Paper>
    );
}

export default CustomCard;
