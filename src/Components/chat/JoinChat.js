import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { Box, Button, Grid, TextField, Typography, CircularProgress, Paper, AppBar, Toolbar, withStyles } from '@material-ui/core';
import { getProfile } from '../../redux/actions/profile';
import { startChat } from '../../redux/actions/chat';
import './joinChat.scss';

const styles = {
    title: {
      flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    userForm: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10%'
    },
    fieldBox: {
        maxWidth: '530'
    },
    form: {
        display: 'flex',
        flexDirection: 'row'
    },
    chat: {
        marginLeft: '20px'
    },
    titleInput: {
        marginBottom: '15px'
    }
  };
class JoinChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userNameInputed: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        let token = this.props.user.token;
        if(!token) {
            token = localStorage.getItem('token');
        }
        await this.props.dispatch(getProfile(token));



    }
    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name, value);
        this.setState({
            [name]: value,
            [name + 'Inputed']: true
        })
    }
    async handleSubmit(e) {
        e.preventDefault();
        const { userName } = this.state;
        let token = this.props.user.token;
        if(!token) {
            token = localStorage.getItem('token');
        }
        if(!this.props.chat.loading && userName.trim().length > 0) {
        await this.props.dispatch(startChat(token, this.state.userName))
        if(this.props.chat.error) {
            this.props.enqueueSnackbar(this.props.chat.error, { 
                variant: 'error', 
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
        } else {
            this.props.history.push({
                pathname: '/template',
                search: `?userName=${this.props.chat.userName}`,
            })
        }
    }

    }
    render() {
        const { classes, user, chat } = this.props;
        const { userName, userNameInputed } = this.state;
        console.log(this.state);
        return (
            <div id="wrapper">
                <Grid container className={classes.container}>
                    <Box >
                        <AppBar position="static">
                            <Toolbar>
                                <Typography className={classes.title} variant="h6">
                                {user.userName}
                                </Typography>
                                <Button color="inherit">Log out</Button>
                                </Toolbar>
                        </AppBar>
                    </Box>
                    <Box className={classes.userForm}>
                        <Paper elevation={6} className={classes.fieldBox}>
                            <Box paddingTop={11}  paddingRight={11}  paddingBottom={11} paddingLeft={5} >
                                <Typography variant="h5" className={classes.titleInput}>Start chatting</Typography>
                                <Box className={classes.form}>
                                   <TextField
                                    id="standard-basic"
                                    label="Username"
                                    name="userName"
                                    error={userName.trim().length < 1 && userNameInputed}
                                    helperText={(userName.trim().length < 1 && userNameInputed) && 'username is required'}
                                    value={this.state.userName}
                                    onChange={this.handleChange}
                                    required className={classes.username}
                                /> 
                                <Button variant="contained" onClick={this.handleSubmit} className={classes.chat}>{chat.loading ? <CircularProgress size={30} disableShrink /> : 'Chat'}</Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>

                </Grid>
            </div>)
    }
}
function mapStateToProps(state) {
    const { user, chat } = state;
    return { user, chat }
  }
export default connect(mapStateToProps)(withRouter(withStyles(styles)(withSnackbar(JoinChat))));
