import { ItemProps } from './Item.props';
import cls from './Item.module.scss';
import { NavLink } from 'react-router-dom';
import { Button } from '../../Button/Button';
import { format } from 'date-fns';

const Item = ({
	id,
	title,
	handleDelete,
	linkText,
	deleteText,
	createdAt,
	updatedAt
}: ItemProps): JSX.Element => {

	const correctShow = (s: Date) => {
		const f = format(new Date(createdAt), 'yyyy/MM/dd  hh:mm').split(' ');
		return <>
			{f[2]} <br/> {f[0]}
		</>;
	};

	return (
		<div className={cls.item}>
			<div className={cls.title}>
				{title}
			</div>
			<div className={cls.create}>
				{correctShow(createdAt)}
			</div>
			<div className={cls.update}>
				{correctShow(updatedAt)}
			</div>

			<Button color="red" onClick={() => handleDelete(id)}>
				{deleteText}
			</Button>
			<NavLink className="btn" to={`/layout/${id}`}>
				{linkText}
			</NavLink>
		</div>
	);
};

export default Item;
