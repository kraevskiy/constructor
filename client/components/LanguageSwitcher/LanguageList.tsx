import { LanguageListProps } from './LanguageSwitcher.props';
import cn from 'classnames';
import cls from './LanguageSwitcher.module.scss';
import { motion } from 'framer-motion';
import { en, ru } from '../../public/static/images/flags';
import { useEventListener } from '../../hooks/useEventListener';

export const LanguageList = ({languages, handlerClick, setIsOpen}:LanguageListProps): JSX.Element => {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				delayChildren: 0.5
			}
		}
	};
	const i: { [key: string]: StaticImageData } = {
		en, ru
	};

	const handleClickBody = () => setIsOpen(false);

	useEventListener('click', handleClickBody);

	return (
		<motion.ul
			variants={container}
			initial={'hidden'}
			animate={'show'}
			className={cn(cls.list, cls.open)}
		>
			{
				languages?.map(l => (
						<li key={l}  onClick={() => handlerClick(l)}>
							<img src={i[l].src} alt={l}/>
						</li>
					)
				)
			}
		</motion.ul>
	);
};
