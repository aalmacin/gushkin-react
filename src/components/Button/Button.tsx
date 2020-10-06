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

export interface ButtonProps {
  icon?: any;
  isSquare?: boolean;
  type: ButtonType;
}

const getColors = (type: ButtonType) => {
  const buttonColors = {
    [ButtonType.primary]: {
      backgroundColor: colors.primary.shade3,
      textColor: colors.white.base,
      borderColor: colors.primary.tint9,
      hover: {
        backgroundColor: colors.primary.shade4,
        textColor: colors.primary.tint9,
      }
    },
    [ButtonType.secondary]: {
      backgroundColor: colors.secondary.shade3,
      textColor: colors.white.base,
      borderColor: colors.secondary.tint9,
      hover: {
        backgroundColor: colors.secondary.shade4,
        textColor: colors.secondary.tint9,
      }
    },
    [ButtonType.error]: {
      backgroundColor: colors.error.tint4,
      textColor: colors.white.base,
      borderColor: colors.error.tint9,
      hover: {
        backgroundColor: colors.error.tint3,
        textColor: colors.error.tint9,
      }
    },
    [ButtonType.gold]: {
      backgroundColor: colors.gold.tint3,
      textColor: colors.black.base,
      borderColor: colors.gold.shade9,
      hover: {
        backgroundColor: colors.gold.tint4,
        textColor: colors.gold.shade9,
      }
    },
    [ButtonType.icon]: {
      backgroundColor: "transparent",
      textColor: colors.black.base,
      borderColor: "transparent",
      hover: {
        backgroundColor: "transparent",
        textColor: colors.error.shade9,
      }
    },
    [ButtonType.red]: {
      backgroundColor: colors.red.tint3,
      textColor: colors.black.base,
      borderColor: colors.red.tint4,
      hover: {
        backgroundColor: colors.red.tint4,
        textColor: colors.red.shade9,
      }
    },
  };
  return buttonColors[type];
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

    backgroundColor: ({ type }) => getColors(type).backgroundColor,
    color: ({ type }) => getColors(type).textColor,
    border: ({ type }) => `1px solid ${getColors(type).borderColor}`,

    "&:hover": {
      backgroundColor: ({ type }) => getColors(type).hover.backgroundColor,
      color: ({ type }) => getColors(type).hover.textColor,
    },
  },
  Icon: {
    backgroundColor: "transparent",
    textColor: ({ type }) => getColors(type).textColor,
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
