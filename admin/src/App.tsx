import React, { lazy, Suspense, useEffect } from 'react';
import Layout from './hoc/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from './redux/redux.types';
import { autoLogin } from './redux/user/userActions';
import { hideLoader, showLoader } from './redux/app/appActions';

const Routes = lazy(() => import('./routes/Routes'));

const App = (): JSX.Element => {
	const {app, user: {isLoggedIn, initAutologin}} = useSelector((state: RootState) => state);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, ActionType>>();

	useEffect(() => {
		showLoader();
		if (initAutologin) return;
		dispatch(autoLogin());
		hideLoader();
	}, [isLoggedIn, initAutologin]);

	return (
		<Layout>
			{app.loading && <p>loading</p>}
			{initAutologin &&
      <Suspense fallback={<p>loading</p>}>
        <Routes/>
      </Suspense>
			}
		</Layout>
	);
};

export default App;
