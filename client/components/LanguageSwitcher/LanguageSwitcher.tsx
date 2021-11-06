import { en, ru } from './../../public/static/images/flags';
import { Arrow } from './../../public/static/images/icons/';
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
					src={i[router.locale as string].src}
					width={i[router.locale as string].width}
					height={i[router.locale as string].height}
					alt={router.locale}
				/>
				<Arrow />
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
