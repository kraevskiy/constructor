export interface SeoPage {
	seoTitle: string;
	seoDescription: string;
	additional?: string;
}

export interface HeaderPage {
	seoTitle: string;
	seoDescription: string;
	additional?: string;
}

export interface SliderPage {
	image?: string;
	title?: string;
	text?: string;
	additional?: string;
}

export interface FaqItemsPage {
	title?: string;
	text?: string;
}

export interface FaqPage {
	title: string;
	items: FaqItemsPage[];
	additional?: string;
}

export interface ContactsPageItems {
	name?: string;
	icon?: string;
	link?: string;
	showLink?: string;
}

export interface ContactsPage {
	title: string;
	items: ContactsPageItems[];
	additional?: string;
}

export interface AdvantagesPageItems {
	title?: string;
	text?: string;
	icon?: string;
}

export interface AdvantagesPage {
	title: string;
	items: AdvantagesPageItems[];
	additional?: string;
}

export interface PicturesPageItems {
	image: string;
	title: string;
}

export interface PicturesPage {
	title: string;
	items: PicturesPageItems[];
	additional?: string;
}

export interface SouvenirsPageItems {
	image: string;
	title: string;
}

export interface SouvenirsPage {
	title: string;
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
	advantages?: AdvantagesPage;
	contacts?: ContactsPage;
	faqs?: FaqPage;
}

