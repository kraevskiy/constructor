export interface SeoPage {
	seoTitle: { [key: string]: string };
	seoDescription: { [key: string]: string };
	additional?: string;
}

export interface HeaderPage {
	seoTitle: { [key: string]: string };
	seoDescription: { [key: string]: string };
	additional?: string;
}

export interface SliderPage {
	image?: string;
	title?: { [key: string]: string };
	text?: { [key: string]: string };
	additional?: string;
}

export interface FaqItemsPage {
	_id: string;
	title?: { [key: string]: string };
	text?: { [key: string]: string };
}

export interface FaqPage {
	title: { [key: string]: string };
	items: FaqItemsPage[];
	additional?: string;
}

interface ContactsPageItems {
	_id: string;
	name?: { [key: string]: string };
	icon?: string;
	link?: string;
	showLink?: string;
}

export interface ContactsPage {
	title: { [key: string]: string };
	items: ContactsPageItems[];
	additional?: string;
}

interface AdvantagesPageItems {
	_id: string;
	title?: { [key: string]: string };
	text?: { [key: string]: string };
	icon?: string;
}

export interface AdvantagesPage {
	title: { [key: string]: string };
	items: AdvantagesPageItems[];
	additional?: string;
}

interface PicturesPageItems {
	_id: string;
	image: string;
	title: { [key: string]: string };
}

export interface PicturesPage {
	title: { [key: string]: string };
	items: PicturesPageItems[];
	additional?: string;
}

interface SouvenirsPageItems {
	_id: string;
	image: string;
	title: { [key: string]: string };
}

export interface SouvenirsPage {
	title: { [key: string]: string };
	items: SouvenirsPageItems[];
	additional?: string;
}

export interface OthersPage {
	title: { [key: string]: string };
	items: OthersPageItems[];
	additional?: string;
}

interface OthersPageItems {
	_id: string;
	image: string;
	title: { [key: string]: string };
}

export interface PageInterface {
	_id: string;
	slag: string;
	seo: SeoPage;
	header: HeaderPage;
	slides: SliderPage[];
	souvenirs: SouvenirsPage;
	others: OthersPage;
	pictures: PicturesPage;
	advantages: AdvantagesPage;
	contacts: ContactsPage;
	faqs: FaqPage;
}
