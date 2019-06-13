export const paginationAction = {
  changePage,
  changeRowsPerPage,
  changeRows,
  changeOrder,
  changeSelected
};

export function changePage(page) {
  return dispatch => {
    dispatch({
      type: "CHANGE_PAGE",
      page: page
    });
  };
}

export function changeRowsPerPage(rowsPerPage) {
  return dispatch => {
    dispatch({
      type: "CHANGE_ROWS_PER_PAGE",
      rowsPerPage: rowsPerPage
    });
  };
}

export function changeRows(rows) {
  return dispatch => {
    dispatch({
      type: "CHANGE_ROWS_PER_PAGE",
      rows: rows
    });
  };
}

export function changeSelected(payload) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SELECTED",
      selected: payload.selected
    });
  };
}

export function changeOrder(order, orderBy) {
  return dispatch => {
    dispatch({
      type: "CHANGE_ORDER",
      order,
      orderBy
    });
  };
}