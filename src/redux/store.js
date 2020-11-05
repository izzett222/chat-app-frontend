import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

export default createStore(combineReducers(reducer), composeWithDevTools(applyMiddleware(logger, thunk)));
