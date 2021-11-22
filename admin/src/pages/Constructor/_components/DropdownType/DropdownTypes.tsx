import React, { useState } from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { paths } from "../../../../routes/paths";

import { RootState } from "../../../../redux/rootReducer";
import { CanType } from "../../../../redux/redux.types";

import style from "./DropdownTypes.module.scss";

const types: CanType[] = ["card", "module", "t_shirt", "cap"];

const typeMap = new Map();
typeMap.set("card", "constructor.card_rectangle");
typeMap.set("module", "constructor.module_pic");
typeMap.set("t_shirt", "constructor.t_shirt");
typeMap.set("cap", "constructor.cap");

const DropdownTypes: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [opened, setOpened] = useState<boolean>(false);

  const {
    editor: { canvasConfig },
  } = useSelector((state: RootState) => state);

  const selectType = (type: CanType) => {
    canvasConfig.type = type;
    history.push(`${paths.constructor}/${type}/`);
  };

  return (
    <div className={cn(style.dropdownMenu, { [style.opened]: opened })}>
      <button className={style.item} onClick={() => setOpened(!opened)}>
        {t(typeMap.get(canvasConfig.type))}
      </button>
      <div className={style.suggestion}>
        {types.map((item) => (
          <button
            className={style.item}
            onClick={() => selectType(item)}
            style={{ fontFamily: item }}
            key={item}
          >
            {t(typeMap.get(item))}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownTypes;
