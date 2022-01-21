import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
    userCard: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 360,
        cursor: 'pointer',
        margin: 'auto',
        marginBottom: theme.spacing(4),
    },
    usersWrapper: {
        display: 'flex',
        margin: theme.spacing(0, -2),
        flexWrap: 'wrap',
        transition: 'margin 0.2s ease-in-out',
    },
}));
