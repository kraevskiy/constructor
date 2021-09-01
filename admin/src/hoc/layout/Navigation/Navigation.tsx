import React from 'react';
import cn from 'classnames';
import styles from './Navigation.module.scss';
import { NavigationProps } from './Navigation.props';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { NavLink} from 'react-router-dom';
import { paths } from '../../../routes/paths';
import { useTranslation } from 'react-i18next';
import { toggleMenu } from '../../../redux/app/appActions';
import { motion } from 'framer-motion';

const Navigation = ({...props}: NavigationProps): JSX.Element => {
	const {t} = useTranslation();
	const {user: {isLoggedIn}, app: {isOpenMenu}} = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const variants = {
		hidden: { opacity: 0},
		visible: { opacity: 1}
	};

	const userLink = () => {
		return (
			<ul className={styles.list}>
				<li className={styles.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={styles.activeLink} className={styles.link} exact to={paths.index}>{t('page.index')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={styles.activeLink} className={styles.link} to={paths.constructor}>{t('page.constr')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={styles.activeLink} className={styles.link} to={paths.orders}>{t('page.orders')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={styles.activeLink} className={styles.link} to={paths.layouts}>{t('page.layouts')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={styles.activeLink} className={styles.link} to={paths.pages}>{t('page.pages')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={styles.activeLink} className={styles.link} to={paths.profile}>{t('page.profile')}</NavLink>
				</li>
			</ul>
		);
	};

	const visitorLink = () => {
		return (
			<ul className={styles.list}>
				<li className={styles.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={styles.activeLink} className={styles.link} exact to={paths.index}>{t('page.index')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={styles.activeLink} className={styles.link} to={paths.constructor}>{t('page.constr')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={styles.activeLink} className={styles.link} to={paths.login}>{t('page.login')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={styles.activeLink} className={styles.link} to={paths.registration}>{t('page.registration')}</NavLink>
				</li>
			</ul>
		);
	};

	return (
		<motion.div
			variants={variants}
			animate={isOpenMenu ? 'visible' : 'hidden'}
			className={cn(styles.wr, {
				[styles.show]: isOpenMenu
			})}
		>
			<div className={cn(styles.body)}>
				<nav className={styles.nav}>
					{isLoggedIn ? userLink() : visitorLink()}
				</nav>
				<div className={styles.address}>
					<ul className={styles.emailList}>
						<li>
							info@arter.com
						</li>
						<li>
							support@arter.com
						</li>
						<li>
							www.arter.com
						</li>
					</ul>
					<ul>
						<li className={styles.phoneList}>
							+380 093 414 20 16
						</li>
						<li>
							+380 093 414 20 16
						</li>
						<li>
							+380 093 414 20 16
						</li>
					</ul>
				</div>
			</div>
		</motion.div>

	);
};

export default Navigation;
