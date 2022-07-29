import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setActiveUser } from "./store/auth/slice";
import { Redirect } from 'react-router';
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "./store/auth/selectors";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Galleries from "./pages/Galleries";
import Gallery from "./pages/Gallery";
import Navbar from "./components/Navbar";
import authService from "./services/AuthService";
import GuestRoute from "./components/route/GuestRoute";
import PrivateRoute from "./components/route/PrivateRoute";


function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  async function handleLogout() {
    try {
      await authService.logout();
    } catch {
    } finally {
      dispatch(logout());
    }
  }

  useEffect(() => {
    async function loadActiveUser() {
      const activeUser = await authService.getActiveUser();
      dispatch(setActiveUser(activeUser));
    }

    if (isAuthenticated) {
      loadActiveUser();
    }
  }, []);

  

    
    return (
      <div>
        <Router>
          <Navbar/>
          <Switch>
            <GuestRoute exact path="/register">
              <Register/>
            </GuestRoute>
            <GuestRoute exact path="/login">
              <Login/>
            </GuestRoute>
            <Route exact path="/"> 
              <Redirect to="/galleries"/>
            </Route>
            <Route exact path="/galleries">
              <Galleries/>
            </Route>
              </Switch>
        </Router>
        </div>
    );
}
  

export default App;
