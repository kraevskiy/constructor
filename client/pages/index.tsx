import { useRouter } from 'next/router';
import Head from 'next/head';
import { withLayout } from '../HOC/layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { API } from '../helpers/api';
import { PageInterface } from '../interfaces/HomePropsInterface';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import { Advantages, Contacts, Faqs, Intro, Pictures, Souvenirs } from '../components';

function Home({page}: HomeProps): JSX.Element {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>{page.seo.seoTitle[router.locale as string]}</title>
				<meta name="description" content={page.seo.seoTitle[router.locale as string]}/>
				<link rel="icon" href="/favicon.ico"/>
				<meta property="og:title" content={page.seo.seoTitle[router.locale as string]} />
				<meta property="og:description" content={page.seo.seoDescription[router.locale as string]} />
				<meta property="og:type" content="article" />
			</Head>
			<div>
				<Intro lang={router.locale} data={page.slides}/>
				<Souvenirs lang={router.locale} data={page.souvenirs}/>
				<Pictures lang={router.locale} data={page.pictures}/>
				<Advantages lang={router.locale} data={page.advantages}/>
				<Contacts lang={router.locale} data={page.contacts}/>
				<Faqs lang={router.locale} data={page.faqs}/>
			</div>
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
	const {data: page} = await axios.get<PageInterface>(`${API.host}/${API.pages.home}`);
	return {
		props: {
			...(await serverSideTranslations(locale as string)), page,
		}
	};
};

interface HomeProps extends Record<string, unknown>{
	page: PageInterface
}
