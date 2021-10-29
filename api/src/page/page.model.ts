import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';


export class FaqItemsPageModel {
	@prop()
	title?: { [key: string]: string };

	@prop()
	text?: { [key: string]: string };
}

export class FaqPageModel {
	@prop()
	title: { [key: string]: string };

	@prop({type: () => [FaqItemsPageModel]})
	items: FaqItemsPageModel[];

	@prop()
	additional?: string;
}

export class ContactsPageItemsModel {
	@prop()
	name?: { [key: string]: string };

	@prop()
	icon?: string;

	@prop()
	link?: string;

	@prop()
	showLink?: string;
}

export class ContactsPageModel {
	@prop()
	title: { [key: string]: string };

	@prop({type: () => [ContactsPageItemsModel]})
	items: ContactsPageItemsModel[];

	@prop()
	additional?: string;
}

export class AdvantagesPageItemsModel {
	@prop()
	title?: { [key: string]: string };

	@prop()
	text?: { [key: string]: string };

	@prop()
	icon?: string;
}

export class AdvantagesPageModel {
	@prop()
	title: { [key: string]: string };

	@prop({type: () => [AdvantagesPageItemsModel]})
	items: AdvantagesPageItemsModel[];

	@prop()
	additional?: string;
}

export class PicturesPageItemsModel {
	@prop()
	image: string;

	@prop()
	title: { [key: string]: string };
}

export class PicturesPageModel {
	@prop()
	title: { [key: string]: string };

	@prop({type: () => [PicturesPageItemsModel]})
	items: PicturesPageItemsModel[];

	@prop()
	additional?: string;
}

export class SouvenirsPageItemsModel {
	@prop()
	image: string;

	@prop()
	title: { [key: string]: string };
}

export class SouvenirsPageModel {
	@prop()
	title: { [key: string]: string };

	@prop({type: () => [SouvenirsPageItemsModel]})
	items: SouvenirsPageItemsModel[];

	@prop()
	additional?: string;
}

export class SeoPageModel {
	@prop()
	seoTitle: { [key: string]: string };

	@prop()
	seoDescription: { [key: string]: string };

	@prop()
	additional?: string;
}

export class HeaderPageModel {
	@prop()
	seoTitle: { [key: string]: string };

	@prop()
	seoDescription: { [key: string]: string };

	@prop()
	additional?: string;
}

export class SliderPageModel {
	@prop()
	image?: string;

	@prop()
	title?: { [key: string]: string };

	@prop()
	text?: { [key: string]: string };

	@prop()
	additional?: string;
}


export interface PageModel extends Base {
}

export class PageModel extends TimeStamps {
	@prop({unique: true})
	slag: string;

	@prop({type: () => SeoPageModel})
	seo?: SeoPageModel;

	@prop({type: () => HeaderPageModel})
	header?: HeaderPageModel;

	@prop({type: () => [SliderPageModel]})
	slides?: SliderPageModel[];

	@prop({type: () => SouvenirsPageModel})
	souvenirs?: SouvenirsPageModel;

	@prop({type: () => PicturesPageModel})
	pictures?: PicturesPageModel;

	@prop({type: () => AdvantagesPageModel})
	advantages?: AdvantagesPageModel;

	@prop({type: () => ContactsPageModel})
	contacts?: ContactsPageModel;

	@prop({type: () => FaqPageModel})
	faqs?: FaqPageModel;
}
