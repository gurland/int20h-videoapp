import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { format } from 'date-fns';

type MessagePosition = 'left' | 'right';

interface MessageBubbleProps {
    text: string;
    date: Date;
    position: MessagePosition;
    author: string;
}

const useStyles = makeStyles()((theme) => ({
    message: {
        borderRadius: theme.spacing(2),
        width: '75%',
        borderWidth: 2,
        borderColor: theme.palette.grey.A200,
        borderStyle: 'solid',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
    },
    rightPos: {
        borderTopRightRadius: 0,
        backgroundColor: theme.palette.grey['400'],
        // marginRight: theme.spacing(1),
        marginLeft: 'auto',
    },
    leftPos: {
        backgroundColor: theme.palette.grey['50'],
        borderTopLeftRadius: 0,
        // marginLeft: theme.spacing(1),
        marginRight: 'auto',
    },
}));

function MessageBubble({ date, text, position, author }: MessageBubbleProps) {
    const { classes, cx } = useStyles();

    return (
        <Box
            className={cx(classes.message, {
                [classes.leftPos]: position === 'left',
                [classes.rightPos]: position === 'right',
            })}
        >
            <Box display="flex" justifyContent="flex-start" alignItems="center">
                <Typography variant="subtitle2">{author}</Typography>
                <Typography variant="caption" color="textSecondary" lineHeight={1} ml={1}>
                    {format(date, 'HH:mm:ss')}
                </Typography>
            </Box>
            <Typography>{text}</Typography>
        </Box>
    );
}

export default MessageBubble;
