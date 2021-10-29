import { useRouter } from 'next/router';
import { withLayout } from '../HOC/layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { API } from '../helpers/api';
import { PageInterface } from '../interfaces/HomePropsInterface';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Advantages, Contacts, Faqs, Intro, MetaHead, Pictures, Souvenirs } from '../components';

function Home({page}: HomeProps): JSX.Element {
	const router = useRouter();
	return (
		<>
			<MetaHead
				title={page.seo.seoTitle[router.locale as string]}
				description={page.seo.seoDescription[router.locale as string]}
			/>
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
