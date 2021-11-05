import { ItemProps } from './Item.props';
import cls from './Item.module.scss';
import { NavLink } from 'react-router-dom';
import { CorrectDate } from '../../../helpers/';
import { Button } from '../..';
import { useState } from 'react';
import { paths } from '../../../routes/paths';

const Item = ({
	id,
	title,
	handleDelete,
	linkText,
	deleteText,
	createdAt,
	updatedAt,
	addOrder,
	preview,
	onOrder,
	userName = null
}: ItemProps): JSX.Element => {
	const [url, setUrl] = useState(preview);
	return (
		<div className={cls.item}>
			<div className={cls.preview}>
				<img
					src={url}
					onError={() => {
						setUrl('https://picsum.photos/200/200');
					}}
					alt=""/>
			</div>
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

			<div className={cls.action}>
				{addOrder && !onOrder && <NavLink to={{
					pathname: paths.orders.create,
					state: {
						layoutId: id
					}
				}} className="btn green">
					{addOrder}
        </NavLink>}
				{linkText && <NavLink className="btn" to={`/layout/${id}`}>
					{linkText}
        </NavLink>}
				{deleteText && !onOrder && <Button color="red" onClick={() => handleDelete(id)}>
					{deleteText}
        </Button>}
			</div>
		</div>
	);
};

export default Item;
