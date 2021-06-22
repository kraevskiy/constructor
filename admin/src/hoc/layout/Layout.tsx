import React from 'react';
import { LayoutProp } from './Layout.prop';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes/paths';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { logout } from '../../redux/actions';
import { useTranslation } from 'react-i18next';

const Layout = ({children}: LayoutProp): JSX.Element => {
	const {t, i18n} = useTranslation();
	const {isLoggedIn} = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	return (
		<div className="container">
			<nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
				<div className="container-fluid">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" exact to={paths.index}>{t('page.index')}</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.constructor}>{t('page.constr')}</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.login}>{t('page.login')}</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.orders}>{t('page.orders')}</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.layouts}>{t('page.layouts')}</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.pages}>{t('page.pages')}</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={paths.profile}>{t('page.profile')}</NavLink>
						</li>
					</ul>
					<div className="me-3">
						<select className="form-select" onChange={(e) => i18n.changeLanguage(e.target.value)}>
							<option value="en">En</option>
							<option value="ru">Ru</option>
						</select>
					</div>
					{isLoggedIn && <button className="btn btn-secondary" onClick={() => dispatch(logout())}>{t('logout.button')}</button>}
				</div>
			</nav>
			{children}
			<ToastContainer/>
		</div>
	);
};

export default Layout;
