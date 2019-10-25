import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers, { rootSaga } from '../ducks';
import { composeWithDevTools } from 'redux-devtools-extension';
import sort from './sort';

// create the saga and router middlewares

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const allReducers = {
  ...reducers
};

const store = createStore(
  combineReducers(allReducers),
  { sort },
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
