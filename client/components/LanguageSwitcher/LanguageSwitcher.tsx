import { LanguageSwitcherProps } from './LanguageSwitcher.props';
import { en, ru } from './../../public/static/images/flags';
import { arrow } from './../../public/static/images/icons/';
import cls from './LanguageSwitcher.module.scss';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { LanguageList } from './LanguageList';

export const LanguageSwitcher = (props: LanguageSwitcherProps): JSX.Element => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleClickBtn = () => setIsOpen(!isOpen);

	const i: { [key: string]: StaticImageData } = {
		en, ru
	};

	const handlerClick = (lang: string) => {
		console.log(lang);
	};

	return (
		<button
			className={cn(cls.wrapper, 'switcher', {
				[cls.opened]: isOpen
			})}
			onClick={handleClickBtn}>
			<div className={cls.current}>
				<Image
					src={i[router.locale as string]}
					alt={router.locale}
				/>
				<i><img src={arrow.src} alt=""/></i>
			</div>
			{
				isOpen && <LanguageList
          handlerClick={handlerClick}
          setIsOpen={setIsOpen}
          languages={router.locales}
        />
			}
		</button>
	);
};
