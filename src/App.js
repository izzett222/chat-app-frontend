import React from 'react';
import {
    BrowserRouter as Router,
  } from "react-router-dom"; 
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from './redux/store';
import Routes from './Components/Routes';
import './message.scss'

const App = () => {
    return (
    <Provider store={store}>
        <Router>
            <SnackbarProvider maxSnack={1}>
                <Routes /> 
            </SnackbarProvider>
        </Router>
    </Provider>
    )
};

export default App;
