import { InputProps } from './Input.props';
import cls from './Input.module.scss';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

const Input = forwardRef(({className, error, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
	return (
			<input className={cn(cls.input, {
				[cls.error]: !!error
			}, className)} ref={ref} {...props}/>
	);
});

export default Input;
