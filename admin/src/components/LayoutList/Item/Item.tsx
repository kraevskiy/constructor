import { ItemProps } from './Item.props';
import cls from './Item.module.scss';
import { NavLink } from 'react-router-dom';
import { CorrectDate } from '../../../helpers/';
import { Button } from '../..';

const Item = ({
	id,
	title,
	handleDelete,
	linkText,
	deleteText,
	createdAt,
	updatedAt,
	userName = null
}: ItemProps): JSX.Element => {

	return (
		<div className={cls.item}>
			<div className={cls.title}>
				{title}
				{userName && (<> / <br/>{userName}</>)}
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
