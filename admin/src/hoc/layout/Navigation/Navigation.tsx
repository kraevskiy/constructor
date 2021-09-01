import cn from 'classnames';
import cls from './Navigation.module.scss';
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
			<ul className={cls.list}>
				<li className={cls.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={cls.activeLink} className={cls.link} exact to={paths.index}>{t('page.index')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={cls.activeLink} className={cls.link} to={paths.constructor}>{t('page.constr')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={cls.activeLink} className={cls.link} to={paths.orders}>{t('page.orders')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={cls.activeLink} className={cls.link} to={paths.layouts}>{t('page.layouts')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={cls.activeLink} className={cls.link} to={paths.pages}>{t('page.pages')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={cls.activeLink} className={cls.link} to={paths.profile}>{t('page.profile')}</NavLink>
				</li>
			</ul>
		);
	};

	const visitorLink = () => {
		return (
			<ul className={cls.list}>
				<li className={cls.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={cls.activeLink} className={cls.link} exact to={paths.index}>{t('page.index')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={cls.activeLink} className={cls.link} to={paths.constructor}>{t('page.constr')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={cls.activeLink} className={cls.link} to={paths.login}>{t('page.login')}</NavLink>
				</li>
				<li className={cls.item}>
					<NavLink onClick={()=>dispatch(toggleMenu())} activeClassName={cls.activeLink} className={cls.link} to={paths.registration}>{t('page.registration')}</NavLink>
				</li>
			</ul>
		);
	};

	return (
		<motion.div
			variants={variants}
			animate={isOpenMenu ? 'visible' : 'hidden'}
			className={cn(cls.wr, {
				[cls.show]: isOpenMenu
			})}
		>
			<div className={cn(cls.body)}>
				<nav className={cls.nav}>
					{isLoggedIn ? userLink() : visitorLink()}
				</nav>
				<div className={cls.address}>
					<ul className={cls.emailList}>
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
						<li className={cls.phoneList}>
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
