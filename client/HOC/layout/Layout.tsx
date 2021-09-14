import { FunctionComponent } from 'react';
import { LayoutProps } from './Layout.props';

const Layout = (props: LayoutProps):JSX.Element => {
	return (
		<>
			{props.children}
		</>
	);
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props}/>
			</Layout>
		);
	};
};
