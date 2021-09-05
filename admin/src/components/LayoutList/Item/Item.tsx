import { ItemProps } from './Item.props';
import cls from './Item.module.scss';
import { NavLink } from 'react-router-dom';
import { Button } from '../../Button/Button';
import { CorrectDate } from '../../../helpers/';

const Item = ({
	id,
	title,
	handleDelete,
	linkText,
	deleteText,
	createdAt,
	updatedAt
}: ItemProps): JSX.Element => {

	return (
		<div className={cls.item}>
			<div className={cls.title}>
				{title}
			</div>
			<div className={cls.create}>
				{CorrectDate(createdAt)}
			</div>
			<div className={cls.update}>
				{CorrectDate(updatedAt)}
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
