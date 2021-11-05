import PublicRoute from './PublicRoute';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { paths } from './paths';
import {
	NotFound,
	Home,
	ConstructorPage,
	ProfilePage,
	LayoutsPage,
	SettingPage,
	LoginPage,
	OrdersPage,
	RegistrationPage,
	OrderAllPage,
	LayoutsAllPage, CreateOrderPage
} from '../pages';

const Routes = (): JSX.Element => {
	return (
		<>
			<Switch>
				<PublicRoute
					path={paths.index}
					component={Home}
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
					path={paths.orders.index}
					component={OrdersPage}
					exact
				/>
				<PrivateRoute
					path={paths.orders.create}
					component={CreateOrderPage}
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
					path={paths.profile.index}
					component={ProfilePage}
					exact
				/>
				<PrivateRoute
					path={paths.profile.index + '/:slug'}
					component={ProfilePage}
					exact
				/>
				<Route component={NotFound}/>
			</Switch>
		</>
	);
};

export default Routes;
