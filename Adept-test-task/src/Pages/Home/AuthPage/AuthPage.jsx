
import * as React from "react";
import Login from "../../../components/elements/auth/login/Login";
import Registration from "../../../components/elements/auth/registration/Registarion";
import { observer } from "mobx-react-lite";

const AuthPage = observer(() => {
  const [currentView, setCurrentView] = React.useState("login");

  const handleToggle = (view) => {
    setCurrentView(view);
  };

  return (
    <>
      {currentView === "login" && (
        <Login
          onToggle={() => handleToggle("registration")}
         
        />
      )}
      {currentView === "registration" && (
        <Registration
          onToggle={() => handleToggle("login")}
          
        />
      )}
    </>
  );
});

export default AuthPage;