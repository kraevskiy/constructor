import { ItemProps } from "./Item.props";
import cls from "./Item.module.scss";
import { NavLink } from "react-router-dom";
import { CorrectDate } from "../../../helpers/";
import { Button } from "../..";
import { useState } from "react";
import { paths } from "../../../routes/paths";

const Item = ({
  id,
  title,
  titles,
  handleDelete,
  linkText,
  deleteText,
  createdAt,
  updatedAt,
  addOrder,
  preview,
  onOrder,
  userName = null,
  type,
}: ItemProps): JSX.Element => {
  const [url, setUrl] = useState(preview);
  return (
    <div className={cls.item}>
      <div className={cls.preview}>
        <img
          src={url}
          onError={() => {
            setUrl("https://picsum.photos/200/200");
          }}
          alt=""
        />
      </div>
      <div className={cls.title}>
        <span className={cls.fieldName}>{titles[0]}</span>
        <span>
          {title}
          {userName && (
            <>
              {" "}
              / <br />
              {userName}
            </>
          )}
        </span>
      </div>
      <div className={cls.create}>
        <span className={cls.fieldName}>{titles[1]}</span>
        <span>{CorrectDate(createdAt)}</span>
      </div>
      <div className={cls.update}>
        <span className={cls.fieldName}>{titles[2]}</span>
        <span>{CorrectDate(updatedAt)}</span>
      </div>

      <div className={cls.action}>
        {addOrder && !onOrder && (
          <NavLink
            to={{
              pathname: paths.orders.create,
              state: {
                layoutId: id,
              },
            }}
            className="btn green"
          >
            {addOrder}
          </NavLink>
        )}
        {linkText && (
          <NavLink className="btn" to={`/constructor/${type}/${id}`}>
            {linkText}
          </NavLink>
        )}
        {deleteText && !onOrder && (
          <Button color="red" onClick={() => handleDelete(id)}>
            {deleteText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Item;
