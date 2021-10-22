import { CreatePageForm, PageHead } from '../../components/';
import useFetch from '../../hooks/useFetch';
import { ICreatePageFormInterface } from '../../components/CreatePageForm/CreatePageForm.interface';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LanguagesTypes } from '../../types/languages';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

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
	const {page, app: {loading}} = useSelector((state: RootState) => state);

	const handleChangeEditLanguage = (e: LanguagesTypes) => setLangField(e);

	const GetHandlerChangeLanguage = () => (
		<>
			{tr.t('lang')}
			<LanguageSwitcher languages={['en', 'ru']} onClick={handleChangeEditLanguage}/>
		</>
	);

	return (
		<SettingPageContext.Provider
			value={{langField, setLangField}}
		>
			<div className="container">
				<PageHead
					paddingTop="small"
					text={<GetHandlerChangeLanguage/>}
				>Setting page </PageHead>
				{(!loading && page.slag.length > 0) && <CreatePageForm defaultData={page}/>}
			</div>
		</SettingPageContext.Provider>
	);
};

export default SettingPage;
