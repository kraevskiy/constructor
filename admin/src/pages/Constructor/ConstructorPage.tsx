import { createLayouts } from '../../redux/layouts/layoutsActions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const ConstructorPage = (): JSX.Element => {

	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [config] = useState('config');
	const [files] = useState([]);
	const [instance] = useState('instance');

	const addLayoutSimple = async () => {
		await dispatch(createLayouts({title, config, files, instance}));
		setTitle('');
	};
	return (
		<div className="row">
			<h1 className="text-center col-12 mb-5">ConstructorPage (all)</h1>
			<br/>
			<input type="text" className="col-6" placeholder="title" value={title} onChange={(e) => setTitle((e.target.value))}/>
			<button className="btn btn-primary col-5 ms-auto" onClick={() => addLayoutSimple()}>Add layout</button>
		</div>
	);
};

export default ConstructorPage;
