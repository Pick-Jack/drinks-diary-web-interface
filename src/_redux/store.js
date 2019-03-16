import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { app } from './reducers/app.reducer'
import { user } from './reducers/user.reducer'
import { messageFlash} from './reducers/message-flash.reducer'

export const store = createStore(
    combineReducers({
        app, 
        user,
        messageFlash
    }),
    {},
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
)