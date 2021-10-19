import { useState, useEffect } from 'react';
import { logout } from '../../../redux/user/userActions';
import { NavLink, useHistory } from 'react-router-dom';
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
import download from "downloadjs";

const Header = ({className, ...props}: HeaderProps): JSX.Element => {
  const history = useHistory();
	const {i18n} = useTranslation();
	const {user: {isLoggedIn}, app: {isOpenMenu}, editor: { instance }} = useSelector((state: RootState) => state);
	const dispatch = useDispatch();
  const [hasDownload, setHasDownload] = useState<boolean>(false);

	const handleChangeLanguage = (lang: string) => {
		localStorage.setItem('userLanguage', lang);
		return i18n.changeLanguage(lang);
	};
	// const handleShowCatalog = () => dispatch(toggleCatalog());
	const handleShowMenu = () => dispatch(toggleMenu());

  const DownloadCanvas = () => {
    if (!instance) return;
    const data = instance.toDataURL();
    if (data) {
      const mimeType = data.split(";")[0];
      const extension = data.split(";")[0].split("/")[1];
      download(data, `image.${extension}`, mimeType);
    }
  };

  history.listen((location) => {
    setHasDownload(location.pathname === paths.constructor);
  });

  useEffect(() => {
    setHasDownload(history.location.pathname === paths.constructor);
  }, [history.location]);

	return (
		<header
			className={cn('grid', cls.header, className)}
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
        {(isLoggedIn && hasDownload) && (
          <button className="btn second" onClick={() => DownloadCanvas()}>
            {/* {t("logout.button")} */}
            {"Download"}
          </button>
        )}
				<LanguageSwitcher languages={['en', 'ru']} onClick={handleChangeLanguage}/>
			</div>
		</header>
	);
};

export default Header;
