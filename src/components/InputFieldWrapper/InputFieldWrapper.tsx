import React from "react";
import { createUseStyles } from 'react-jss';
import { colors } from "components/variables";

const useStyles = createUseStyles({
  InputFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderBottom: [1, 'solid', colors.primary.shade8],

    label: {
      fontSize: '2rem',
    },

    input: {
      padding: '1rem',
      margin: ['1rem', 0],
      fontSize: '2rem',
    },
  }
});

export type InputFieldWrapperProps = {
  label: string;
  id: string;
};

const InputFieldWrapper: React.FC<InputFieldWrapperProps> = ({ label, children, id }) => {
  const classes = useStyles();
  return (
    <div className={classes.InputFieldWrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      {children}
    </div>
  );
};

export default InputFieldWrapper;
