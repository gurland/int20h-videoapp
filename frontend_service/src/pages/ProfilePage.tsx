import React, { ChangeEvent, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Inputs = { profileName: string; password: string; confirmPassword: string };

const schema = yup.object({
    profileName: yup.string(),
    password: yup.string(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function ProfilePage() {
    const {
        control,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: { profileName: '', password: '', confirmPassword: '' },
        resolver: yupResolver(schema),
    });
    const { password, profileName, confirmPassword } = getValues();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSaveClick = handleSubmit(() => null);

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
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} placeholder="Password" fullWidth type="password" />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                placeholder="Repeat Password"
                                fullWidth
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                type="password"
                            />
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
