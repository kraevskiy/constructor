import { FunctionComponent, useContext } from 'react';
import { LayoutProps } from './Layout.props';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navigation from './Navigation/Navigation';
import { AppContext, AppContextProvider, IAppContext } from '../../context/app.context';
import { bg } from '../../public/static/images';
import cls from './Layout.module.scss';
import cn from 'classnames';

const Layout = ({children}: LayoutProps): JSX.Element => {
	const context = useContext(AppContext);
	return (
		<div className={cn(cls.wrapper, {
			[cls.overflow]: context.isShowNavigation
		})}>
			<img src={bg.src} className={cls.bg} alt=""/>
			<Header/>
			<Navigation />
			<main>
				{children}
			</main>

			<Footer />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider isShowNavigation={props.isShowNavigation} page={props.page} isShowFooter={props.isShowFooter}>
				<Layout>
					<Component {...props}/>
				</Layout>
			</AppContextProvider>
		);
	};
};
