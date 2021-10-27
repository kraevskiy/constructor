import { en, ru } from './../../public/static/images/flags';
import { arrow } from './../../public/static/images/icons/';
import cls from './LanguageSwitcher.module.scss';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { LanguageList } from './LanguageList';

export const LanguageSwitcher = (): JSX.Element => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleClickBtn = () => setIsOpen(!isOpen);

	const i: { [key: string]: StaticImageData } = {
		en, ru
	};

	const handlerClick = (lang: string) => {
		return router.push(router.pathname, router.pathname, {locale: lang});
	};

	return (
		<button
			aria-label="menu"
			className={cn(cls.wrapper, 'switcher', {
				[cls.opened]: isOpen
			})}
			onClick={handleClickBtn}>
			<div className={cls.current}>
				<Image
					src={i[router.locale as string]}
					alt={router.locale}
				/>
				<i><Image
					src={arrow.src}
					width={arrow.width}
					height={arrow.height}
					alt="arrow to button"
				/></i>
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
