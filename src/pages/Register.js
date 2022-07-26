
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import authService from "../services/AuthService";
import { setActiveUser, setToken } from "../store/auth/slice";

export default function Register() {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await authService.register(userData);
        dispatch(setToken(data.token));
        dispatch(setActiveUser(data.user));
      }

      return(
    <div>
        <h2>Register</h2>
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
          value={userData.first_name}
          placeholder="First name"
          onChange={({ target }) =>
          setUserData({ ...userData, first_name: target.value })
          }
        />
        <input
          required
          type="text"
          value={userData.last_name}
          placeholder="Last name"
          onChange={({ target }) =>
          setUserData({ ...userData, last_name: target.value })
          }
        />
        <input
          required
          type="text"
          value={userData.email}
          placeholder="Email"
          onChange={({ target }) =>
          setUserData({ ...userData, email: target.value })
          }
        />
        <input
          required
          type="text"
          value={userData.password}
          placeholder="Password"
          onChange={({ target }) =>
          setUserData({ ...userData, password: target.value })
          }
        />
        <input required type="checkbox" name="terms" value={true}
                onChange={({ target }) => setUserData({ ...userData, terms: target.checked })}/>

         <button>Register</button>
        </form>
    </div>
      )
}