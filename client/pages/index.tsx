import { useRouter } from 'next/router';
import { withLayout } from '../HOC/layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { API } from '../helpers/api';
import { PageInterface } from '../interfaces/HomePropsInterface';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Advantages, Contacts, Faqs, Intro, MetaHead, Pictures, Souvenirs, Others } from '../components';
import { getCurrentLocale } from '../helpers/getCurrentLocale';

function Home({page}: HomeProps): JSX.Element {
	const router = useRouter();
	console.log(router);
	return (
		<>
			<MetaHead
				title={page.seo.seoTitle[getCurrentLocale(router.locale)]}
				description={page.seo.seoDescription[getCurrentLocale(router.locale)]}
			/>
			<div>
				<Intro lang={getCurrentLocale(router.locale)} data={page.slides}/>
				<Souvenirs lang={getCurrentLocale(router.locale)} data={page.souvenirs}/>
				<Pictures lang={getCurrentLocale(router.locale)} data={page.pictures}/>
				<Others lang={getCurrentLocale(router.locale)} data={page.others}/>
				<Advantages lang={getCurrentLocale(router.locale)} data={page.advantages}/>
				<Contacts lang={getCurrentLocale(router.locale)} data={page.contacts}/>
				<Faqs lang={getCurrentLocale(router.locale)} data={page.faqs}/>
			</div>
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async ({locale}) => {
	const {data: page} = await axios.get<PageInterface>(`${API.host}/${API.pages.home}`);
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])), page,
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	page: PageInterface
}
