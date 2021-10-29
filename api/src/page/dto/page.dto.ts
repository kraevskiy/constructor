import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class SeoPageDto {
	@IsObject()
	seoTitle: { [key: string]: string };

	@IsObject()
	seoDescription: { [key: string]: string };

	@IsOptional()
	@IsString()
	additional?: string;
}

export class HeaderPageDto {
	@IsObject()
	seoTitle: { [key: string]: string };

	@IsObject()
	seoDescription: { [key: string]: string };

	@IsOptional()
	@IsString()
	additional?: string;
}

export class SliderPageDto {
	@IsOptional()
	@IsString()
	image?: string;

	@IsOptional()
	@IsObject()
	title?: { [key: string]: string };

	@IsOptional()
	@IsObject()
	text?: { [key: string]: string };

	@IsOptional()
	@IsString()
	additional?: string;
}

export class FaqItemsPageDto {
	@IsOptional()
	@IsObject()
	title?: { [key: string]: string };

	@IsOptional()
	@IsObject()
	text?: { [key: string]: string };
}

export class FaqPageDto {
	@IsObject()
	title: { [key: string]: string };

	@IsArray()
	items: FaqItemsPageDto[];

	@IsOptional()
	@IsString()
	additional?: string;
}

export class ContactsPageItemsDto {
	@IsOptional()
	@IsObject()
	name?: { [key: string]: string };

	@IsOptional()
	@IsString()
	icon?: string;

	@IsOptional()
	@IsString()
	link?: string;

	@IsOptional()
	@IsString()
	showLink?: string;
}

export class ContactsPageDto {
	@IsString()
	title: { [key: string]: string };

	@IsArray()
	items: ContactsPageItemsDto[];

	@IsOptional()
	@IsString()
	additional?: string;
}

export class AdvantagesPageItemsDto {
	@IsOptional()
	@IsObject()
	title?: { [key: string]: string };

	@IsOptional()
	@IsObject()
	text?: { [key: string]: string };

	@IsOptional()
	@IsString()
	icon?: string;
}

export class AdvantagesPageDto {
	@IsObject()
	title: { [key: string]: string };

	@IsArray()
	items: AdvantagesPageItemsDto[];

	@IsOptional()
	@IsString()
	additional?: string;
}

export class PicturesPageItemsDto {
	@IsString()
	image: string;

	@IsObject()
	title: { [key: string]: string };
}

export class PicturesPageDto {
	@IsObject()
	title: { [key: string]: string };

	@IsArray()
	items: PicturesPageItemsDto[];

	@IsOptional()
	@IsString()
	additional?: string;
}

export class SouvenirsPageItemsDto {
	@IsString()
	image: string;

	@IsObject()
	title: { [key: string]: string };
}

export class SouvenirsPageDto {
	@IsObject()
	title: { [key: string]: string };

	@IsArray()
	items: SouvenirsPageItemsDto[];

	@IsOptional()
	@IsString()
	additional?: string;
}

export class PageDto {
	@IsOptional()
	@IsString()
	slag: string;

	@IsOptional()
	@IsObject()
	seo?: SeoPageDto;

	@IsOptional()
	@IsObject()
	header?: HeaderPageDto;

	@IsOptional()
	@IsArray()
	slides?: SliderPageDto[];

	@IsOptional()
	@IsObject()
	souvenirs?: SouvenirsPageDto;

	@IsOptional()
	@IsObject()
	pictures?: PicturesPageDto;

	@IsOptional()
	@IsObject()
	advantages?: AdvantagesPageDto;

	@IsOptional()
	@IsObject()
	contacts?: ContactsPageDto;

	@IsOptional()
	@IsObject()
	faqs?: FaqPageDto;
}
