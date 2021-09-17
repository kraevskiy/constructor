import cls from './Advantages.module.scss';
import clsParent from '../../Home.module.scss';
import { AdvantagesProps } from './Advantages.props';
import cn from 'classnames';

export const Advantages = ({data}: AdvantagesProps): JSX.Element => {

	return (
		<section className={cn(clsParent.title, cls.warpper)}>
			Advantages
		</section>
	);
};
