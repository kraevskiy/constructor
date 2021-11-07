import { StateUserOrder } from '../../redux/redux.types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cls from './OrderPage.module.scss';
import cn from 'classnames';
import { BlockHead } from '../../components';
import { useTranslation } from 'react-i18next';
import { INITIAL_PRICE } from '../../helpers/constants';
import { getCorrectValue } from '../../helpers';

interface ModalBodyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	order: StateUserOrder;
}

const ModalBody = ({order}: ModalBodyProps): JSX.Element => {
	const {t} = useTranslation();

	return (
		<div
			className={cn('container', cls.modalBody)}
		>
			<BlockHead className={cls.modalTitle}>
				№ {order._id}
			</BlockHead>
			<ul className={cls.list}>
				<li>
					<span>{t('user.firstName')}</span>
					<span>{order.firstName}</span>
				</li>
				<li>
					<span>{t('user.lastName')}</span>
					<span>{order.lastName}</span>
				</li>
				<li>
					<span>{t('user.phone')}</span>
					<span>{order.phone}</span>
				</li>
				<li>
					<span>{t('login.email')}</span>
					<span>{order.email}</span>
				</li>
				<li>
					<span>{t('user.address')}</span>
					<span>{order.address}</span>
				</li>
				<li>
					<span>{t('order.deliveryType')}</span>
					<span>{order.delivery}</span>
				</li>
				<li>
					<span>{t('order.paymentType')}</span>
					<span>{order.paymentType}</span>
				</li>
				<li>
					<span>{t('order.status')}</span>
					<span>{t(`order.status.${order.status}`)}</span>
				</li>
				<li>
					<span>{t('order.count')}</span>
					<span>{order.count}</span>
				</li>
				<li>
					<span>{t('order.price')}</span>
					<span>{INITIAL_PRICE}</span>
				</li>
				<li>
					<span>{t('order.allPrice')}</span>
					<span>{getCorrectValue(INITIAL_PRICE, Number(order.count))}</span>
				</li>
				<li>
					<span>{t('order.name')}</span>
					<span>{order.layouts[0].title}</span>
				</li>
				<li>
					<span>{t('order.comment')}</span>
					<span>{order.comment}</span>
				</li>
			</ul>
		</div>
	);
};

export default ModalBody;
