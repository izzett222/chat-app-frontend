import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={1}>
           <App /> 
        </SnackbarProvider>
        
    </Provider>
    ,
    document.getElementById('root')
);
