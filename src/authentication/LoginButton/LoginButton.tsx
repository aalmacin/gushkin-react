import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button, { ButtonType } from "complib/Button";

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()} type={ButtonType.secondary} isSquare>Log In</Button>;
};

export default LoginButton;