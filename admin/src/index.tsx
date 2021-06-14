import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { compose, createStore } from 'redux';
import { rootReducer } from './redux/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer, compose(
	composeEnhancers()
));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App/>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
