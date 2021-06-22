import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { hideLoader, showLoader } from '../../redux/actions';
import { deleteLayout } from '../../redux/actions';

export const LayoutList = (): JSX.Element => {
	const layouts = useSelector((state: RootState) => state.layouts);
	const dispatch = useDispatch();

	const deleteLayoutHandler = async (id: string) => {
		dispatch(showLoader());
		await dispatch(deleteLayout(id));
		dispatch(hideLoader());
	};

	return (
		<div className="row ali">
			{layouts?.length && layouts.map(l => (
				<div className="col-md-4" key={l._id}>
					<div className="card m-1">
						<div className="card-body">
							<h5 className="card-title d-flex justify-content-between">
								<span>{l.title}</span>
								<button
									type="button"
									onClick={()=>deleteLayoutHandler(l._id)}
									className="btn btn-info text-white"
									aria-label="Close"><small>X</small></button>
							</h5>
							<h6
								className="card-subtitle mb-2 text-muted">createdAt: <small>{format(new Date(l.createdAt), 'yyyy/MM/dd hh:mm')}</small>
							</h6>
							<h6
								className="card-subtitle mb-2 text-muted">updatedAt: <small>{format(new Date(l.updatedAt), 'yyyy/MM/dd hh:mm')}</small>
							</h6>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
