import { FunctionComponent } from 'react';
import { LayoutProps } from './Layout.props';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navigation from './Navigation/Navigation';
import { AppContextProvider, IAppContext } from '../../context/app.context';

const Layout = ({children}: LayoutProps): JSX.Element => {
	return (
		<>
			<Header/>
			<Navigation />
			asdasd
			<main>
				{children}
			</main>

			{/*<Footer />*/}
		</>
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
