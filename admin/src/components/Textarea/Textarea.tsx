import { TextareaProps } from './Textarea.props';
import cls from './Textarea.module.scss';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

// export const Input = (props: InputProps): JSX.Element => {
// 	return <input {...props} className={cn(props.className, cls.input)}/>;
// };


const Textarea = forwardRef(({className, error, ...props}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return (
			<textarea rows={3} className={cn(className, cls.textarea, {
				[cls.error]: !!error
			})} ref={ref} {...props}/>
	);
});

export default Textarea;
