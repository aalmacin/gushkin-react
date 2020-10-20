import React from "react";
import classes from "./InputField.module.scss";

export type InputFieldProps = {
  label: string;
  id: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, children, id }) => {
  return (
    <div className={classes.InputField}>
      {label && <label htmlFor={id}>{label}</label>}
      {children}
    </div>
  );
};

export default InputField;
