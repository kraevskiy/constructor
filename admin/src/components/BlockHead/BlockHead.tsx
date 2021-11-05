import { BlockHeadProps } from './BlockHead.props';
import cls from './BlockHead.module.scss';
import cn from 'classnames';

const BlockHead = ({children, line, tag, className}: BlockHeadProps): JSX.Element => {
	switch (tag) {
		case 'h2':
			return (
				<h2 className={cn(cls.wr, {
					[cls.lineOrange]: line === 'orange',
					[cls.lineGreen]: line === 'green',
				}, className)}>
					<span>{children}</span>
				</h2>
			);
		case 'h3':
			return (
				<h3 className={cn(cls.wr, {
					[cls.lineOrange]: line === 'orange',
					[cls.lineGreen]: line === 'green',
				}, className)}>
					<span>{children}</span>
				</h3>
			);
		case 'h4':
			return (
				<h4 className={cn(cls.wr, {
					[cls.lineOrange]: line === 'orange',
					[cls.lineGreen]: line === 'green',
				}, className)}>
					<span>{children}</span>
				</h4>
			);
		case 'p':
			return (
				<p className={cn(cls.wr, {
					[cls.lineOrange]: line === 'orange',
					[cls.lineGreen]: line === 'green',
				}, className)}>
					<span>{children}</span>
				</p>
			);
		default:
			return (
				<div className={cn(cls.wr, {
					[cls.lineOrange]: line === 'orange',
					[cls.lineGreen]: line === 'green',
				}, className)}>
					<span>{children}</span>
				</div>
			);
	}
};

export default BlockHead;
