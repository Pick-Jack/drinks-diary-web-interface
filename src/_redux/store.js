import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { app } from './reducers/app.reducer'
import { user } from './reducers/user.reducer'
import { diary } from './reducers/diary.reducer'
import { messageFlash} from './reducers/message-flash.reducer'


export const store = createStore(
    combineReducers({
        app, 
        user,
        diary,
        messageFlash
    }),
    {},
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
)