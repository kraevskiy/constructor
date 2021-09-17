import cls from './Intro.module.scss';
import clsParent from '../../Home.module.scss';
import { IntroProps } from './Intro.props';
import cn from 'classnames';

export const Intro = ({data}: IntroProps): JSX.Element => {

	return (
		<section className={cn(clsParent.title, cls.warpper)}>
			{/*<img src={} alt=""/>*/}
			intro
		</section>
	);
};
