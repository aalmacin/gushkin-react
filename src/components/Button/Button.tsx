import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Button.module.scss";

export enum ButtonType {
  primary = "Primary",
  secondary = "Secondary",
  error = "Error",
  gold = "Gold",
  red = "Red",
  icon = "Icon",
}

interface ButtonProps {
  icon?: any;
  isSquare?: boolean;
  type: ButtonType;
}

const Button: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = ({
  icon,
  type,
  isSquare,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${classes.Button} ${classes[type]} ${isSquare &&
        classes.Square}`}
    >
      <span className={classes.Icon}>
        {icon && <FontAwesomeIcon icon={icon} />}
      </span>
      {icon && children && <span className={classes.IconChildrenMargin}></span>}
      {children && <span className={classes.Children}>{children}</span>}
    </button>
  );
};

export default Button;
