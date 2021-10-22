import cn from 'classnames';
import { FooterProps } from './Footer.props';
import cls from './Footer.module.scss';
import { logo } from '../../../images';
import { NavLink } from 'react-router-dom';
import { paths } from '../../../routes/paths';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { facebook, instagram, youtube } from './../../../images/icons';

const Footer = ({className, ...props}: FooterProps): JSX.Element => {
	const {t} = useTranslation();
	const {user: {isLoggedIn}, page: {contacts}} = useSelector((state: RootState) => state);

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

	const getPartContacts = (items: typeof contacts['items'], part: 1 | 2 = 1): typeof contacts['items'] => {
		const delimiter = Math.floor(items.length / 2);
		return part === 1
			? items.slice(part - 1, delimiter)
			: items.slice(delimiter, items.length);
	};

	return (
		<div className="container">
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
							{
								contacts?.items && getPartContacts(contacts.items).map((item) =>
									<li key={item._id}>
										<a href={item.link}>
											<img src={item.icon} alt=""/>{item.showLink}
										</a>
									</li>
								)
							}
						</ul>
					</div>
					<div className={cls.phone}>
						<ul>
							{
								contacts?.items && getPartContacts(contacts.items, 2).map((item) =>
									<li key={item._id}>
										<a href={item.link}>
											<img src={item.icon} alt=""/>{item.showLink}
										</a>
									</li>
								)
							}
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
		</div>
	);
};

export default Footer;
