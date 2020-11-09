import React from 'react';
import {  Grid } from '@material-ui/core';
import Image from '../sharedComponents/Image';
import LoginForm from './LoginForm';

import '../landingPage.scss';

const Login = () => {
        return (
            <Grid container className="signup-container">
                <Image />
                <LoginForm />
        </Grid>
        )
}

export default Login;
