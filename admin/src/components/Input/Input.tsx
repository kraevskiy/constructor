import { InputProps } from './Input.props';
import cls from './Input.module.scss';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

// export const Input = (props: InputProps): JSX.Element => {
// 	return <input {...props} className={cn(props.className, cls.input)}/>;
// };


const Input = forwardRef(({className, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
	return (
			<input className={cn(className, cls.input)} ref={ref} {...props}/>
	);
});

export default Input;
