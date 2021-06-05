export class PageModel {
	seo: {
		seoTitle: string;
		seoDescription: string;
		additional?: string
	};
	header: {
		logo: string;
	};
	slides: {
		image: string;
		title: string;
		text: string;
		additional?: string
	}[];
	souvenirs: {
		title: string;
		items:{
			image: string;
			title: string;
		}[],
		additional?: string
	};
	pictures: {
		title: string;
		items: {
			image: string;
			title: string;
		}[],
		additional?: string
	};
	advantages: {
		title: string;
		items: {
			title: string;
			text: string;
			icon: string;
		}[],
		additional?: string
	};
	contacts: {
		title: string;
		items: {
			name: string;
			icon: string;
			link: string;
			showLink: string;
		}[],
		additional?: string
	};
	faqs: {
		title: string;
		items: {
			title: string;
			text: string;
		}[],
		additional?: string
	};
}
