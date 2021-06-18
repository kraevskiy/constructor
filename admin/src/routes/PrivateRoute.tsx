import React, { Suspense } from 'react';
import { RoutesProps } from './routeProps';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { paths } from './paths';
import { logout } from '../redux/user/userActions';

const PrivateRoute = (
	{
		component: Component,
		role: roleProps,
		...rest
	}: RoutesProps
): JSX.Element => {
	const {isLoggedIn, user: {role}} = useSelector((state: RootState) => state.user);
	const protectRole = roleProps ? roleProps === role : true;
	const dispatch = useDispatch();
	return (
		<Route {...rest} render={props => (
			isLoggedIn
				? (
					protectRole
						? (
							<Suspense fallback={<p>loading</p>}>
								<div onClick={() => dispatch(logout())}>logout</div>
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
