import cls from './Souvenirs.module.scss';
import clsParent from '../../Home.module.scss';
import { SouvenirsProps } from './Souvenirs.props';
import cn from 'classnames';

export const Souvenirs = ({data}: SouvenirsProps): JSX.Element => {

	return (
		<section className={cn(clsParent.title, cls.warpper)}>
			Souvenirs
		</section>
	);
};
