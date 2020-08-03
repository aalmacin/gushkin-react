import InputField from "complib/InputField";
import React from "react";

interface TextFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (e: any) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder = "",
  onChange,
  value = ""
}) => {
  return (
    <InputField label={label}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputField>
  );
};

export default TextField;
