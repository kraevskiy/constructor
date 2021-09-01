import { Suspense } from 'react';
import { RoutesProps } from './routeProps';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { paths } from './paths';

const PublicRoute = (
	{
		component: Component,
		...rest
	}: RoutesProps
): JSX.Element => {
	const {isLoggedIn} = useSelector((state: RootState) => state.user);
	const hideLogged = rest.hideLoggedUser && isLoggedIn;

	return (
		<Route {...rest} render={props => (
			hideLogged
				? <Redirect to={paths.index}/>
				: <Suspense fallback={<p>loading</p>}> <Component {...props}/> </Suspense>
		)}/>
	);
};

export default PublicRoute;
