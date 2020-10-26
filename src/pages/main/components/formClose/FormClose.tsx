import React from "react";
import classes from "./FormClose.module.scss";
import Button from "components/Button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface FormCloseProps {
  onClose: () => void;
}

const FormClose: React.FC<FormCloseProps> = ({ onClose }) => {
  return (
    <div className={classes.FormClose}>
      <Button
        kind="Secondary"
        onClick={onClose}
        icon={faTimes}
        aria-label="Close Modal"
      />
    </div>
  );
};

export default FormClose;
