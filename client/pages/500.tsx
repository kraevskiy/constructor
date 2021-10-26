import { withLayout } from '../HOC/layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { PageInterface } from '../interfaces/HomePropsInterface';
import { API } from '../helpers/api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MetaHead } from '../components';


export function Error500(): JSX.Element {
	return (
		<>
			<MetaHead
				title="Page not found"
				description="Page not found description"
			/>
			Ошибка 505
		</>
	);
}

export default withLayout(Error500);

export const getStaticProps: GetStaticProps<ErrorPageProps> = async ({locale}) => {
	const {data: page} = await axios.get<PageInterface>(`${API.host}/${API.pages.home}`);
	return {
		props: {
			...(await serverSideTranslations(locale as string)), page,
		}
	};
};

interface ErrorPageProps extends Record<string, unknown> {
	page: PageInterface
}
