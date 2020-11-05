import React from 'react';
import { connect } from 'react-redux' 
import { withSnackbar } from 'notistack';
import { Box, Button, Grid, TextField, Typography, Hidden, Link, CircularProgress } from '@material-ui/core';
import { signUp } from '../redux/actions/signup';
import heroImage from '../assets/background.jpg';
import './landingPage.scss';

class LandingPages extends React.Component {
    constructor(props) {
        super(props);
        //passwordInput and userNameInput monitor if user has entered any value when the page load
        this.state = { userName: '', password: '', passwordInput: false, userNameInput: false}
        this.changeHandler = this.changeHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.user.error !== prevProps.user.error && this.props.user.error) {
            this.props.enqueueSnackbar(this.props.user.error, { 
                variant: 'error', 
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        }
      }
    changeHandler(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            [name + 'Input']: true
        })
    }
    async handleClick(e) {
            const { loading } = this.props.user;
           e.preventDefault()
            const { userName, password } = this.state;
            if(!loading && (password.length > 7) && (userName.length > 0 && userName.length < 30)) {
            await this.props.dispatch(signUp({ userName, password}))
                if(this.props.user.error.length > 0) {
                    this.props.enqueueSnackbar(this.props.user.error, { 
                        variant: 'error',
                        maxSnack: 1,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    });
                }
            }           
    }

    render() {
        return (
            <Grid container className="signup-container">
            <Grid item xs={12} sm={6}>
                <Hidden only="xs">
                    <Box height="100%" className="hero-image-section" display="flex" justifyContent="center" alignItems="center" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.71),rgba(0, 0, 0, 0.69)), url(${heroImage})`}}>
                    <Typography variant="h2">CHAT APP</Typography>
                </Box>
                </Hidden>
                
            </Grid>
            <Grid item xs={12} sm={6} container className="signup-container">
                <Box height="25%" width="100%" display="flex" alignItems="center" justifyContent="center">
                </Box>
                <Box height="8.5%" width="100%" textAlign="center">
        <Typography display="block" variant="h5" align="center">Register</Typography>
                </Box>
                <Box height="66.5%" width="100%">
                    <form noValidate className="signup-form">
                    <TextField 
                        onChange={this.changeHandler}
                        id="standard-basic"
                        label="Username"
                        value={this.state.userName}
                        error={(this.state.userName.length < 1 || this.state.userName.length > 30) && this.state.userNameInput}
                        helperText={((this.state.userName.length < 1 || this.state.userName.length > 30) && this.state.userNameInput) && "userName length should be greater than 0 and less than 30 character"}
                        name="userName"
                        required className="username"
                         />
                    <TextField
                        value={this.state.password}
                        onChange={this.changeHandler}
                        name="password"
                        error={(this.state.password.length < 8) && this.state.passwordInput}
                        
                        className="password"
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        helperText={((this.state.password.length < 8) && this.state.passwordInput) && "password length should be greater than 8"}
                        required
                        autoComplete="current-password"
                        />
                    <Box mt={2} width={150}>
                       <Button onClick={this.handleClick} data-testid="signup-button" variant="contained" size="large"  fullWidth>{(this.props.user.loading) ? (<CircularProgress size={35} disableShrink />) : 'Sign up'}</Button> 
                    </Box>
                    <Box mt={1}>
                        <Typography variant="body2">already signup, <Link href="#" underline="none">login here</Link></Typography>
                    </Box>
                    
                </form>  
                </Box>
    
            </Grid>
        </Grid>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user }
  }
  
export default connect(mapStateToProps)(withSnackbar(LandingPages));
