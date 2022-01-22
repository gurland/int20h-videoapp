import React from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Inputs = { login: string; password: string };

const schema = yup.object({
    login: yup.string().required('Login is required'),
    password: yup.string().required('Password is required'),
});

function AuthPage() {
    const {
        control,
        formState: { errors },
        getValues,
        handleSubmit,
    } = useForm<Inputs>({ defaultValues: { login: '', password: '' }, resolver: yupResolver(schema) });
    const { password, login } = getValues();

    const handleLogin = handleSubmit(() => null);

    const handleSignUp = handleSubmit(() => null);

    return (
        <Container maxWidth="xs" disableGutters sx={{ marginTop: 8 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Controller
                        name="login"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                placeholder="Login"
                                fullWidth
                                error={!!errors.login}
                                helperText={errors.login?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                placeholder="Password"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                type="password"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" disableElevation fullWidth onClick={handleLogin}>
                        Log In
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="outlined" disableElevation fullWidth onClick={handleSignUp}>
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AuthPage;
