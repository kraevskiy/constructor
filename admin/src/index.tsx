import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './redux/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import i18n from './i18n';
import thunk from 'redux-thunk';
import './styles/index.scss';
// import reportWebVitals from './reportWebVitals';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

import { Loader } from './components/';
import { I18nextProvider } from 'react-i18next';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, compose(
	applyMiddleware(
		thunk
	),
	composeEnhancers()
));

ReactDOM.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<Suspense fallback={<Loader/>}>
				<Provider store={store}>
					<Router>
						<App/>
					</Router>
				</Provider>
			</Suspense>
		</I18nextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
