import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setActiveUser,logout } from "./store/auth/slice";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "./store/auth/selectors";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Galleries from "./pages/Galleries";
import Gallery from "./pages/Gallery";
import CreateGallery from "./pages/CreateGallery";
import Navbar from "./components/Navbar";
import authService from "./services/AuthService";
import GuestRoute from "./components/route/GuestRoute";
import PrivateRoute from "./components/route/PrivateRoute";


function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

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
          <PrivateRoute exact path="/galleries/me">
            <Galleries selfId={isAuthenticated ? (activeUser?.id) : null}/>
          </PrivateRoute>
          <PrivateRoute exact path="/galleries/create">
            <CreateGallery/>
          </PrivateRoute>
          <Route exact path="/galleries/:id">
            <Gallery/>
          </Route>
          <Route exact path="/authors/:id">
            <Galleries/>
          </Route>
          <PrivateRoute exact path ="/edit-gallery/:id">
            <CreateGallery/>
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}
  

export default App;
