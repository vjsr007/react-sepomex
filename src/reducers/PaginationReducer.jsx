const initialState = {
  rows: [],
  page: 0,
  rowsPerPage: 5,
  order: "asc",
  orderBy: "id",
  selected: []
};

export function pagination(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_PAGE":
      return {
        ...state,
        page: action.page
      };
    case "CHANGE_ROWS_PER_PAGE":
      return {
        ...state,
        rowsPerPage: action.rowsPerPage
      };
    case "CHANGE_ROWS":
      return {
        ...state,
        rows: action.rows
      };
    case "CHANGE_SELECTED":
      return {
        ...state,
        selected: action.selected
      };
    case "CHANGE_ORDER":
      return {
        ...state,
        order: action.order,
        orderBy: action.orderBy
      };
    default:
      return state;
  }
}
