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

interface FaqItemsPage {
	title?: { [key: string]: string };
	text?: { [key: string]: string };
}

export interface FaqPage {
	title: { [key: string]: string };
	items: FaqItemsPage[];
	additional?: string;
}

interface ContactsPageItems {
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
	image: string;
	title: { [key: string]: string };
}

export interface PicturesPage {
	title: { [key: string]: string };
	items: PicturesPageItems[];
	additional?: string;
}

interface SouvenirsPageItems {
	image: string;
	title: { [key: string]: string };
}

export interface SouvenirsPage {
	title: { [key: string]: string };
	items: SouvenirsPageItems[];
	additional?: string;
}

export interface PageResponse {
	slag: string;
	seo: SeoPage;
	header: HeaderPage;
	slides: SliderPage[];
	souvenirs: SouvenirsPage;
	pictures: PicturesPage;
	advantages: AdvantagesPage;
	contacts: ContactsPage;
	faqs: FaqPage;
}