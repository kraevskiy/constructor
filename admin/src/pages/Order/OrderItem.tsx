import cls from './OrderPage.module.scss';
import { Button } from '../../components';
import { StateUserOrder } from '../../redux/redux.types';
import { CSSProperties, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useTranslation } from 'react-i18next';
import { INITIAL_PRICE } from '../../helpers/constants';
import { getCorrectValue } from '../../helpers';
import { handleModal } from './OrderPage';

const PLACEHOLDER_IMAGE_URL = 'https://picsum.photos/200/200';

interface OrderItemProps {
	order: StateUserOrder;
	handleModal: handleModal
}

const OrderItem = ({order, handleModal}: OrderItemProps): JSX.Element => {
	const allLayouts = useSelector((state: RootState) => state.layouts);
	const layout = allLayouts?.find(l => l._id === order.layouts[0]._id);
	if (!layout) {
		return <></>;
	}
	const {t} = useTranslation();

	const getColor = (statusItem: StateUserOrder['status']): CSSProperties => {
		switch (statusItem) {
			case 'completed':
				return {color: 'var(--c-green)'};
			case 'progress':
				return {color: 'var(--c-orange)'};
			default:
				return {color: 'var(--c-blue)'};
		}
	};

	const [imgPreview, setImgPreview] = useState<string>(layout.preview || PLACEHOLDER_IMAGE_URL);
	return (
		<div className={cls.item}>
			<img
				className={cls.img}
				src={imgPreview}
				onError={() => setImgPreview(PLACEHOLDER_IMAGE_URL)}
				alt={layout.title}/>
			<div className={cls.layout}>
				<div className={cls.layoutTitle}>
					{layout.title}
				</div>
				<div className={cls.layoutPrice}>
					<div>
						<span>{t('order.price')}</span>
						{/*<span>{price}</span>*/}
						<span>{INITIAL_PRICE}</span>
					</div>
					<div>
						<span>{t('order.count')}</span>
						<span>{order.count}</span>
					</div>
				</div>
				<div className={cls.layoutStatus}>
					<span>{t('order.status')}</span>
					<span style={getColor(order.status)}>{t(`order.status.${order.status}`)}</span>
				</div>
			</div>
			<div className={cls.other}>
				<div className={cls.otherTitle}>
					<span>{t('order.allPrice')}</span>
					<span>{getCorrectValue(INITIAL_PRICE, Number(order.count)) + ` $`} </span>
				</div>
				<Button onClick={()=> handleModal(order)}>
					{t('order.showMore')}
				</Button>
			</div>
		</div>
	);

};

export default OrderItem;

