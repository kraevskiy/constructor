import React, { Suspense } from 'react';
import { RoutesProps } from './routeProps';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { routes } from './routes';

const PublicRoute = (
	{
		component: Component,
		...rest
	}: RoutesProps
): JSX.Element => {
	const {isLoggedIn} = useSelector((state: RootState) => state.user);
	return (
		<Route {...rest} render={props => (
			isLoggedIn
				? <Redirect to={routes.index}/>
				: <Suspense fallback={<p>loading</p>}> <Component {...props}/> </Suspense>
		)}/>
	);
};

export default PublicRoute;
