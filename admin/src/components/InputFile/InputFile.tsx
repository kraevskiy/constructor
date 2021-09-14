import { InputFileProps } from './InputFile.props';
import cls from './InputFile.module.scss';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

// export const Input = (props: InputProps): JSX.Element => {
// 	return <input {...props} className={cn(props.className, cls.input)}/>;
// };


const InputFile = forwardRef(({className, ...props}: InputFileProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
	return (
			<input className={cn(className, cls.input)} ref={ref} {...props}/>
	);
});

export default InputFile;
