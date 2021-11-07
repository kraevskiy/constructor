import { useSelector } from 'react-redux';
import { Modal, PageHead } from '../../components/';
import { RootState } from '../../redux/rootReducer';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes/paths';
import OrderItem from './OrderItem';
import { useState } from 'react';
import { StateUserOrder } from '../../redux/redux.types';
import ModalBody from './ModalBody';

export type  handleModal = (order: StateUserOrder) => void;

const OrdersPage = (): JSX.Element => {
	const orders = useSelector((state: RootState) => state.orders);
	const {t} = useTranslation();
	const [modalOpen, setModalOpen] = useState(false);
	const [modalBody, setModalBody] = useState(<></>);
	const close = () => setModalOpen(false);
	const open = () => setModalOpen(true);

	const handleBodyToModal: handleModal = (order) => {
		setModalBody(<ModalBody order={order}/>);
		open();
	};

	return (
		<div className="container">
			<Modal handleClose={close} modalOpen={modalOpen}>
				{modalBody}
			</Modal>
			<PageHead>
				{t('order.title')}
			</PageHead>
			{
				orders?.length
					? orders.map(o => <OrderItem handleModal={handleBodyToModal} key={o._id} order={o}/>)
					: <p>{t('order.dont')}</p>
			}
			<br/>
			<NavLink to={paths.layouts} className="btn">
				{t('layout.title')}
			</NavLink>
		</div>
	);
};

export default OrdersPage;
