import React from 'react';
import { LayoutProp } from './Layout.prop';
import {NavLink} from 'react-router-dom';
import { paths } from '../../routes/paths';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children}: LayoutProp):JSX.Element => {

	return (
		<>
			<p style={{padding: 10, display: 'inline-block'}}><NavLink to={paths.index}>home</NavLink></p>
			<p style={{padding: 10, display: 'inline-block'}}><NavLink to={paths.constructor}>constructor</NavLink></p>
			<p style={{padding: 10, display: 'inline-block'}}><NavLink to={paths.login}>login</NavLink></p>
			<p style={{padding: 10, display: 'inline-block'}}><NavLink to={paths.orders}>orders</NavLink></p>
			<p style={{padding: 10, display: 'inline-block'}}><NavLink to={paths.layouts}>layouts</NavLink></p>
			<p style={{padding: 10, display: 'inline-block'}}><NavLink to={paths.pages}>pages</NavLink></p>
			<p style={{padding: 10, display: 'inline-block'}}><NavLink to={paths.profile}>profile</NavLink></p>
			{children}
			<ToastContainer />
		</>
	);
};

export default Layout;
