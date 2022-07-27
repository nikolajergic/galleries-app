import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated} from "../../store/auth/selectors";

export default function PublicRoute({ children, ...props }) {
  const isGuest = !useSelector(selectIsAuthenticated);

  return <Route {...props}>{isGuest ? children : <Redirect to="/" />}</Route>;
}
