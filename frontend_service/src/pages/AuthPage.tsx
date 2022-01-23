import React, { useContext, useState } from 'react';
import { Container, Grid, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { login as loginFunc, signUp } from '../api/actions';
import jwt_decode from 'jwt-decode';
import { Actions, store } from '../utils/store';
import { User } from '../types/User';
import { Routes } from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

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
    const { dispatch } = useContext(store);
    const navigate = useNavigate();
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingReg, setLoadingReg] = useState(false);

    const handleLogin = handleSubmit(async () => {
        setLoadingLogin(true);
        const { password, login } = getValues();
        const {
            data: { token },
        } = await loginFunc(login, password);
        localStorage.setItem('accessToken', token);
        const { sub: userData } = jwt_decode<{ sub: User }>(token);
        dispatch({ type: Actions.SetUser, payload: userData });
        navigate(Routes.Homepage);
        setLoadingLogin(false);
    });

    const handleSignUp = handleSubmit(async () => {
        setLoadingReg(true);
        const { password, login } = getValues();
        await signUp(login, password);
        const {
            data: { token },
        } = await loginFunc(login, password);
        localStorage.setItem('accessToken', token);
        const { sub: userData } = jwt_decode<{ sub: User }>(token);
        dispatch({ type: Actions.SetUser, payload: userData });
        navigate(Routes.Homepage);
        setLoadingReg(false);
    });

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
                    <LoadingButton
                        loading={loadingLogin}
                        variant="contained"
                        disableElevation
                        fullWidth
                        onClick={handleLogin}
                    >
                        Log In
                    </LoadingButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LoadingButton
                        loading={loadingReg}
                        variant="outlined"
                        disableElevation
                        fullWidth
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </LoadingButton>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AuthPage;
