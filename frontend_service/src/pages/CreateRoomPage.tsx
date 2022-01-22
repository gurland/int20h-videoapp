import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button, Container, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import * as yup from 'yup';

type Inputs = { title: string; description: string; isPrivate: boolean };

const schema = yup.object({
    title: yup.string().required('Title is required'),
    password: yup.string().required('Description is required'),
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
    const { title, description, isPrivate } = getValues();

    const handleCreate = handleSubmit(() => null);
    console.log({ title, description, isPrivate });

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
                    <Button variant="contained" disableElevation fullWidth onClick={handleCreate}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CreateRoomPage;
