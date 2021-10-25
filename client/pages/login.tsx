import { withLayout } from "../HOC/layout/Layout";
import { GetStaticProps } from 'next';
import axios from 'axios';
import { PageInterface } from '../interfaces/HomePropsInterface';
import { API } from '../helpers/api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LoginForm } from '../components';

function Login(): JSX.Element {
	return <LoginForm/>;
}

export default withLayout(Login);

export const getStaticProps: GetStaticProps<LoginProps> = async ({ locale }) => {
	const {data: page} = await axios.get<PageInterface>(`${API.host}/${API.pages.home}`);
	return {
		props: {
			...(await serverSideTranslations(locale as string)), page,
		}
	};
};

interface LoginProps extends Record<string, unknown>{
	page: PageInterface
}
