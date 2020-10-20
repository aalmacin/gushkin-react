import InputField from "components/InputField";
import React from "react";

export interface TextFieldProps {
  label: string;
  id: string;
}

const TextField: React.FC<React.HTMLProps<HTMLInputElement> & TextFieldProps> = ({
  label,
  id,
  ...props
}) => {
  return (
    <InputField label={label} id={id}>
      <input
        {...props}
        id={id}
        type="text"
      />
    </InputField>
  );
};

export default TextField;
