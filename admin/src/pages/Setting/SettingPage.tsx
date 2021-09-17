import { CreatePageForm, PageHead } from '../../components/';
import useFetch from '../../hooks/useFetch';
import { ICreatePageFormInterface } from '../../components/CreatePageForm/CreatePageForm.interface';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import cls from './SettingPage.module.scss';
import { LanguagesTypes } from '../../types/languages';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';

const initialState: {
	langField: LanguagesTypes,
	setLangField: Dispatch<SetStateAction<LanguagesTypes>> | null
} = {
	langField: 'en',
	setLangField: null
};

export const SettingPageContext = createContext(initialState);

const SettingPage = (): JSX.Element => {
	const tr = useTranslation('setting');
	const [langField, setLangField] = useState<LanguagesTypes>(tr.i18n.options.lng as LanguagesTypes);
	const apiUrl = `${process.env.REACT_APP_PAGE}`;
	const [{response, isLoading}, doFetch] = useFetch<ICreatePageFormInterface[]>(apiUrl);

	useEffect(() => {
		doFetch({
			method: 'POST'
		});
	}, [doFetch, langField]);

	const handleChangeEditLanguage = (e: LanguagesTypes) => setLangField(e);

	const GetHandlerChangeLanguage = () => (
		<>
			{tr.t('lang')}
			<LanguageSwitcher languages={['en', 'ru']} onClick={handleChangeEditLanguage}/>
		</>
	);

	// +380 093 414 20 16 +380 093 414 20 16 +380 093 414 20 16 info@arter.com support@arter.com www.arter.com
	return (
		<SettingPageContext.Provider
			value={{langField, setLangField}}
		>
			<div className={cls.wr}>
				<PageHead
					paddingTop="small"
					text={<GetHandlerChangeLanguage/>}
				>Setting page </PageHead>
				{response?.length && !isLoading && <CreatePageForm defaultData={response[0]}/>}
			</div>
		</SettingPageContext.Provider>
	);
};

export default SettingPage;
