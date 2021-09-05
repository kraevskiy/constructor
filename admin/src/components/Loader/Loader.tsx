import cls from './Loader.module.scss';
import { LoaderProps } from './Loader.props';
import cn from 'classnames';

export const Loader = ({color = 'blue', className}: LoaderProps): JSX.Element => (
	<div className={cn(cls.loader, className)}>
		<div className={cn(cls.load, cls[color])}/>
	</div>
);


