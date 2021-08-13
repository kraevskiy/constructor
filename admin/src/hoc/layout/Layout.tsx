import { LayoutProp } from './Layout.prop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Layout.module.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';



const Layout = ({children}: LayoutProp): JSX.Element => {

	return (
		<div className={styles.wrapper}>
			<Header className={styles.header}/>
			<main className={styles.body}>
				{children}
			</main>
			<ToastContainer/>
			<Footer className={styles.footer}/>
		</div>
	);
};

export default Layout;
