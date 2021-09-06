import { ItemProps } from './Item.props';
import cls from './Item.module.scss';
import { CorrectDate } from '../../../helpers';
import { ok } from '../../../images/icons';
import { Button } from '../../';
import Loader from '../../Loader/Loader';

const Item = ({
	id,
	handleDelete,
	createdAt,
	typeAction,
	layouts,
	userName = null
}: ItemProps): JSX.Element => {
	return (
		<div className={cls.item}>
			<div className={cls.id}>
				{id}
				{userName && (<> / <br/>{userName}</>)}
			</div>
			<div  className={cls.create}>
				{CorrectDate(createdAt)}
			</div>
			<ul  className={cls.layouts}>
				{
					layouts.map((l, i) => (
						<li key={l._id + i}>
							{l.title}
						</li>
					))
				}
			</ul>
			<div className={cls.action}>
				{!typeAction && <span className={cls.icon}>
					<img src={ok} alt=""/>
				</span>}
				{typeAction === 'progress' && <Loader color="orange" className={cls.progress}/>}
				{typeAction === 'delete' && <>
					<Button>
						Accept
					</Button>
					<Button color="red" onClick={()=>handleDelete(id)}>
						Delete
					</Button>
				</>}
			</div>
		</div>
	);
};

export default Item;
