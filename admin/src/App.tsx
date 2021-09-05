import { lazy, Suspense, useEffect } from 'react';
import Layout from './HOC/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from './redux/redux.types';
import { getOrders, showLoader, hideLoader, getLayouts, autoLogin } from './redux/actions';
import { Loader } from './components/';
import { getAllLayouts } from './redux/layoutsAll/layoutsAllActions';
import { getAllOrders } from './redux/ordersAll/ordersAllActions';
import { getAllUsers } from './redux/userAll/userAllActions';

const Routes = lazy(() => import('./routes/Routes'));

const App = (): JSX.Element => {
	const {app, user: {isLoggedIn, initAutologin, _id, role}} = useSelector((state: RootState) => state);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, ActionType>>();

	useEffect(() => {
		if (initAutologin) return;
		dispatch(showLoader());
		dispatch(autoLogin());
		dispatch(hideLoader());
	}, [isLoggedIn, initAutologin]);

	useEffect(() => {
		if (!isLoggedIn) return;
		if (role === 'admin') {
			dispatch(getAllLayouts({limit: 100}));
			dispatch(getAllOrders({limit: 100}));
			dispatch(getAllUsers());
		}
		dispatch(showLoader());
		dispatch(getLayouts(_id));
		dispatch(getOrders(_id));
		dispatch(hideLoader());
	}, [isLoggedIn, initAutologin]);

	return (
		<Layout>
			{app.loading && <Loader/>}
			{initAutologin && !app.loading &&
      <Suspense fallback={<Loader/>}>
        <Routes/>
      </Suspense>
			}
		</Layout>
	);
};

export default App;
