import { LanguagesTypes } from '../../types/languages';

export interface SeoPage {
	seoTitle: {
		[key in LanguagesTypes]: string;
	};
	seoDescription: {
		[key in LanguagesTypes]: string;
	};
	additional?: string;
}

export interface HeaderPage {
	seoTitle: {
		[key in LanguagesTypes]: string;
	};
	seoDescription: {
		[key in LanguagesTypes]: string;
	};
	additional?: string;
}

export interface SliderPage {
	image?: string;
	title?: {
		[key in LanguagesTypes]: string;
	};
	text?: {
		[key in LanguagesTypes]: string;
	};
	additional?: string;
}

export interface FaqItemsPage {
	title?: {
		[key in LanguagesTypes]: string;
	};
	text?: {
		[key in LanguagesTypes]: string;
	};
}

export interface FaqPage {
	title: {
		[key in LanguagesTypes]: string;
	};
	items: FaqItemsPage[];
	additional?: string;
}

export interface ContactsPageItems {
	name?: {
		[key in LanguagesTypes]: string;
	};
	icon?: string;
	link?: string;
	showLink?: string;
}

export interface ContactsPage {
	title: {
		[key in LanguagesTypes]: string;
	};
	items: ContactsPageItems[];
	additional?: string;
}

export interface AdvantagesPageItems {
	title?: {
		[key in LanguagesTypes]: string;
	};
	text?: {
		[key in LanguagesTypes]: string;
	};
	icon?: string;
}

export interface AdvantagesPage {
	title: {
		[key in LanguagesTypes]: string;
	};
	items: AdvantagesPageItems[];
	additional?: string;
}

export interface PicturesPageItems {
	image: string;
	title: {
		[key in LanguagesTypes]: string;
	};
}

export interface OthersPageItems {
	image: string;
	title: {
		[key in LanguagesTypes]: string;
	};
}

export interface PicturesPage {
	title: {
		[key in LanguagesTypes]: string;
	};
	items: PicturesPageItems[];
	additional?: string;
}

export interface OthersPage {
	title: {
		[key in LanguagesTypes]: string;
	};
	items: OthersPageItems[];
	additional?: string;
}

export interface SouvenirsPageItems {
	image: string;
	title: {
		[key in LanguagesTypes]: string;
	};
}

export interface SouvenirsPage {
	title: {
		[key in LanguagesTypes]: string;
	};
	items: SouvenirsPageItems[];
	additional?: string;
}

export interface ICreatePageFormInterface {
	slag: string;
	seo?: SeoPage;
	header?: HeaderPage;
	slides?: SliderPage[];
	souvenirs?: SouvenirsPage;
	pictures?: PicturesPage;
	others?: OthersPage;
	advantages?: AdvantagesPage;
	contacts?: ContactsPage;
	faqs?: FaqPage;
}

