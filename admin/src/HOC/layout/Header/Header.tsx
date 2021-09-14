import { logout } from '../../../redux/user/userActions';
import { NavLink } from 'react-router-dom';
import { paths } from '../../../routes/paths';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import cls from './Header.module.scss';
import { RootState } from '../../../redux/rootReducer';
import { HeaderProps } from './Header.props';
import { LanguageSwitcher, Burger } from '../../../components/';
import { logo } from '../../../images';
import { logout as logoutIcon } from '../../../images/icons';
import { toggleMenu } from '../../../redux/app/appActions';

const Header = ({className, ...props}: HeaderProps): JSX.Element => {
	const {i18n} = useTranslation();
	const {user: {isLoggedIn}, app: {isOpenMenu}} = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const handleChangeLanguage = (lang: string) => {
		localStorage.setItem('userLanguage', lang);
		return i18n.changeLanguage(lang);
	};
	// const handleShowCatalog = () => dispatch(toggleCatalog());
	const handleShowMenu = () => dispatch(toggleMenu());

	return (
		<header
			className={cn(className, cls.header)}
			{...props}
		>
			<NavLink className={cls.logo} to={paths.index}>
				<img src={logo} alt=""/>
			</NavLink>
			{/*<div className={cls.catalog}>*/}
			{/*	<Burger active={isOpenCatalog} onClick={handleShowCatalog}/>*/}
			{/*	<span>КАТАЛОГ</span>*/}
			{/*</div>*/}
			<div className={cls.menu}>
				<Burger active={isOpenMenu} onClick={handleShowMenu}/>
				{isLoggedIn &&
        <button className="btn btn-icon" onClick={() => dispatch(logout())}>
          <img src={logoutIcon} alt=""/>
				</button>}
				<LanguageSwitcher languages={['en', 'ru']} onClick={handleChangeLanguage}/>
			</div>
		</header>
	);
};

export default Header;
