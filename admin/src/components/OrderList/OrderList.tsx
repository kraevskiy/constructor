import { useState } from "react";
import { OrderListProps } from "./OrderList.props";
import cls from "./OrderList.module.scss";
import Header from "./Header/Header";
import Item from "./Item/Item";
import { useTranslation } from "react-i18next";
import Modal from "../Modal/Modal";
import { StateUserOrder } from "../../redux/redux.types";
import ModalBody from "../../pages/Order/ModalBody";

export type handleModal = (order: StateUserOrder) => void;

const OrderList = ({ orders, action }: OrderListProps): JSX.Element => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState(<></>);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const COLUMNS_NAME = [
    t("order.name"),
    t("order.number"),
    t("order.price"),
    t("order.count"),
    t("order.allPrice"),
    t("user.address"),
  ];

  const handleBodyToModal: handleModal = (order) => {
    setModalBody(<ModalBody order={order} />);
    open();
  };

  <Modal handleClose={close} modalOpen={modalOpen}>
    {modalBody}
  </Modal>;

  return (
    <div className={cls.wrapper}>
      <Modal handleClose={close} modalOpen={modalOpen}>
        {modalBody}
      </Modal>
      <Header titles={COLUMNS_NAME} />
      {orders.map((o) => (
        <Item
          handleModal={handleBodyToModal}
          titles={COLUMNS_NAME}
          {...o}
          key={o._id}
          action={action}
          order={o}
        />
      ))}
    </div>
  );
};

export default OrderList;
