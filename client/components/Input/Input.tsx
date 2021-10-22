import { InputProps } from './Input.props';
import cls from './Input.module.scss';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

// export const Input = (props: InputProps): JSX.Element => {
// 	return <input {...props} className={cn(props.className, cls.input)}/>;
// };


export const Input = forwardRef(({className, error, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
	return (
			<input className={cn(className, cls.input, {
				[cls.error]: !!error
			})} ref={ref} {...props}/>
	);
});
