import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import cls from './Home.module.scss';
import { PageResponse } from '../../types/page';
import { Intro, Pictures, Souvenirs, Advantages, Contacts, Faqs } from './parts/';
import Loader from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';

const Home = (): JSX.Element => {
	const [{response, isLoading}, doFetch] = useFetch<PageResponse>('/api/page/slag/home');
	const {i18n} = useTranslation();

	useEffect(() => {
		doFetch();
	}, [doFetch, i18n.language]);

	const Body = ({res}: { res: PageResponse }) => (
		<>
			<Intro lang={i18n.language} data={res.slides}/>
			<Souvenirs data={res.souvenirs}/>
			<Pictures data={res.pictures}/>
			<Advantages data={res.advantages}/>
			<Contacts data={res.contacts}/>
			<Faqs data={res.faqs}/>
		</>
	);

	console.log(response);

	return (
		<div className={cls.home}>
			{isLoading && <Loader/>}
			{response && Object.keys(response).length && !isLoading && <Body res={response}/>}
		</div>
	);
};

export default Home;
