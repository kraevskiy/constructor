import cls from './Pictures.module.scss';
import clsParent from '../../Home.module.scss';
import { PicturesProps } from './Pictures.props';
import cn from 'classnames';

export const Pictures = ({data}: PicturesProps): JSX.Element => {

	return (
		<section className={cn(clsParent.title, cls.warpper)}>
			Pictures
		</section>
	);
};
