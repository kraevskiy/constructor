import { LayoutProp } from './Layout.prop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cn from 'classnames';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navigation from './Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { bg } from '../../images';
import cls from './Layout.module.scss';
import { hideDownloadBtn, hideFooter, showDownloadBtn, showFooter } from '../../redux/app/appActions';
import { paths } from '../../routes/paths';

const Layout = ({children}: LayoutProp): JSX.Element => {
	const {app: {isOpenMenu, showFooter: showFooterState}} = useSelector((state: RootState) => state);
	const {listen, location: {pathname}} = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (pathname.includes(paths.constructor)) {
			dispatch(hideFooter());
			dispatch(showDownloadBtn());
		}
	}, []);

	useEffect(() => {
		return listen((location) => {
			if (location.pathname.includes(paths.constructor)) {
				dispatch(hideFooter());
				dispatch(showDownloadBtn());
			} else {
				dispatch(showFooter());
				dispatch(hideDownloadBtn());
			}
		});
	}, [pathname]);


	return (
		<div className={cn(cls.wrapper, {
			[cls.overflow]: isOpenMenu
		})}>
			<img src={bg} className={cls.bg} alt=""/>
			<Header className={cn(cls.header)}/>
			<Navigation/>
			<main className={cls.body}>
				{children}
			</main>
			<ToastContainer/>
			{
				showFooterState && <Footer className={cn(cls.footer)}/>
			}
		</div>
	);
};

export default Layout;
