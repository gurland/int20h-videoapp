import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import { Room } from '../types/Room';
import { makeStyles } from 'tss-react/mui';
import CustomCard from '../components/CustomCard';
import {
    Avatar,
    AvatarGroup,
    Box,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';

const rooms: Room[] = [
    {
        id: 1,
        maxUsers: 10,
        title: 'Title',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 2,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 3,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 3,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 3,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 3,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 2,
                name: 'Username2',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
            {
                id: 1,
                name: 'Username1',
                profileImage:
                    'https://cdn.discordapp.com/attachments/630887784185331745/934094537452814396/unknown_5.png',
            },
        ],
    },
    {
        id: 3,
        maxUsers: 10,
        title: 'Title',
        description: 'Description',
        userList: [],
    },
];

const useStyles = makeStyles()(() => ({
    roomCard: {
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        cursor: 'pointer',
    },
    description: {
        height: 50,
        overflow: 'auto',
    },
}));

function Homepage() {
    const { classes } = useStyles();

    return (
        <Grid container spacing={3}>
            {rooms.map((item) => (
                <Grid item xl={3} lg={4} md={6} sm={12} xs={12} key={item.id}>
                    <CustomCard className={classes.roomCard}>
                        <CardHeader
                            action={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.title}
                        />
                        <CardContent>
                            <Typography component="p" variant="body2" className={classes.description}>
                                {item.description}
                            </Typography>
                            <AvatarGroup max={3}>
                                {item.userList.map((user) => (
                                    <Avatar alt={user.name} key={user.id} src={user.profileImage} />
                                ))}
                            </AvatarGroup>
                        </CardContent>
                        <CardActions sx={{ alignSelf: 'self-end', marginTop: 'auto' }}>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Typography variant="body2">
                                    {item.userList.length} / {item.maxUsers}
                                </Typography>
                                <PersonIcon fontSize="small" sx={{ marginLeft: 1 }} />
                            </Box>
                        </CardActions>
                    </CustomCard>
                </Grid>
            ))}
        </Grid>
    );
}

export default Homepage;
