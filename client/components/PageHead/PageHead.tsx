import { PageHeadProps } from './PageHead.props';
import cls from './PageHead.module.scss';
import cn from 'classnames';

export const PageHead = ({children, paddingTop, line, text, className}: PageHeadProps): JSX.Element => {
	return (
		<div className={cn(cls.wr, className, {
			[cls.paddingBig]: paddingTop === 'big',
			[cls.paddingSmall]: paddingTop === 'small',
		})}>
			<h1 className={cn(cls.title, {
				[cls.lineOrange]: line === 'orange',
				[cls.lineGreen]: line === 'green',
			})}>
				{children}
			</h1>
			{
				text && <p className={cls.text}>{text}</p>
			}
		</div>
	);
};
