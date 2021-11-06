import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { createContext, ReactNode, useState } from 'react';
import { PageInterface } from '../interfaces/HomePropsInterface';

export interface IAppContext {
	isShowNavigation: boolean;
	isShowFooter: boolean;
	page: PageInterface;
	toggleNavigation?: () => void;
	toggleFooter?: () => void;
	setPage?: Dispatch<SetStateAction<PageInterface>>;
}

const initialState: IAppContext = {
	isShowNavigation: false,
	isShowFooter: true,
	page: {
		_id: '',
		slag: '',
		seo: {
			seoTitle: {
				ru: ''
			},
			seoDescription: {
				ru: ''
			},
		},
		header: {
			seoTitle: {
				ru: ''
			},
			seoDescription: {
				ru: ''
			},
		},
		slides: [],
		souvenirs: {
			title: {
				ru: ''
			},
			items: []
		},
		pictures: {
			title: {
				ru: ''
			},
			items: []
		},
		advantages: {
			title: {
				ru: ''
			},
			items: []
		},
		contacts: {
			title: {
				ru: ''
			},
			items: []
		},
		faqs: {
			title: {
				ru: ''
			},
			items: []
		},
		others:{
			title: {
				ru: ''
			},
			items: []
		}
	}
};

export const AppContext = createContext<IAppContext>(initialState);

export const AppContextProvider = ({
	isShowNavigation,
	isShowFooter,
	page: pageProps,
	children
}: IAppContext & { children: ReactNode }): JSX.Element => {
	const [navigation, setNavigation] = useState<boolean>(isShowNavigation);
	const [footer, setFooter] = useState<boolean>(isShowFooter);
	const [page, setPage] = useState<PageInterface>(pageProps);

	const toggleNavigation = () => setNavigation(!navigation);
	const toggleFooter = () => setFooter(!footer);
	return <AppContext.Provider
		value={{
			isShowNavigation: navigation,
			isShowFooter: footer,
			toggleNavigation,
			toggleFooter,
			page,
			setPage
		}}
	>
		{children}
	</AppContext.Provider>;
};
