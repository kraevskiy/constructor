import React from 'react';
import cn from 'classnames';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.scss';
import { logo } from '../../../images';
import { NavLink } from 'react-router-dom';
import { paths } from '../../../routes/paths';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import {mail, phone, globe} from './../../../images/icons';

const Footer = ({className, ...props}: FooterProps): JSX.Element => {
	const {t} = useTranslation();
	const {user: {isLoggedIn}} = useSelector((state: RootState) => state);


	const userLink = () => {
		return (
			<ul className={styles.list}>
				<li className={styles.item}>
					<NavLink activeClassName={styles.activeLink} className={styles.link} exact to={paths.index}>{t('page.index')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink activeClassName={styles.activeLink} className={styles.link} to={paths.constructor}>{t('page.constr')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink activeClassName={styles.activeLink} className={styles.link} to={paths.orders}>{t('page.orders')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink activeClassName={styles.activeLink} className={styles.link} to={paths.layouts}>{t('page.layouts')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink activeClassName={styles.activeLink} className={styles.link} to={paths.pages}>{t('page.pages')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink activeClassName={styles.activeLink} className={styles.link} to={paths.profile}>{t('page.profile')}</NavLink>
				</li>
			</ul>
		);
	};

	const visitorLink = () => {
		return (
			<ul className={styles.list}>
				<li className={styles.item}>
					<NavLink activeClassName={styles.activeLink} className={styles.link} exact to={paths.index}>{t('page.index')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink activeClassName={styles.activeLink} className={styles.link} to={paths.constructor}>{t('page.constr')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink activeClassName={styles.activeLink} className={styles.link} to={paths.login}>{t('page.login')}</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink activeClassName={styles.activeLink} className={styles.link} to={paths.registration}>{t('page.registration')}</NavLink>
				</li>
			</ul>
		);
	};


	return (
		<footer
			className={cn(className, styles.footer)}
			{...props}
		>
			<div className={styles.top}>
				<div className={styles.info}>
					<NavLink to="/">
						<img src={logo} alt=""/>
					</NavLink>
					<div className={styles.text}>
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
						Cum
						sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
					</div>
				</div>
				<span/>
				<div className={styles.nav}>
					{isLoggedIn ? userLink() : visitorLink()}
				</div>
				<div className={styles.email}>
					<ul>
						<li>
							<img src={mail} alt=""/>info@arter.com
						</li>
						<li>
							<img src={mail} alt=""/>support@arter.com
						</li>
						<li>
							<img src={globe} alt=""/>www.arter.com
						</li>
					</ul>
				</div>
				<div className={styles.phone}>
					<ul>
						<li className={styles.phoneList}>
							<img src={phone} alt=""/> +380 093 414 20 16
						</li>
						<li>
							<img src={phone} alt=""/> +380 093 414 20 16
						</li>
						<li>
							<img src={phone} alt=""/> +380 093 414 20 16
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.bottom}>
			</div>
		</footer>
	);
};

export default Footer;
