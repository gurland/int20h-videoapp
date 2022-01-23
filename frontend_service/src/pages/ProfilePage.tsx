import React, { ChangeEvent, useContext, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Actions, store } from '../utils/store';
import { getUser, updateUser, uploadImage } from '../api/actions';

type Inputs = { profileName: string; oldPassword: string; newPassword: string };

const schema = yup.object({
    profileName: yup.string(),
    oldPassword: yup.string(),
    newPassword: yup.string(),
});

function ProfilePage() {
    const {
        state: { user },
        dispatch,
    } = useContext(store);

    const { control, getValues, handleSubmit } = useForm<Inputs>({
        defaultValues: { profileName: user?.profileName || '', oldPassword: '', newPassword: '' },
        resolver: yupResolver(schema),
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSaveClick = handleSubmit(async () => {
        let imagePath = '';
        if (selectedFile) {
            const { data } = await uploadImage(selectedFile);
            imagePath = data.path;
        }

        const { oldPassword, profileName, newPassword } = getValues();

        if (user) {
            await updateUser(user.id, { profileName, oldPassword, newPassword, profilePicture: imagePath });
            const { data } = await getUser(user.id);
            dispatch({ type: Actions.SetUser, payload: data });
        }
    });

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        setSelectedFile(fileList?.length ? fileList[0] : null);
    };

    return (
        <Container maxWidth="xs" disableGutters sx={{ marginTop: 8 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Controller
                        name="profileName"
                        control={control}
                        render={({ field }) => <TextField {...field} placeholder="Profile Name" fullWidth />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="oldPassword"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} placeholder="Old Password" fullWidth type="password" />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} placeholder="New Password" fullWidth type="password" />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleAvatarChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button component="span">Change profile pic</Button>
                    </label>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{selectedFile?.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" disableElevation fullWidth onClick={handleSaveClick}>
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProfilePage;
