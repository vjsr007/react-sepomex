const initialState = {
    employee: [],
    employeeId: 0,
    firstName: "",
    lastName: "",
    POB: "",
    lastChange: 0,
    userID: 0,
    active: false,
    imageData: ""
};

export function employee(state = initialState, action) {
    let { employee } = state;

    switch (action.type) {
        case "FETCHED_ALL_EMPLOYEE":
            return {
                ...state,
                employee: action.employee
            };
        case "EMPLOYEE_DETAIL":
            const employeeDetail = parseInt(action.id) === 0 ? [{
                employeeId: 0,
                firstName: "",
                lastName: "",
                POB: "",
                lastChange: 0,
                userID: 0,
                active: false,
                imageData: ""
            }] : employee.filter(c => parseInt(c.employeeId) === parseInt(action.id))
            return {
                ...state,
                ...employeeDetail[0]
            };
        case "EMPLOYEE_CREATED_SUCCESSFULLY":
            return {
                ...state
            }
        case "EMPLOYEE_UPDATED":
            const employeeEdit = employee.map(c => parseInt(c.employeeId) === parseInt(action.employee.employeeId) ? action.employee : c);
            return {
                ...state,
                employee: employeeEdit
            };
        case "DELETED_EMPLOYEE_DETAILS":
            var removeIndex = employee.map(function (c) { return c.employeeId; }).indexOf(action);
            employee.splice(removeIndex, 1);
            return {
                ...state,
                employee: employee
            };
        case "HANDLE_ON_CHANGE":
            return {
                ...state,
                [action.props]: action.value
            };
        default:
            return state;
    }
}
