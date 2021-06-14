import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import Layout from './hoc/layout/Layout';
import { routes } from './routes/routes';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

const ConstructorPage = lazy(() => import('./pages/constructor'));
const LayoutsPage = lazy(() => import('./pages/layouts'));
const LoginPage = lazy(() => import('./pages/login'));
const OrdersPage = lazy(() => import('./pages/orders'));
const PagesPage = lazy(() => import('./pages/pages'));
const ProfilePage = lazy(() => import('./pages/profile'));


const App = (): JSX.Element => {
	return (
		<Layout>
			<Switch>
				<Suspense fallback={<div>loading</div>}>
					<PublicRoute
						path={routes.index}
						component={ConstructorPage}
						exact
					/>
					<PublicRoute
						path={routes.constructor}
						component={ConstructorPage}
						exact
					/>
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
		</Layout>
	);
};

export default App;
