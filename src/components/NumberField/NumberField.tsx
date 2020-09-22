import InputField from "components/InputField";
import React from "react";

interface NumberFieldProps {
  label: string;
  placeholder?: string;
  value?: number;
  onChange: (e: any) => void;
}

const NumberField: React.FC<NumberFieldProps> = ({
  label,
  placeholder = "",
  onChange,
  value = ""
}) => {
  return (
    <InputField label={label}>
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputField>
  );
};

export default NumberField;
