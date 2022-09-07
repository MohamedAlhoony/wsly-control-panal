import { combineReducers } from "redux";
import loginPage_reducer from "./loginPage-reducer";
import layout_reducer from "./layout";
import storesPage_reducer from "./storesManagementReducers/storesPage-reducer";
import categoriesPage_reducer from "./categoriesManagementReducers/categoriesPage-reducer";
import prefsPage_reducer from "./prefsManagementReducers/prefsPage-reducer";
import choicesPage_reducer from "./choicesManagementReducers/choicesPage-reducer";
const appReducer = combineReducers({
  layout_reducer,
  loginPage_reducer,
  storesPage_reducer,
  categoriesPage_reducer,
  prefsPage_reducer,
  choicesPage_reducer,
});

export default (state, action) => {
  switch (action.type) {
    case "reset-app":
      state = undefined;
      break;
    case "reset-storesPage_reducer":
      state.storesPage_reducer = undefined;
      break;
    case "reset-categoriesPage_reducer":
      state.categoriesPage_reducer = undefined;
      break;
    case "reset-prefsPage_reducer":
      state.prefsPage_reducer = undefined;
      break;
    case "reset-choicesPage_reducer":
      state.choicesPage_reducer = undefined;
      break;

    default:
  }
  return appReducer(state, action);
};
