import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
 import reducers from '../reducers'; //Import the reducer

const loggerMiddleware = createLogger();

//
// export const store = (process.env.REACT_APP_STAGE === 'development') ? createStore(
// 	reducers,
// 	applyMiddleware(
// 		thunkMiddleware, // thunk middleware that allows simple async use of dispatch
// 		loggerMiddleware // log everything that's been happening in your browser, like actions, requests, errors
// 	)
// ) : createStore(
// 	 reducers,
// 	applyMiddleware(
// 		thunkMiddleware
// 	)
// );

export const store = createStore(
	reducers,
	applyMiddleware(
		thunkMiddleware, // thunk middleware that allows simple async use of dispatch
		loggerMiddleware // log everything that's been happening in your browser, like actions, requests, errors
	)
);
