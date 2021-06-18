import React from 'react';
import { LayoutList } from '../../components';

const LayoutsPage = (): JSX.Element => {

	return (
		<div className="row">
			<h1 className="text-center col-12 mb-5">LayoutsPage (logged)</h1>
			<LayoutList/>
		</div>
	);
};

export default LayoutsPage;
