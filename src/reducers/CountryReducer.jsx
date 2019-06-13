const initialState = {
  country: [],
  countryID: 1,
  name: "",
  code: "",
  currency: "",
  currencyCode: "",
  lastChange: "",
  userID: 1,
  active: true,
  anchor: "left",
  open: false,
  page: 0,
  rowsPerPage: 5
};

export function country(state = initialState, action) {
  switch (action.type) {
    case "FETCHED_ALL_COUNTRY":
      return {
        ...state,
        country: action.country
      };
    case "COUNTRY_DETAIL":
      return {
        ...state,
        countryID: action.countryID,
        name: action.name,
        code: action.code,
        currencyCode: action.currencyCode,
        currency: action.currency,
        lastChange: action.lastChange,
        userID: action.userID,
        active: action.active
      };
    case "COUNTRY_UPDATED":
      return state;
    case "HANDLE_ON_CHANGE":
      return {
        ...state,
        [action.props]: action.value
      };
    default:
      return state;
  }
}
