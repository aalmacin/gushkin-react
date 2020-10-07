import InputField from "components/InputField";
import React from "react";

export interface TextFieldProps {
  label: string;
}

const TextField: React.FC<React.HTMLProps<HTMLInputElement> & TextFieldProps> = ({
  label,
  ...props
}) => {
  return (
    <InputField label={label}>
      <input
        {...props}
        type="text"
      />
    </InputField>
  );
};

export default TextField;
