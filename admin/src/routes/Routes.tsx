import { Suspense } from 'react';
import PublicRoute from './PublicRoute';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { paths } from './paths';
import { ConstructorPage, ProfilePage, LayoutsPage, SettingPage, LoginPage, OrdersPage, RegistrationPage, OrderAllPage, LayoutsAllPage } from '../pages';

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
					path={paths.layout}
					component={LayoutsPage}
					exact
				/>
				<PrivateRoute
					path={paths.setting}
					component={SettingPage}
					role={'admin'}
					exact
				/>
				<PrivateRoute
					path={paths.ordersAll}
					component={OrderAllPage}
					role={'admin'}
					exact
				/>
				<PrivateRoute
					path={paths.layoutsAll}
					component={LayoutsAllPage}
					role={'admin'}
					exact
				/>
				<PrivateRoute
					path={paths.profile}
					component={ProfilePage}
					exact
				/>
				<Redirect to="/"/>
			</Suspense>
		</Switch>
	);
};

export default Routes;
