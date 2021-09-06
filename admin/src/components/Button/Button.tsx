import { ButtonProps } from './Button.props';
import cn from 'classnames';
import cls from './Button.module.scss';

const Button = ({color, className, children, ...props}: ButtonProps): JSX.Element => {

	return (
		<button
			{...props}
			className={cn(cls.btn, className, {
				[cls.green]: color === 'green',
				[cls.red]: color === 'red',
				[cls.orange]: color === 'orange',
			})}
		>
			{children}
		</button>
	);
};


export default Button;
