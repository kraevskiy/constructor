import { useState } from 'react';
import { LanguageSwitcherProps } from './LanguageSwitcher.props';
import { en, ru } from './../../images/flags';
import { arrow } from './../../images/icons/';
import cls from './LanguageSwitcher.module.scss';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { LanguageList } from './LanguageList';

const LanguageSwitcher = ({languages, onClick}: LanguageSwitcherProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const tr = useTranslation();
	const [icon, setIcon] = useState<string | undefined>(tr.i18n.language);
	const handlerClick = (lang: string) => {
		setIcon(lang);
		onClick(lang);
	};

	const i: { [key: string]: string } = {
		'en-US': en, 'ru-RU': ru
	};

	const handleClickBtn = () => setIsOpen(!isOpen);

	return (
		<button
			className={cn(cls.wrapper, 'switcher', {
				[cls.opened]: isOpen
			})}
			onClick={handleClickBtn}>
			<div className={cls.current}>
				<img src={i[icon as string]} alt=""/>
				<i><img src={arrow} alt=""/></i>
			</div>
			{
				isOpen && <LanguageList
          handlerClick={handlerClick}
          setIsOpen={setIsOpen}
          languages={languages}
        />
			}
		</button>
	);
};

export default LanguageSwitcher;
