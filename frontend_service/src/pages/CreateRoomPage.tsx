import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Container, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import * as yup from 'yup';
import { createRoom } from '../api/actions';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../constants/routes';
import { LoadingButton } from '@mui/lab';
import { createRoute } from '../utils/common';

type Inputs = { title: string; description: string; isPrivate: boolean };

const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
});

function CreateRoomPage() {
    const {
        control,
        formState: { errors },
        getValues,
        handleSubmit,
    } = useForm<Inputs>({
        defaultValues: { title: '', description: '', isPrivate: false },
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreate = handleSubmit(async () => {
        setLoading(true);
        const { title, description, isPrivate } = getValues();
        const { data } = await createRoom({ name: title, description, public: !isPrivate });
        if (data) {
            setLoading(false);
            navigate(createRoute(Routes.Room, { roomId: data.roomId }));
        }
    });

    return (
        <Container maxWidth="xs" disableGutters sx={{ marginTop: 8 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                placeholder="Title"
                                fullWidth
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                placeholder="Description"
                                fullWidth
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="isPrivate"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel control={<Switch {...field} />} label="Private Room" />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        disableElevation
                        fullWidth
                        onClick={handleCreate}
                    >
                        Create
                    </LoadingButton>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CreateRoomPage;
