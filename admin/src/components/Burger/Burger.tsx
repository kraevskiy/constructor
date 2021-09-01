import { BurgerProps } from './Burger.props';
import cn from 'classnames';
import cls from './Burger.module.scss';

export const Burger = (props:BurgerProps): JSX.Element => {
	return (
		<button
			onClick={props.onClick}
			className={cn(cls.burger, {
				[cls.active]: props.active
			})}
		>
			<span/><span/><span/>
		</button>
	);
};
