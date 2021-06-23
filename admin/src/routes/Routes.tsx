import { Suspense } from 'react';
import PublicRoute from './PublicRoute';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { paths } from './paths';
import { ConstructorPage, ProfilePage, LayoutsPage, PagesPage, LoginPage, OrdersPage, RegistrationPage } from '../pages';

const Routes = (): JSX.Element => {
	return (
		<Switch>
			<Suspense fallback={<div>loading</div>}>
				<PublicRoute
					path={paths.index}
					component={ConstructorPage}
					exact
				/>
				<Route path={paths.constructor} component={ConstructorPage} exact/>
				<PublicRoute
					path={paths.login}
					component={LoginPage}
					hideLoggedUser
					exact
				/>
				<PublicRoute
					path={paths.registration}
					component={RegistrationPage}
					hideLoggedUser
					exact
				/>
				<PrivateRoute
					path={paths.orders}
					component={OrdersPage}
					exact
				/>
				<PrivateRoute
					path={paths.layouts}
					component={LayoutsPage}
					exact
				/>
				<PrivateRoute
					path={paths.pages}
					component={PagesPage}
					role={'admin'}
					exact
				/>
				<PrivateRoute
					path={paths.profile}
					component={ProfilePage}
					exact
				/>
			</Suspense>
		</Switch>
	);
};

export default Routes;
