import { LanguageListProps } from './LanguageSwitcher.props';
import cn from 'classnames';
import cls from './LanguageSwitcher.module.scss';
import { motion } from 'framer-motion';
import { en, ru } from '../../images/flags';
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
	const i: { [key: string]: string } = {
		'en-US': en, 'ru-RU': ru
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
				languages.map(l => (
						<li key={l}  onClick={() => handlerClick(l)}>
							<img src={i[l]} alt="ss"/>
						</li>
					)
				)
			}
		</motion.ul>
	);
};
