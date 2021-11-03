import cls from './Home.module.scss';
import { PageResponse } from '../../types/page';
import { Intro, Pictures, Souvenirs, Advantages, Contacts, Faqs, Others } from './parts/';
import Loader from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

const Home = (): JSX.Element => {
	const {i18n} = useTranslation();
	const {page, app: {loading}} = useSelector((state: RootState) => state);

	const Body = ({res}: { res: PageResponse }) => (
		<>
			<Intro lang={i18n.language} data={res.slides}/>
			<Souvenirs lang={i18n.language} data={res.souvenirs}/>
			<Pictures lang={i18n.language} data={res.pictures}/>
			<Others lang={i18n.language} data={res.others}/>
			<Advantages lang={i18n.language} data={res.advantages}/>
			<Contacts lang={i18n.language} data={res.contacts}/>
			<Faqs lang={i18n.language} data={res.faqs}/>
		</>
	);


	return (
		<div className={cls.home}>
			{loading && <Loader/>}
			{(!loading && page.slag.length > 0) && <Body res={page}/>}
		</div>
	);
};

export default Home;
