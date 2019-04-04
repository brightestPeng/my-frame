import { takeEvery, call, put } from "redux-saga/effects";
import { actionTypes } from "utils/constant";
import { getLocalStorage } from "utils/method";
import { routerActions } from "connected-react-router";
import loginService from "../services/login";

const Timer = time => {
  return new Promise(resolve => {
    setTimeout(
      () => {
        resolve();
      },
      time ? time : 1000
    );
  });
};

//刷新界面自动登录
function* autoLogin(action) {
  yield put({ type: "systemModel/save", payload: { pageLoading: true } });
  let systemList = [];
  let menuList = [];
  let login = false;
  yield call(Timer, 2000);
  const { username, password } = getLocalStorage(["username", "password"]);
  const { code, data } = yield call(loginService.login, {
    username,
    password
  });

  if (code === "200") {
    if (data) {
      systemList = typeof data.systemList !== "undefined" ? data.systemList : [];
      menuList = typeof data.menuList !== "undefined" ? data.menuList : [];
      login = true;
    }
  } else {
    action.callback();
  }
  yield put({
    type: "systemModel/save",
    payload: {
      systemList,
      menuList,
      login,
      pageLoading: false
    }
  });
}

//点击登录
function* loginIn(action) {
  let systemList = [];
  let menuList = [];
  let login = false;
  let errors = {};
  yield put({
    type: "systemModel/login",
    payload: {
      loading: true
    }
  });
  const loginData = yield call(loginService.login, {
    ...action.payload
  });
  const { code, data, errorField, message } = loginData;
  if (code === "200") {
    systemList = typeof data.systemList !== "undefined" ? data.systemList : [];
    menuList = typeof data.menuList !== "undefined" ? data.menuList : [];
    login = true;
    yield put(routerActions.push("/home"));
  } else {
    action.callback({ [`${errorField}`]: { errors: [new Error(message)] } });
  }
  yield put({
    type: "systemModel/save",
    payload: {
      systemList,
      menuList,
      login,
      loading: false,
      errors
    }
  });
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.LoginIn, loginIn);
  yield takeEvery(actionTypes.autoLogin, autoLogin);
}
