import { apiService } from "../services/ApiService";
import { history } from "../helpers/HistoryHelper";

export const userActions = {
  login,
  logout
};

function login(username, password) {
  return dispatch => {
    let apiEndpoint = "users/authenticate";
    let payload = {
      username: username,
      password: password
    };
    apiService
      .post(apiEndpoint, payload, false, true)
      .then(response => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("auth", response.data.isAuth);
          dispatch(setUserDetails(response.data));
          history.push("/home");
        }
      })
      .catch(response => {
        if (response.status === 401) {
          logout();
        }
      });
  };
}

function logout() {
  return dispatch => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    dispatch(logoutUser());
    history.push("/");
  };
}

export function setUserDetails(user) {
  return {
    type: "LOGIN_SUCCESS",
    auth: user.auth,
    token: user.token
  };
}

export function logoutUser() {
  return {
    type: "LOGOUT_SUCCESS",
    auth: false,
    token: ""
  };
}
