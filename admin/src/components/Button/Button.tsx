import { ButtonProps } from './Button.props';
import cn from 'classnames';
import cls from './Button.module.scss';
import { ForwardedRef, forwardRef } from 'react';

const Button = forwardRef(({color, className, children, loading, ...props}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element => {
	return (
		<button
			className={cn(cls.btn, className, {
				[cls.green]: color === 'green',
				[cls.red]: color === 'red',
				[cls.orange]: color === 'orange',
				[cls.gray]: loading,
			})}
			ref={ref}
			{...props}
      disabled={loading}
		>
			{children}
		</button>
	);
});


export default Button;
