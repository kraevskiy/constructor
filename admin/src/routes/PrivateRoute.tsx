import React, { Suspense } from 'react';
import { RoutesProps } from './routeProps';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { routes } from './routes';
import { logout } from '../redux/user/userActions';

const PrivateRoute = (
	{
		component: Component,
		...rest
	}: RoutesProps
): JSX.Element => {
	const {isLoggedIn} = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	return (
		<Route {...rest} render={props => (
			isLoggedIn
				? <Suspense fallback={<p>loading</p>}><div onClick={()=>dispatch(logout())}>asdasd</div> <Component {...props}/> </Suspense>
				: <Redirect to={routes.login}/>
		)}/>
	);
};

export default PrivateRoute;
