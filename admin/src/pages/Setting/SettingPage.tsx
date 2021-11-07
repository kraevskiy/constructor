import { CreatePageForm, PageHead } from '../../components/';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { LanguagesTypes } from '../../types/languages';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

const initialState: {
	langField: LanguagesTypes,
	setLangField: Dispatch<SetStateAction<LanguagesTypes>> | null
} = {
	langField: 'en-US',
	setLangField: null
};

export const SettingPageContext = createContext(initialState);

const SettingPage = (): JSX.Element => {
	const tr = useTranslation('setting');
	const [langField, setLangField] = useState<LanguagesTypes>(tr.i18n.language as LanguagesTypes);
	const {page, app: {loading}} = useSelector((state: RootState) => state);

	const handleChangeEditLanguage = (e: LanguagesTypes) => setLangField(e);

	const GetHandlerChangeLanguage = () => (
		<>
			{tr.t('lang')}
			<LanguageSwitcher languages={['en-US', 'ru-RU']} onClick={handleChangeEditLanguage}/>
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
				>{tr.t('title')} </PageHead>
				{(!loading && page.slag.length > 0) && <CreatePageForm defaultData={page}/>}
			</div>
		</SettingPageContext.Provider>
	);
};

export default SettingPage;
