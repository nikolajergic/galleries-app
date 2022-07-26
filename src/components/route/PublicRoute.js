import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { selectIsAuthenticated } from "../store/auth/selectors";

export default function PublicRoute({ children, ...props }) {
  const isGuest = !useSelector(selectIsAuthenticated);

  return <Route {...props}>{isGuest ? children : <Redirect to="/" />}</Route>;
}
