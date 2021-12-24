import React, { useState } from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { paths } from "../../../../routes/paths";
import {
  Menu,
  MenuItem,
  Button,
  styled,
  alpha,
  MenuProps,
} from "@material-ui/core";

import { RootState } from "../../../../redux/rootReducer";
import { CanType } from "../../../../redux/redux.types";

import style from "./DropdownTypes.module.scss";

const types: CanType[] = ["card", "module", "t_shirt", "cap"];

const typeMap = new Map();
typeMap.set("card", "constructor.card_rectangle");
typeMap.set("module", "constructor.module_pic");
typeMap.set("t_shirt", "constructor.t_shirt");
typeMap.set("cap", "constructor.cap");

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.type === "light"
        ? "rgb(79, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const DropdownTypes: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [opened, setOpened] = useState<boolean>(false);

  const {
    editor: { canvasConfig },
  } = useSelector((state: RootState) => state);

  const selectType = (type: CanType) => {
    canvasConfig.type = type;
    history.push(`${paths.constructor}/${type}/`);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={cn(style.dropdownMenu, { [style.opened]: opened })}>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        style={{ width: "100%" }}
      >
        {t(typeMap.get(canvasConfig.type))}
      </Button>

      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {types.map((item) => (
          <MenuItem onClick={() => selectType(item)}>
            {t(typeMap.get(item))}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default DropdownTypes;
