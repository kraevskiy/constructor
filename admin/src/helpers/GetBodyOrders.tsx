import { useState } from "react";
import { StateUserOrder } from "../redux/redux.types";
import { BlockHead, OrderList } from "../components";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { editStatusOrder } from "../redux/orders/ordersActions";
import { getAllOrders } from "../redux/ordersAll/ordersAllActions";

import cls from "../pages/OrderAll/OrderAllPage.module.scss";

interface GetBodyOrdersProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  orders: StateUserOrder[];
}

export const GetBodyOrders = ({ orders }: GetBodyOrdersProps): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  const handleAction = async (
    id: string,
    status: "new" | "progress" | "completed"
  ): Promise<void> => {
    await dispatch(editStatusOrder({ id, status }));
    dispatch(getAllOrders({ limit: 100 }));
  };

  const getNewOrders = (newOrders: StateUserOrder[]) => {
    return (
      <div className={cls.typeWrapper}>
        <OrderList action={handleAction} orders={newOrders} />
      </div>
    );
  };

  const getProgressOrders = (newOrders: StateUserOrder[]) => {
    return (
      <div className={cls.typeWrapper}>
        <OrderList action={handleAction} orders={newOrders} />
      </div>
    );
  };

  const getCompletedOrders = (newOrders: StateUserOrder[]) => {
    return (
      <div className={cls.typeWrapper}>
        <OrderList action={handleAction} orders={newOrders} />
      </div>
    );
  };

  const onTap = (p: number) => {
    setPage(p);
  };

  const getBody = () => {
    const listOrders: {
      [key in StateUserOrder["status"]]: StateUserOrder[] | [];
    } = {
      new: [],
      progress: [],
      completed: [],
    };
    orders.forEach((o) => {
      const linkToArray: StateUserOrder[] = listOrders[o.status];
      return linkToArray.push(o);
    });
    return (
      <>
        <div className={cls.tabWrapper}>
          <BlockHead selected={page === 0} onTap={() => onTap(0)}>
            {t("order.new")}
          </BlockHead>
          <BlockHead selected={page === 1} onTap={() => onTap(1)} line="orange">
            {t("order.progress")}
          </BlockHead>
          <BlockHead selected={page === 2} onTap={() => onTap(2)} line="green">
            {t("order.complete")}
          </BlockHead>
        </div>
        {!!listOrders.new.length && page == 0 && getNewOrders(listOrders.new)}
        {!!listOrders.progress.length &&
          page == 1 &&
          getProgressOrders(listOrders.progress)}
        {!!listOrders.completed.length &&
          page == 2 &&
          getCompletedOrders(listOrders.completed)}
      </>
    );
  };

  return getBody();
};
