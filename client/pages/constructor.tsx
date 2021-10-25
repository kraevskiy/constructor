import { withLayout } from "../HOC/layout/Layout";
import { GetStaticProps } from 'next';
import axios from 'axios';
import { PageInterface } from '../interfaces/HomePropsInterface';
import { API } from '../helpers/api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Constructor(): JSX.Element {
	return (
		<>
			constructor
		</>
	);
}

export default withLayout(Constructor);

export const getStaticProps: GetStaticProps<ConstructorProps> = async ({ locale }) => {
	const {data: page} = await axios.get<PageInterface>(`${API.host}/${API.pages.home}`);
	return {
		props: {
			...(await serverSideTranslations(locale as string)), page,
		}
	};
};

interface ConstructorProps extends Record<string, unknown>{
	page: PageInterface
}
