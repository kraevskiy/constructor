import React from 'react';
import { LayoutProp } from './Layout.prop';
import {NavLink} from 'react-router-dom';
import { routes } from '../../routes/routes';

const Layout = ({children}: LayoutProp):JSX.Element => {

	return (
		<>
			<NavLink to={routes.index}>home</NavLink>
			<NavLink to={routes.constructor}>constructor</NavLink>
			<NavLink to={routes.login}>login</NavLink>
			<NavLink to={routes.orders}>orders</NavLink>
			<NavLink to={routes.layouts}>layouts</NavLink>
			<NavLink to={routes.pages}>pages</NavLink>
			<NavLink to={routes.profile}>profile</NavLink>
			{children}
		</>
	);
};

export default Layout;
