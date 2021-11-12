import { ItemProps } from "./Item.props";
import cls from "./Item.module.scss";
import { getCorrectValue } from "../../../helpers";
import { ok } from "../../../images/icons";
import { Button } from "../../";
import { INITIAL_PRICE } from "../../../helpers/constants";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { paths } from "../../../routes/paths";

const Item = (props: ItemProps): JSX.Element => {
  const { t } = useTranslation();

  if (!props.layouts.length) {
    return <></>;
  }

  return (
    <div className={cls.item}>
      <div className={cls.id}>
        <span className={cls.fieldName}>{props.titles[0]}</span>
        <span>{props.layouts[0].title}</span>
      </div>
      <div className={cls.create}>
        <span className={cls.fieldName}>{props.titles[1]}/ID:</span>
        <span>
          {props._id}/{props.orderID}
        </span>
      </div>
      <div className={cls.layouts}>
        <span className={cls.fieldName}>{props.titles[2]}:</span>
        <span>
          {INITIAL_PRICE}
          {/*{props.price}*/}
        </span>
      </div>
      <div className={cls.layouts}>
        <span className={cls.fieldName}>{props.titles[3]}:</span>
        <span>{props.count}</span>
      </div>
      <div className={cls.layouts}>
        <span className={cls.fieldName}>{props.titles[4]}:</span>
        <span>{getCorrectValue(INITIAL_PRICE, Number(props.count))}</span>
      </div>
      <div className={cls.action}>
        <span className={cls.fieldName}>{props.titles[5]}:</span>
        <div className={cls.address}>{props.address}</div>
        <div className={cls.actionBtn}>
          {props.status === "completed" && (
            <span className={cls.icon}>
              <img src={ok} alt="" />
            </span>
          )}
          <Button onClick={() => props.handleModal(props.order)}>
            {t("order.showMore")}
          </Button>
          {props.status !== "completed" && (
            <NavLink
              className="btn"
              to={`${paths.constructor}/${props.layouts[0]._id}`}
            >
              {t("order.view")}
            </NavLink>
          )}
          {props.status === "new" && (
            <Button
              color="orange"
              onClick={() => props.action(props._id, "progress")}
            >
              {t("order.approve")}
            </Button>
          )}
          {props.status === "progress" && (
            <Button
              color="green"
              onClick={() => props.action(props._id, "completed")}
            >
              {t("order.approve")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
