import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUseStyles } from "react-jss";
import { colors } from "components/variables";

export const BUTTON_TYPES = [
  "Primary",
  "Secondary",
  "Error",
  "Gold",
  "Red",
  "Icon"
] as const;

export type ButtonKind = typeof BUTTON_TYPES[number];

export interface ButtonProps {
  icon?: any;
  isSquare?: boolean;
  kind: ButtonKind;
  type?: 'button' | 'reset' | 'submit';
}

const getColors = (kind: ButtonKind) => {
  const buttonColors = {
    Primary: {
      backgroundColor: colors.primary.shade5,
      textColor: colors.white.base,
      borderColor: colors.primary.tint9,
      hover: {
        backgroundColor: colors.primary.shade6,
        textColor: colors.primary.tint9,
      }
    },
    Secondary: {
      backgroundColor: colors.secondary.shade5,
      textColor: colors.white.base,
      borderColor: colors.secondary.tint9,
      hover: {
        backgroundColor: colors.secondary.shade6,
        textColor: colors.secondary.tint9,
      }
    },
    Error: {
      backgroundColor: colors.red.shade3,
      textColor: colors.white.base,
      borderColor: colors.error.tint9,
      hover: {
        backgroundColor: colors.red.shade4,
        textColor: colors.error.tint9,
      }
    },
    Gold: {
      backgroundColor: colors.gold.tint3,
      textColor: colors.black.base,
      borderColor: colors.gold.shade3,
      hover: {
        backgroundColor: colors.gold.tint4,
        textColor: colors.gold.shade9,
      }
    },
    Icon: {
      backgroundColor: "transparent",
      textColor: colors.black.base,
      borderColor: "transparent",
      hover: {
        backgroundColor: "transparent",
        textColor: colors.error.shade9,
      }
    },
    Red: {
      backgroundColor: colors.red.shade1,
      textColor: colors.white.base,
      borderColor: colors.red.shade2,
      hover: {
        backgroundColor: colors.red.shade3,
        textColor: colors.white.base,
      }
    },
  };
  return buttonColors[kind];
};

const useStyle = createUseStyles({
  Button: {
    fontSize: "2rem",
    padding: "1rem 2rem",
    flex: "1",
    flexShrink: "1",
    display: "flex-inline",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: ({ isSquare }) => isSquare ? "0" : "2rem",

    backgroundColor: ({ kind }) => getColors(kind).backgroundColor,
    color: ({ kind }) => getColors(kind).textColor,
    border: ({ kind }) => `1px solid ${getColors(kind).borderColor}`,

    "&:hover": {
      backgroundColor: ({ kind }) => getColors(kind).hover.backgroundColor,
      color: ({ kind }) => getColors(kind).hover.textColor,
    },
  },
  Icon: {
    backgroundColor: "transparent",
    textColor: ({ kind }) => getColors(kind).textColor,
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
  kind,
  isSquare,
  children,
  type,
  ...props
}) => {
  const classes = useStyle({ isSquare, kind });
  return (
    <button
      type={type}
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
