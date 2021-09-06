import { BlockHeadProps } from './BlockHead.props';
import cls from './BlockHead.module.scss';
import cn from 'classnames';

const BlockHead = ({children, line}: BlockHeadProps): JSX.Element => {

	return (
		<h3 className={cn(cls.wr, {
			[cls.lineOrange]: line === 'orange',
			[cls.lineGreen]: line === 'green',
		})}>
			{children}
		</h3>
	);
};

export default BlockHead;
