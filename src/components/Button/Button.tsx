import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUseStyles } from "react-jss";
import { colors } from "components/variables";

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

const getBackgroundColor = (type: string, hover = false) => {
  switch (type) {
    case ButtonType.primary:
      return hover ? colors.primary.shade4 : colors.primary.shade3;
  }
};

const getTextColor = (type: string, hover = false) => {
  switch (type) {
    case ButtonType.primary:
      return hover ? colors.primary.tint9 : colors.white;
  }
};

const getBorderColor = (type: string, hover = false) => {
  switch (type) {
    case ButtonType.primary:
      return colors.primary.tint9;
  }
};

const useStyle = createUseStyles({
  Button: {
    fontSize: "2rem",
    padding: "1rem 2rem",
    flex: "1",
    flexShrink: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: ({ isSquare }) => isSquare ? "0" : "2rem",

    backgroundColor: ({ type }) => getBackgroundColor(type),
    color: ({ type }) => getTextColor(type),
    border: ({ type }) => `1px solid ${getBorderColor(type)}`,

    "&:hover": {
      backgroundColor: ({ type }) => getBackgroundColor(type, true),
      color: ({ type }) => getTextColor(type, true),
      border: ({ type }) => `1px solid ${getBorderColor(type, true)}`,
    },
  },
  Icon: {
    backgroundColor: "transparent",
    color: colors.black,
    border: "none",

    "&:hover": {
      color: colors.error.shade9,
    }
  },
  Children: {},
  IconChildrenMargin: {
    marginLeft: "1rem",
  }
});

const Button: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = ({
  icon,
  type,
  isSquare,
  children,
  ...props
}) => {
  const classes = useStyle({ isSquare, type });
  return (
    <button
      {...props}
      className={classes.Button}
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
