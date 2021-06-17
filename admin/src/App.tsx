import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/layout/Layout';
import { routes } from './routes/routes';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from './redux/redux.types';
import { autoLogin } from './redux/user/userActions';
import { hideLoader, showLoader } from './redux/app/appActions';

const ConstructorPage = lazy(() => import('./pages/constructor'));
const LayoutsPage = lazy(() => import('./pages/layouts'));
const LoginPage = lazy(() => import('./pages/login'));
const OrdersPage = lazy(() => import('./pages/orders'));
const PagesPage = lazy(() => import('./pages/pages'));
const ProfilePage = lazy(() => import('./pages/profile'));


const App = (): JSX.Element => {
	const {app, user: {isLoggedIn, initAutologin}} = useSelector((state: RootState) => state);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, ActionType>>();

	useEffect( ()=>{
		showLoader();
		if(initAutologin) return;
		dispatch(autoLogin());
		hideLoader();
	}, [isLoggedIn, initAutologin]);

	return (
		<Layout>
			{app.loading && <p>loading</p>}
			{initAutologin && <>
        <Switch>
          <Suspense fallback={<div>loading</div>}>
            <PublicRoute
              path={routes.index}
              component={ConstructorPage}
              exact
            />
						<Route path={routes.constructor} component={ConstructorPage} exact/>
            <PublicRoute
              path={routes.login}
              component={LoginPage}
              exact
            />
            <PrivateRoute
              path={routes.orders}
              component={OrdersPage}
              exact
            />
            <PrivateRoute
              path={routes.layouts}
              component={LayoutsPage}
              exact
            />
            <PrivateRoute
              path={routes.pages}
              component={PagesPage}
              exact
            />
            <PrivateRoute
              path={routes.profile}
              component={ProfilePage}
              exact
            />
          </Suspense>
        </Switch>
			</>}
		</Layout>
	);
};

export default App;
