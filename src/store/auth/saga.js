import { call, put, takeLatest } from "redux-saga/effects";
import authService from "../../services/AuthService";
 
import {
  login,
  logout,
  setToken,
  setActiveUser,
  register,
  getActiveUser,
  setRegistrationErrors,
  setLoginError,
} from "./slice";


function* loginHandler(action) {
  yield put(setLoginError(false));
  try {
    const data = yield call(authService.login, action.payload);
    localStorage.setItem("token", data.token);

    yield put(setToken(data.token));
    yield put(setActiveUser(data.user));
  } catch (e) {
    if (e.response.status == 401) {
      yield put(setLoginError(true));
    }
  }
}

function* registerHandler(action) {
  yield put(setRegistrationErrors(null));
  try {
    const data = yield call(authService.register, action.payload);
    localStorage.setItem("token", data.token);
    yield put(setToken(data.token));
    yield put(setActiveUser(data.user));
  } catch (e) {
    if (e.response.status == 422) {
      yield put(setRegistrationErrors(e.response.data.errors));
    }
  }
}

function* handleLogout(){
  try {
      yield call(authService.logout);
      yield put(setToken(null));
      yield put(setActiveUser(null));
  } catch (error) {
      yield put(setToken(null));
      yield put(setActiveUser(null));
      alert("Can't logout as a guest");
  }
}

function* getActiveUserHandler() {
  try {
    const activeUser = yield call(authService.getActiveUser);
    yield put(setActiveUser(activeUser));
  } catch (e) {
    console.log(e);
  }
}


export function* watchLogin() {
  yield takeLatest(login.type, loginHandler);
}

export function* watchRegister() {
  yield takeLatest(register.type, registerHandler);
}

export function* watchLogout(){
  yield takeLatest(logout.type, handleLogout);
}

export function* watchGetActiveUser() {
  yield takeLatest(getActiveUser.type, getActiveUserHandler);
}