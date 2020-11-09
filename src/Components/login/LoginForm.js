import React from 'react';
import { connect } from 'react-redux' 
import { withSnackbar } from 'notistack';
import { Box, Button, Grid, TextField, Typography, CircularProgress } from '@material-ui/core';
import { login } from '../../redux/actions/login';
import { Link } from 'react-router-dom';
import '../landingPage.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        //passwordInput and userNameInput monitor if user has entered any value when the page load
        this.state = { userName: '', password: '', passwordInput: false, userNameInput: false }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.errorPopUp = this.errorPopUp.bind(this);
    }
    errorPopUp(message) {
        this.props.enqueueSnackbar(message, { 
            variant: 'error', 
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
        });
        
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.user.loginError !== prevProps.user.loginError && this.props.user.loginError) {
           this.errorPopUp(this.props.user.loginError);
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

            const { loginLoading } = this.props.user;
           e.preventDefault()
            const { userName, password } = this.state;
            if(!loginLoading && userName.trim().length > 0 && password.trim().length > 0) {
                await this.props.dispatch(login({ userName, password }))
                if(this.props.user.loginError) {
                    this.errorPopUp(this.props.user.loginError)
                }
            } else if(userName.trim().length < 1 && password.trim().length < 1) {
                this.setState({
                    passwordInput: true,
                    userNameInput: true
                })
            }         
    }

    render() {
        const { passwordInput, userNameInput } = this.state;
        return (
            <Grid item xs={12} sm={6} container className="signup-container">
                <Box height="25%" width="100%" display="flex" alignItems="center" justifyContent="center">
                </Box>
                <Box height="8.5%" width="100%" textAlign="center">
                    <Typography display="block" variant="h5" align="center">Login</Typography>
                </Box>
                <Box height="66.5%" width="100%">
                    <form noValidate className="signup-form">
                        <TextField 
                            onChange={this.changeHandler}
                            id="standard-basic"
                            label="Username"
                            value={this.state.userName}
                            error={this.state.userName.trim().length < 1 && userNameInput}
                            helperText={this.state.userName.trim().length < 1 && 'username is required'}
                            name="userName"
                            required className="username"
                            />
                        <TextField
                            value={this.state.password}
                            onChange={this.changeHandler}
                            name="password"
                            className="password"
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            error={this.state.password.trim().length < 1 && passwordInput}
                            helperText={this.state.password.trim().length < 1 && 'password is required'}
                            required
                            autoComplete="current-password"
                            />
                        <Box mt={2} width={150}>
                        <Button onClick={this.handleClick} data-testid="signup-button" variant="contained" size="large"  fullWidth>{(this.props.user.loginLoading) ? (<CircularProgress size={35} disableShrink />) : 'sign in'}</Button> 
                        </Box>
                        <Box mt={1}>
                            <Typography variant="body2">not yet joined, <Link href="#" to="/">sign up</Link></Typography>
                        </Box>
                    </form>  
                </Box>
    
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user }
  }
  
export default connect(mapStateToProps)(withSnackbar(Login));
