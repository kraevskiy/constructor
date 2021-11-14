import { BlockHeadProps } from "./BlockHead.props";
import cls from "./BlockHead.module.scss";
import cn from "classnames";

const BlockHead = ({
  children,
  line,
  tag,
  className,
  onTap,
  selected,
}: BlockHeadProps): JSX.Element => {
  const style = cn(
    cls.wr,
    {
      [cls.lineOrange]: line === "orange",
      [cls.lineGreen]: line === "green",
      [cls.onTap]: onTap,
      [cls.selected]: selected,
    },
    className
  );

  switch (tag) {
    case "h2":
      return (
        <h2
          className={style}
          onMouseDown={() => {
            if (onTap) onTap(1);
          }}
        >
          <span>{children}</span>
        </h2>
      );
    case "h3":
      return (
        <h3
          className={style}
          onMouseDown={() => {
            if (onTap) onTap(1);
          }}
        >
          <span>{children}</span>
        </h3>
      );
    case "h4":
      return (
        <h4
          className={style}
          onMouseDown={() => {
            if (onTap) onTap(1);
          }}
        >
          <span>{children}</span>
        </h4>
      );
    case "p":
      return (
        <p
          className={style}
          onMouseDown={() => {
            if (onTap) onTap(1);
          }}
        >
          <span>{children}</span>
        </p>
      );
    default:
      return (
        <div
          className={style}
          onMouseDown={() => {
            if (onTap) onTap(1);
          }}
        >
          <span>{children}</span>
        </div>
      );
  }
};

export default BlockHead;
