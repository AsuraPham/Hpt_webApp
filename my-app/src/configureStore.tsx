import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './root';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore(history: any) {
    const store = createStore(
        rootReducer,
        // initState,
        composeWithDevTools(
            applyMiddleware(
                epicMiddleware,
                routerMiddleware(history))
        )
    );

    return store;
}