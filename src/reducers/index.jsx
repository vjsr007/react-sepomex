import { combineReducers } from "redux";
import { country } from "./CountryReducer";
import { employee } from "./EmployeeReducer";
import { pagination } from "./PaginationReducer";

const rootReducer = combineReducers({
  country,
  employee,
  pagination
});

export default rootReducer;
