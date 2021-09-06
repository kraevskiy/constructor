import cn from 'classnames';
import { FooterProps } from './Footer.props';
import cls from './Footer.module.scss';
import { logo } from '../../../images';
import { NavLink } from 'react-router-dom';
import { paths } from '../../../routes/paths';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { mail, phone, globe, facebook, instagram, youtube } from './../../../images/icons';

const Footer = ({className, ...props}: FooterProps): JSX.Element => {
	const {t} = useTranslation();
	const {user: {isLoggedIn}} = useSelector((state: RootState) => state);


	const userLink = () => {
		return (
			<ul className={cls.list}>
				<li className={cls.item}>
					<NavLink activeClassName={cls.activeLink} className={cls.link} exact to={paths.index}>{t('page.index')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink activeClassName={cls.activeLink} className={cls.link} to={paths.constructor}>{t('page.constr')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink activeClassName={cls.activeLink} className={cls.link} to={paths.orders}>{t('page.orders')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink activeClassName={cls.activeLink} className={cls.link} to={paths.layouts}>{t('page.layouts')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink activeClassName={cls.activeLink} className={cls.link} to={paths.setting}>{t('page.pages')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink activeClassName={cls.activeLink} className={cls.link} to={paths.profile.index}>{t('page.profile')}</NavLink>
				</li>
			</ul>
		);
	};

	const visitorLink = () => {
		return (
			<ul className={cls.list}>
				<li className={cls.item}>
					<NavLink activeClassName={cls.activeLink} className={cls.link} exact to={paths.index}>{t('page.index')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink activeClassName={cls.activeLink} className={cls.link} to={paths.constructor}>{t('page.constr')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink activeClassName={cls.activeLink} className={cls.link} to={paths.login}>{t('page.login')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink activeClassName={cls.activeLink} className={cls.link} to={paths.registration}>{t('page.registration')}</NavLink>
				</li>
			</ul>
		);
	};


	return (
		<footer
			className={cn(className, cls.footer)}
			{...props}
		>
			<div className={cls.top}>
				<div className={cls.info}>
					<NavLink to="/">
						<img src={logo} alt=""/>
					</NavLink>
					<div className={cls.text}>
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
						Cum
						sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
					</div>
				</div>
				<span/>
				<div className={cls.nav}>
					{isLoggedIn ? userLink() : visitorLink()}
				</div>
				<div className={cls.email}>
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
				<div className={cls.phone}>
					<ul>
						<li className={cls.phoneList}>
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
			<div className={cls.bottom}>
				<div className={cls.copyright}>
					Copyright © 2021 Arter Все права защищены.
				</div>
				<ul className={cls.socials}>
					<li>
						<a target="_blank" href="/">
							<img src={instagram} alt=""/>
						</a>
					</li>
					<li>
						<a target="_blank" href="/">
							<img src={facebook} alt=""/>
						</a>
					</li>
					<li>
						<a target="_blank" href="/">
							<img src={youtube} alt=""/>
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
