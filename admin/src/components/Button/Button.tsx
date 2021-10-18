import { ButtonProps } from './Button.props';
import cn from 'classnames';
import cls from './Button.module.scss';
import { ForwardedRef, forwardRef } from 'react';

// const Button = ({color, className, children, ...props}: ButtonProps): JSX.Element => {
//
// 	return (
// 		<button
// 			{...props}
// 			className={cn(cls.btn, className, {
// 				[cls.green]: color === 'green',
// 				[cls.red]: color === 'red',
// 				[cls.orange]: color === 'orange',
// 			})}
// 		>
// 			{children}
// 		</button>
// 	);
// };

const Button = forwardRef(({color, className, children, ...props}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element => {
	return (
		<button
			className={cn(cls.btn, className, {
				[cls.green]: color === 'green',
				[cls.red]: color === 'red',
				[cls.orange]: color === 'orange',
			})}
			ref={ref}
			{...props}
		>
			{children}
		</button>
	);
});


export default Button;
