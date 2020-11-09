import React from 'react';
import { Box, Grid, Typography, Hidden } from '@material-ui/core';
import heroImage from '../../assets/background.jpg';
import '../landingPage.scss';

const Image = () => {
    return (
        <Grid item xs={12} sm={6}>
            <Hidden only="xs">
                <Box height="100%" className="hero-image-section" display="flex" justifyContent="center" alignItems="center" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.71),rgba(0, 0, 0, 0.69)), url(${heroImage})`}}>
                    <Typography variant="h2">CHAT APP</Typography>
                </Box>
            </Hidden>
        
    </Grid>)
}

export default Image;
