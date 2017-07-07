import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import sagas from './sagas';
import auth from './auth';
import images from './images';

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
  form: formReducer,
  auth,
  images,
}), applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(sagas);

export default store;
