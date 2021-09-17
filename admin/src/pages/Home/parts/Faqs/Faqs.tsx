import cls from './Faqs.module.scss';
import clsParent from '../../Home.module.scss';
import { FaqsProps } from './Faqs.props';
import cn from 'classnames';

export const Faqs = ({data}: FaqsProps): JSX.Element => {

	return (
		<section className={cn(clsParent.title, cls.warpper)}>
			Faqs
		</section>
	);
};
