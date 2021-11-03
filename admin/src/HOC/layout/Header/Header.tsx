import { NavLink } from "react-router-dom";
import { paths } from "../../../routes/paths";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import cls from "./Header.module.scss";
import { RootState } from "../../../redux/rootReducer";
import { HeaderProps } from "./Header.props";
import { LanguageSwitcher, Burger } from "../../../components/";
import { logo } from "../../../images";
import { logout as logoutIcon } from "../../../images/icons";
import download from "downloadjs";
import {
  clearOrders,
  clearLayouts,
  toggleMenu,
  logout,
  clearAllLayouts,
  createLayout,
} from "../../../redux/actions";

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const { i18n, t } = useTranslation();
  const {
    user: { isLoggedIn },
    app: { isOpenMenu, showDownloadBtn },
    editor: { instance },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleChangeLanguage = (lang: string) => {
    localStorage.setItem("userLanguage", lang);
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

  return (
    <header className={cn("grid", cls.header, className)} {...props}>
      <NavLink className={cls.logo} to={paths.index}>
        <img src={logo} alt="" />
      </NavLink>
      {/*<div className={cls.catalog}>*/}
      {/*	<Burger active={isOpenCatalog} onClick={handleShowCatalog}/>*/}
      {/*	<span>КАТАЛОГ</span>*/}
      {/*</div>*/}
      <div className={cls.menu}>
        <Burger active={isOpenMenu} onClick={handleShowMenu} />
        {isLoggedIn && (
          <button
            className="btn btn-icon"
            onClick={() => {
              dispatch(logout());
              dispatch(clearOrders());
              dispatch(clearLayouts());
              dispatch(clearAllLayouts());
            }}
          >
            <img src={logoutIcon} alt="" />
          </button>
        )}
        {isLoggedIn && showDownloadBtn && (
          <button className="btn" onClick={() =>  dispatch(createLayout())}>
            {t("constructor.save")}
          </button>
        )}
        {isLoggedIn && showDownloadBtn && (
          <button className="btn second" onClick={() => DownloadCanvas()}>
            {t("constructor.download")}
          </button>
        )}
        <LanguageSwitcher
          languages={["en", "ru"]}
          onClick={handleChangeLanguage}
        />
      </div>
    </header>
  );
};

export default Header;
