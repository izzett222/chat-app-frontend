import React from 'react';
import {  Grid } from '@material-ui/core';
import Image from './sharedComponents/Image';
import Signup from './signup/Signup';

import './landingPage.scss';

const LandingPage = () => {
        return (
            <Grid container className="signup-container">
                <Image />
               <Signup />
        </Grid>
        )
}

export default LandingPage;
