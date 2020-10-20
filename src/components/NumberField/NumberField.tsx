import InputField from "components/InputField";
import React from "react";

export interface NumberFieldProps {
  label: string;
  id: string;
}

const NumberField: React.FC<React.HTMLProps<HTMLInputElement> & NumberFieldProps> = ({
  label,
  id,
  ...props
}) => {
  return (
    <InputField label={label} id={id}>
      <input
        {...props}
        id={id}
        type="number"
      />
    </InputField>
  );
};

export default NumberField;
