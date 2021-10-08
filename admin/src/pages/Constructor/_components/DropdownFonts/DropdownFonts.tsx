import React, { useState } from "react";
import cn from "classnames";

import style from "./DropdownFonts.module.scss";

interface Props {
  fonts: string[];
  selected: string;
  layer_index: number;
  changeTextFont: (font: string) => void;
}

const DropdownFonts: React.FC<Props> = ({
  fonts,
  selected,
  changeTextFont,
}) => {
  const [opened, setOpened] = useState<boolean>(false);

  const selectFont = (font: string) => {
    changeTextFont(font);
    setOpened(false);
  };

  return (
    <div className={cn(style.dropdownMenu, { [style.opened]: opened })}>
      <button
        onClick={() => setOpened(!opened)}
        style={{ fontFamily: selected, width: 160 }}
      >
        {selected}
      </button>
      <div className={style.suggestion}>
        {fonts.map((item) => (
          <button
            onClick={() => selectFont(item)}
            style={{ fontFamily: item }}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownFonts;
