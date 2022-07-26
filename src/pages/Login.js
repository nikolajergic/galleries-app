import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveUser, setToken } from "../store/auth/slice";
import authService from "../services/AuthService";
import { useHistory } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
      });

      async function handleSubmit(e) {
        e.preventDefault();
        const data = await authService.login(newUser);
        dispatch(setToken(data.token));
        dispatch(setActiveUser(data.user));

        history.push('/')
      }


      return (
        <div>
             <h2>Login</h2>
        <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 200,
          marginLeft: 15,
        }}
      >
        <input
          required
          type="text"
          minLength="2"
          value={newUser.email}
          placeholder="Email"
          onChange={({ target }) =>
          setNewUser({ ...newUser, email: target.value })
          }
        />
        <input
          required
          type="text"
          value={newUser.password}
          placeholder="Password"
          onChange={({ target }) =>
          setNewUser({ ...newUser, password: target.value })
          }
        />
         <button>Login</button>
        </form>

        </div>
      )
}

export default Login;