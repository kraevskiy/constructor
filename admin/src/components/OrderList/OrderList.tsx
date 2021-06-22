import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

export const OrderList = (): JSX.Element => {
	const orders = useSelector((state: RootState) => state.orders);

	return (
		<div>
			{orders?.length && orders.map(o => (
				<div className="card mb-3" key={o._id}>
					<div className="card-body">
						<h5 className="card-title">Status: <span className="badge bg-primary">{o.status}</span></h5>
						<h5 className="card-title">Payment status: <span className="badge bg-primary">{o.paymentIntent}</span></h5>
						<h6
							className="card-subtitle mb-2 text-muted">createdAt: <small>{format(new Date(o.createdAt), 'yyyy/MM/dd hh:mm')}</small>
						</h6>
						<h6
							className="card-subtitle mb-2 text-muted">updatedAt: <small>{format(new Date(o.updatedAt), 'yyyy/MM/dd hh:mm')}</small>
						</h6>
						<ul className="list-group">
							{o.layouts.map(l => (
								<li className="list-group-item" key={l._id}>
									{l.title}
								</li>
							))}
						</ul>
					</div>
				</div>
			))}
		</div>
	);
};
