import React from 'react';
import { logout } from '../../../redux/user/userActions';
import { NavLink } from 'react-router-dom';
import { paths } from '../../../routes/paths';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './Header.module.scss';
import { RootState } from '../../../redux/rootReducer';
import { HeaderProps } from './Header.props';
import { LanguageSwitcher } from '../../../components/';
import {logo} from '../../../images';
import { Burger } from '../../../components/Burger/Burger';
import { toggleCatalog, toggleMenu } from '../../../redux/app/appActions';

const Header = ({className, ...props}: HeaderProps): JSX.Element => {
	const {t, i18n} = useTranslation();
	const {user: {isLoggedIn}, app: {isOpenCatalog, isOpenMenu}} = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const handleChangeLanguage = (lang: string) => i18n.changeLanguage(lang);
	const handleShowCatalog = () => dispatch(toggleCatalog());
	const handleShowMenu = () => dispatch(toggleMenu());

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
			className={cn(className, styles.header)}
			{...props}
		>
			<NavLink className={styles.logo} to={paths.index}>
				<img src={logo} alt=""/>
			</NavLink>
			<div className={styles.catalog}>
				<Burger active={isOpenCatalog} onClick={handleShowCatalog}/>
				<span>КАТАЛОГ</span>
			</div>
			<div className={styles.menu}>
				<Burger active={isOpenMenu} onClick={handleShowMenu}/>
				<LanguageSwitcher languages={['en', 'ru']} onClick={handleChangeLanguage}/>
				<nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
					<div className="container-fluid">
						{isLoggedIn ? userLink() : visitorLink()}
						{isLoggedIn &&
            <button className="btn btn-secondary" onClick={() => dispatch(logout())}>{t('logout.button')}</button>}
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
