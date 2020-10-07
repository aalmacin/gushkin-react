import InputField from "components/InputField";
import React from "react";

export interface NumberFieldProps {
  label: string;
}

const NumberField: React.FC<React.HTMLProps<HTMLInputElement> & NumberFieldProps> = ({
  label,
  ...props
}) => {
  return (
    <InputField label={label}>
      <input
        {...props}
        type="number"
      />
    </InputField>
  );
};

export default NumberField;
