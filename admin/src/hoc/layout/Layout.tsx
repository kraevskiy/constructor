import React from 'react';
import { LayoutProp } from './Layout.prop';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes/paths';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { logout } from '../../redux/user/userActions';

const Layout = ({children}: LayoutProp): JSX.Element => {
	const {isLoggedIn} = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	return (
		<div className="container">
			<nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
				<div className="container-fluid">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" exact to={paths.index}>home</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.constructor}>constructor</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.login}>login</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.orders}>orders</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.layouts}>layouts</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.pages}>pages</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.profile}>profile</NavLink>
						</li>
					</ul>
					{isLoggedIn && <button className="btn btn-secondary" onClick={() => dispatch(logout())}>logout</button>}
				</div>
			</nav>
			{children}
			<ToastContainer/>
		</div>
	);
};

export default Layout;
