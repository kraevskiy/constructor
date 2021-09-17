import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import cls from './Home.module.scss';
import { PageResponse } from '../../types/page';
import { Intro, Pictures, Souvenirs, Advantages, Contacts, Faqs } from './parts/';
import Loader from '../../components/Loader/Loader';

const Home = (): JSX.Element => {
	const [{response, isLoading}, doFetch] = useFetch<PageResponse>('/api/page/slag/home');

	useEffect(() => {
		doFetch();
	}, [doFetch]);

	const Body = ({res}: { res: PageResponse }) => (
		<>
			<Intro data={res.slides}/>
			<Souvenirs data={res.souvenirs}/>
			<Pictures data={res.pictures}/>
			<Advantages data={res.advantages}/>
			<Contacts data={res.contacts}/>
			<Faqs data={res.faqs}/>
		</>
	);

	return (
		<div className={cls.home}>
			{isLoading && <Loader/>}
			{response && !isLoading && <Body res={response}/>}
		</div>
	);
};

export default Home;
