import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "complib/Button";
import { ButtonType } from "complib/Button/Button";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  return <Button onClick={() => logout()} type={ButtonType.error}>Log Out</Button>;
};

export default LogoutButton;