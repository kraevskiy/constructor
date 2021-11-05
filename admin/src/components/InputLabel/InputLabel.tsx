import { InputLabelProps } from './InputLabel.props';
import cls from './InputLabel.module.scss';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

const InputLabel = forwardRef(({
	className,
	error,
	text,
	...props
}: InputLabelProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
	return (
		<label className={cls.label}>
			<span>{text}</span>
			<input className={cn(className, cls.input, {
				[cls.error]: !!error
			})} ref={ref} {...props}/>
		</label>
	);
});

export default InputLabel;
