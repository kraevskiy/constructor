import { LayoutProp } from './Layout.prop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cls from './Layout.module.scss';
import cn from 'classnames';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navigation from './Navigation/Navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { bg } from '../../images';

const Layout = ({children}: LayoutProp): JSX.Element => {
	const {app: {isOpenMenu}} = useSelector((state: RootState) => state);

	return (
		<div className={cn(cls.wrapper, {
			[cls.overflow]: isOpenMenu
		})}>
			<img src={bg} className={cls.bg} alt=""/>
			<Header className={cn(cls.container, cls.header)}/>
			<Navigation/>
			<main className={cls.body}>
				{children}
			</main>
			<ToastContainer/>
			<Footer className={cn(cls.container, cls.footer)}/>
		</div>
	);
};

export default Layout;
