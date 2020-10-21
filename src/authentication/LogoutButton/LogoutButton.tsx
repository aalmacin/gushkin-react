import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "components/Button";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  return <Button onClick={() => logout()} kind="Secondary" isSquare>Log Out</Button>;
};

export default LogoutButton;