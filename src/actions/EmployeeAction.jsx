import { apiService } from "../services/ApiService";
import { history } from "../helpers/HistoryHelper";

export const employeeAction = {
  getEmployee,
  getEmployeeById,
  onChangeProps,
  editEmployeeInfo,
  createEmployee,
  deleteEmployeeById,
  getEmptyEmployee
};

function getEmployee() {
  return dispatch => {
    let apiEndpoint = "employee";
    apiService
      .get(apiEndpoint)
      .then(response => {
        dispatch(changeEmployeeList(response.data));
      })
      .catch(err => {
        console.log("Error");
        console.log(err);
      });
  };
}

function createEmployee(payload) {
  return dispatch => {
    let apiEndpoint = "employee";
    apiService.post(apiEndpoint, payload).then(response => {
      dispatch(createEmployeeInfo(payload));
      history.push("/employee");
    });
  };
}

function getEmployeeById(id) {
  return dispatch => {
    let apiEndpoint = "employee/" + id;
    apiService.get(apiEndpoint).then(response => {
      dispatch(editEmployeeDetails(id));
    });
  };
}

function getEmptyEmployee() {
  return dispatch => {
    dispatch(
      editEmployeeDetails(0)
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

function editEmployeeInfo(id, payload) {
  return dispatch => {
    let apiEndpoint = "employee/" + id;
    apiService.put(apiEndpoint, payload).then(response => {
      dispatch(updatedEmployeeInfo(payload));
      history.push("/employee");
    });
  };
}

function deleteEmployeeById(id) {
  return dispatch => {
    let apiEndpoint = "employee/" + id;
    apiService.deleteDetail(apiEndpoint).then(response => {
      dispatch(deleteEmployeeDetails(id));
      dispatch(employeeAction.getEmployee());
    });
  };
}

export function changeEmployeeList(employee) {
  return {
    type: "FETCHED_ALL_EMPLOYEE",
    employee: employee.map((c) => { return { ...c, active: c.active || false } })
  };
}

export function handleOnChangeProps(props, value) {
  return {
    type: "HANDLE_ON_CHANGE",
    props: props,
    value: value
  };
}

export function editEmployeeDetails(id) {
  return {
    type: "EMPLOYEE_DETAIL",
    id: id
  };
}

export function updatedEmployeeInfo(employee) {
  return {
    type: "EMPLOYEE_UPDATED",
    employee: employee
  };
}

export function createEmployeeInfo(payload) {
  return {
    type: "EMPLOYEE_CREATED_SUCCESSFULLY",
    employee: payload
  };
}

export function deleteEmployeeDetails(id) {
  return {
    type: "DELETED_EMPLOYEE_DETAILS",
    id: id
  };
}
