import { withLayout } from "../HOC/layout/Layout";
import { GetStaticProps } from 'next';
import axios from 'axios';
import { PageInterface } from '../interfaces/HomePropsInterface';
import { API } from '../helpers/api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RegistrationForm } from '../components';

function Registration(): JSX.Element {
	return <RegistrationForm/>;
}

export default withLayout(Registration);

export const getStaticProps: GetStaticProps<RegistrationProps> = async ({ locale }) => {
	const {data: page} = await axios.get<PageInterface>(`${API.host}/${API.pages.home}`);
	return {
		props: {
			...(await serverSideTranslations(locale as string)), page,
		}
	};
};

interface RegistrationProps extends Record<string, unknown>{
	page: PageInterface
}
