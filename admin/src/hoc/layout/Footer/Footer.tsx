import React from 'react';
import { logout } from '../../../redux/user/userActions';
import { NavLink } from 'react-router-dom';
import { paths } from '../../../routes/paths';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { RootState } from '../../../redux/rootReducer';
import { FooterProps } from './Footer.props';

const Footer = ({className, ...props}: FooterProps): JSX.Element => {
	const {t, i18n} = useTranslation();
	const {isLoggedIn} = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	const userLink = () => {
		return (
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				<li className="nav-item">
					<NavLink className="nav-link" exact to={paths.index}>{t('page.index')}</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to={paths.constructor}>{t('page.constr')}</NavLink>
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
		);
	};

	const visitorLink = () => {
		return (
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
					<NavLink className="nav-link" to={paths.registration}>{t('page.registration')}</NavLink>
				</li>
			</ul>
		);
	};

	return (
		<header
			className={cn(className)}
			{...props}
		>
			<nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
				<div className="container-fluid">
					{isLoggedIn ? userLink() : visitorLink()}
					<div className="me-3">
						<select className="form-select" onChange={(e) => i18n.changeLanguage(e.target.value)}>
							<option value="en">En</option>
							<option value="ru">Ru</option>
						</select>
					</div>
					{isLoggedIn &&
          <button className="btn btn-secondary" onClick={() => dispatch(logout())}>{t('logout.button')}</button>}
				</div>
			</nav>
		</header>
	);
};

export default Footer;
