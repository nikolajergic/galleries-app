import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { selectIsAuthenticated } from "../store/auth/selectors";


const isAuthenticated = useSelector(selectIsAuthenticated);

return (
  <Route {...props}>
    {isAuthenticated ? children : <Redirect to="login" />}
  </Route>
);
