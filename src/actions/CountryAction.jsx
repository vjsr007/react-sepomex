import { apiService } from "../services/ApiService";
import { history } from "../helpers/HistoryHelper";

export const countryAction = {
  getCountry,
  getCountryById,
  onChangeProps,
  editCountryInfo,
  createCountry,
  deleteCountryById,
  deleteCountries,
  getEmptyCountry
};

function getCountry() {
  return dispatch => {
    let apiEndpoint = "country";
    apiService
      .get(apiEndpoint)
      .then(response => {
        dispatch(changeCountryList(response.data));
      })
      .catch(err => {
        console.log("Error");
        console.log(err);
      });
  };
}

function createCountry(payload) {
  return dispatch => {
    let apiEndpoint = "country/";
    apiService.post(apiEndpoint, payload).then(response => {
      dispatch(createCountryInfo());
      history.push("/country");
    });
  };
}

function getCountryById(id) {
  return dispatch => {
    let apiEndpoint = "country/" + id;
    apiService.get(apiEndpoint).then(response => {
      dispatch(editCountryDetails(response.data));
    });
  };
}

function getEmptyCountry(id) {
  return dispatch => {
    dispatch(
      editCountryDetails({
        countryID: 0,
        name: "",
        code: "",
        currencyCode: "",
        currency: "",
        lastChange: "",
        userID: "",
        active: false
      })
    );
  };
}

function onChangeProps(props, event) {
  return dispatch => {
    dispatch(
      handleOnChangeProps(
        props,
        props === "active" ? event.target.checked : event.target.value
      )
    );
  };
}

function editCountryInfo(id, payload) {
  return dispatch => {
    let apiEndpoint = "country/" + id;
    apiService.put(apiEndpoint, payload).then(response => {
      dispatch(updatedCountryInfo());
      history.push("/country");
    });
  };
}

function deleteCountryById(id) {
  return dispatch => {
    let apiEndpoint = "country/" + id;
    apiService.deleteDetail(apiEndpoint).then(response => {
      dispatch(deleteCountryDetails());
      dispatch(countryAction.getCountry());
    });
  };
}

function deleteCountries(ids) {
  return dispatch => {
    let apiEndpoint = "country/masivedelete";
    apiService.post(apiEndpoint,ids).then(response => {
      dispatch(deleteCountryDetails());
      dispatch(countryAction.getCountry());
    });
  };
}

export function changeCountryList(country) {
  return {
    type: "FETCHED_ALL_COUNTRY",
    country: country.map((c) => { return { ...c, active: c.active || false }  })
  };
}

export function handleOnChangeProps(props, value) {
  return {
    type: "HANDLE_ON_CHANGE",
    props: props,
    value: value
  };
}

export function editCountryDetails(country) {
  return {
    type: "COUNTRY_DETAIL",
    countryID: country.countryID,
    name: country.name,
    code: country.code,
    currency: country.currency,
    currencyCode: country.currencyCode,
    lastChange: country.lastChange,
    userID: country.userID,
    active: country.active || false
  };
}

export function updatedCountryInfo() {
  return {
    type: "COUNTRY_UPDATED"
  };
}

export function createCountryInfo() {
  return {
    type: "COUNTRY_CREATED_SUCCESSFULLY"
  };
}

export function deleteCountryDetails() {
  return {
    type: "DELETED_COUNTRY_DETAILS"
  };
}
