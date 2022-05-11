// todo:Refactoring with Redux-toolkit
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
// reducers
import { UsersReducer } from '../users/reducers';
import { ProductsReducer } from '../products/reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(history) {
  const logger = createLogger({
    collapsed: true,
    diff: true,
  });
  return createStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      products: ProductsReducer,
    }),
    composeEnhancers(applyMiddleware(logger, routerMiddleware(history), thunk))
  );
}
