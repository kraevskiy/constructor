import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../../../redux/rootReducer";

import { paths } from "../../../../routes/paths";
import { IconButton } from "@material-ui/core";
import { DeleteForever, Visibility } from "@material-ui/icons";
import { StateUserLayout } from "../../../../redux/redux.types";
import { activateLayout, deleteLayout } from "../../../../redux/actions";

import style from "./PrefabsSection.module.scss";

const PrefabsSection: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    layouts: { allLayouts },
    user: { role },
  } = useSelector((state: RootState) => state);

  const isAdmin = role === "admin";

  return (
    <>
      {allLayouts.map((prefab, i) => (
        <div
          onMouseDown={() =>
            history.push(`${paths.constructor}/${prefab.type}/${prefab._id}`)
          }
          key={i}
          style={{
            height: 150,
            width: "100%",
            overflow: "hidden",
            backgroundImage: `url(http://admin.arter.local${prefab.preview})`,
            backgroundSize: "cover",
            position: "relative",
            backgroundColor: "gray",
          }}
        >
          <div className={style.layer_title_bar}>
            <div className={style.opacity_caver} />
            {isAdmin && (
              <IconButton
                onClick={() =>
                  dispatch(activateLayout(prefab._id, prefab.public))
                }
              >
                <Visibility
                  style={{ color: prefab.public ? "green" : "red" }}
                />
              </IconButton>
            )}
            <IconButton onClick={() => dispatch(deleteLayout(prefab._id))}>
              <DeleteForever style={{ color: "orange" }} />
            </IconButton>
          </div>
        </div>
      ))}
    </>
  );
};

export default PrefabsSection;
