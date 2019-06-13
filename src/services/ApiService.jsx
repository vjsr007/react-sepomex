import axios from "axios";
import config from "../configs/GlobalConfig";
import { openSnackbar } from "../components/Notifier";
import { reject } from "q";
import { history } from "../helpers/HistoryHelper";

export const apiService = {
  get,
  post,
  put,
  deleteDetail
};

function get(apiEndpoint, useApi) {
  useApi = useApi == null ? true : useApi;
  return axios
    .get(config.baseUrl + (useApi ? "api/" : "") + apiEndpoint, getOptions())
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
      openSnackbar({ message: err.message, variant: "error" });
      NotAuthorize(err);
      return reject(err);
    });
}

function post(apiEndpoint, payload, useApi, withoutGetOptions) {
  useApi = useApi == null ? true : useApi;
  return axios
    .post(
      config.baseUrl + (useApi ? "api/" : "") + apiEndpoint,
      payload,
      withoutGetOptions || true ? null : getOptions()
    )
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
      const {
        response: {
          data: { message }
        }
      } = err;
      openSnackbar({
        message: message || err.message,
        variant: "error"
      });
      NotAuthorize(err);
      return reject(err);
    });
}

function put(apiEndpoint, payload, useApi) {
  useApi = useApi == null ? true : useApi;
  return axios
    .put(
      config.baseUrl + (useApi ? "api/" : "") + apiEndpoint,
      payload,
      getOptions()
    )
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
      openSnackbar({
        message: err.message,
        variant: "error"
      });
      NotAuthorize(err);
      return reject(err);
    });
}

function deleteDetail(apiEndpoint, useApi) {
  useApi = useApi == null ? true : useApi;
  return axios
    .delete(config.baseUrl + (useApi ? "api/" : "") + apiEndpoint, getOptions())
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
      openSnackbar({
        message: err.message,
        variant: "error"
      });
      NotAuthorize(err);
      return reject(err);
    });
}

function NotAuthorize(error) {
  if (error.response.status === 401) {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    history.push("/");
    return dispatch => {
      dispatch({
        type: "LOGOUT_SUCCESS",
        auth: false,
        token: ""
      });
    };
  }
  if (error.response.status === 404) {
    history.push("/");
  }
}

function getOptions() {
  let options = {};
  if (localStorage.getItem("token")) {
    options.headers = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
  }
  return options;
}
