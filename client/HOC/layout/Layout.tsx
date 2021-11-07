import { FunctionComponent, useContext } from 'react';
import { LayoutProps } from './Layout.props';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navigation from './Navigation/Navigation';
import { AppContext, AppContextProvider, IAppContext } from '../../context/app.context';
import Image from 'next/image';
import cls from './Layout.module.scss';
import cn from 'classnames';
import { paths } from '../../helpers/paths';
import { API } from '../../helpers/api';
import { bg } from '../../public/static/images';
import { text } from '../../public/static/images/icons';

const Layout = ({children}: LayoutProps): JSX.Element => {
	const context = useContext(AppContext);
	return (
		<div className={cn(cls.wrapper, {
			[cls.overflow]: context.isShowNavigation
		})}>
			<div className={cls.bg}>
				<Image
					src={bg.src}
					layout="responsive"
					width={bg.width}
					alt="image"
					height={bg.height}
				/>
			</div>
			<Header/>
			<Navigation/>
			<main>
				{children}
			</main>

			<Footer/>
			<a href={`${API.admin}${paths.constructor}`} className={cls.linkToConstructor}>
				<Image
					src={text.src}
					// layout="responsive"
					width={41}
					alt="path to constructor admin"
					height={41}
				/>
			</a>
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
