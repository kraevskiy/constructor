import React from 'react';
import { RoutesProps } from './routeProps';
import { Route } from 'react-router-dom';

const PrivateRoute = (
	{
		component: Component,
		...rest
	}: RoutesProps
): JSX.Element => {

	return (
		<Route {...rest} render={props => (
			<Component {...props}/>
		)}/>
	);
};

export default PrivateRoute;
