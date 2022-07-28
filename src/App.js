import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setActiveUser } from "./store/auth/slice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Galleries from "./pages/Galleries";
import CreateGallery from "./pages/CreateGallery";
import Gallery from "./pages/Gallery";
import authService from "./services/AuthService";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "./store/auth/selectors";
import GuestRoute from "./components/route/GuestRoute";
import PrivateRoute from "./components/route/PrivateRoute";
import Navbar from "./components/Navbar";

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
        <nav>
          <ul>
            <li>
            <Link to="/login">Login</Link>
            </li>
            <li>
            <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/galleries"> My Galleries</Link>
            </li>
          </ul>
        </nav>
        <Switch>
        <GuestRoute exact path="/login">
            <Login />
          </GuestRoute>
          <GuestRoute exact path="/register">
            <Register />
          </GuestRoute>
          <Route exact path='/'>
            <Galleries />
          </Route>
          <Route exact path="/galleries">
            <Galleries />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
