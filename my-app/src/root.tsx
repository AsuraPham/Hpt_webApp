import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import { reducer as toastrReducer } from 'react-redux-toastr';

export interface State {
}

export const rootEpic = (action$: any, store?: any) => combineEpics(
)(action$, store,).catch((error: any, stream: any) => {
  // tslint:disable-next-line:no-console
  console.error('Uncaught', error.stack);
  return stream;
});

export const rootReducer = combineReducers<State>({
  routing: routerReducer,
  toastr: toastrReducer
});