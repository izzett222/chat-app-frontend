import React from 'react';
import {
    BrowserRouter,
  } from "react-router-dom"; 
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from './redux/store';
import Routes from './Components/Routes';
import './message.scss'

const App = () => {
    return (
    <Provider store={store}>
        <BrowserRouter>
            <SnackbarProvider maxSnack={1}>
                <Routes /> 
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>
    )
};

export default App;
