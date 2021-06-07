import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class SeoPageDto {
	@IsString()
	seoTitle: string;

	@IsString()
	seoDescription: string;

	@IsOptional()
	@IsString()
	additional?: string;
}

export class HeaderPageDto {
	@IsString()
	seoTitle: string;

	@IsString()
	seoDescription: string;

	@IsOptional()
	@IsString()
	additional?: string;
}

export class SliderPageDto {
	@IsOptional()
	@IsString()
	image?: string;

	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	text?: string;

	@IsOptional()
	@IsString()
	additional?: string;
}

export class FaqItemsPageDto {
	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	text?: string;
}

export class FaqPageDto {
	@IsString()
	title: string;

	@IsArray()
	items: FaqItemsPageDto[];

	@IsOptional()
	@IsString()
	additional?: string;
}

export class ContactsPageItemsDto {
	@IsOptional()
	@IsString()
	name?: string;

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
	title: string;

	@IsArray()
	items: ContactsPageItemsDto[];

	@IsOptional()
	@IsString()
	additional?: string;
}

export class AdvantagesPageItemsDto {
	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	text?: string;

	@IsOptional()
	@IsString()
	icon?: string;
}

export class AdvantagesPageDto {
	@IsString()
	title: string;

	@IsArray()
	items: AdvantagesPageItemsDto[];

	@IsOptional()
	@IsString()
	additional?: string;
}

export class PicturesPageItemsDto {
	@IsString()
	image: string;

	@IsString()
	title: string;
}

export class PicturesPageDto {
	@IsString()
	title: string;

	@IsArray()
	items: PicturesPageItemsDto[];

	@IsOptional()
	@IsString()
	additional?: string;
}

export class SouvenirsPageItemsDto {
	@IsString()
	image: string;

	@IsString()
	title: string;
}

export class SouvenirsPageDto {
	@IsString()
	title: string;

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
