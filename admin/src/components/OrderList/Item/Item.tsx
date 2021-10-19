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
	userName = null,
	titles
}: ItemProps): JSX.Element => {
	return (
		<div className={cls.item}>
			<div className={cls.id}>
				<span className={cls.fieldName}>
					{titles[0]}:
				</span>
				<span>{id}{userName && (<> / <br/>{userName}</>)}</span>
			</div>
			<div className={cls.create}>
				<span className={cls.fieldName}>
					{titles[1]}:
				</span>
				<span>
				{CorrectDate(createdAt)}
				</span>
			</div>
			<ul className={cls.layouts}>
				<li className={cls.fieldName}>
					{titles[2]}:
				</li>
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
          <Button color="red" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </>}
			</div>
		</div>
	);
};

export default Item;
