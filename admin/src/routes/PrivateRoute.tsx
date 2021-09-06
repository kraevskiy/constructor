import { Suspense } from 'react';
import { RoutesProps } from './routeProps';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { paths } from './paths';
import Loader from '../components/Loader/Loader';

const PrivateRoute = (
	{
		component: Component,
		role: roleProps,
		...rest
	}: RoutesProps
): JSX.Element => {
	const {isLoggedIn, role} = useSelector((state: RootState) => state.user);
	const protectRole = roleProps ? roleProps === role : true;
	return (
		<Route {...rest} render={props => (
			isLoggedIn
				? (
					protectRole
						? (
							<Suspense fallback={<Loader/>}>
								<Component {...props}/>
							</Suspense>
						)
						: <Redirect to={paths.index}/>
				)
				: <Redirect to={paths.login}/>
		)}/>
	);
};

export default PrivateRoute;
