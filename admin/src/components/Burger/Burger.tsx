import { BurgerProps } from './Burger.props';
import cn from 'classnames';
import styles from './Burger.module.scss';

export const Burger = (props:BurgerProps): JSX.Element => {
	return (
		<button
			{...props}
			className={cn(styles.burger, {
				[styles.active]: props.active
			})}
		>
			<span/><span/><span/>
		</button>
	);
};
