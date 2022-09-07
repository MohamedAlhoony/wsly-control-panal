import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchCategories } from "../categoriesManagementActions/categoriesPage-actions";

export const fetchInitialData = ({ storeId, categoryId, preferenceId }) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const categories = await fetchCategories({ storeId });
      const category = categories.find(
        (category) => category.CategoryID === Number.parseInt(categoryId)
      );
      console.log(category);
      const pref = category.PreferenceList.find(
        (pref) => pref.PreferenceID === Number.parseInt(preferenceId)
      );
      if (pref.ChoicList?.length) {
        dispatch({
          type: "choicesPage-choices",
          data: pref.ChoicList,
        });
        dispatch({
          type: "choicesPage-filteredChoices",
          data: pref.ChoicList,
        });
      }
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(
        layoutActions.handleHttpError(error, {
          reload: true,
          willGoBack: true,
        })
      );
      dispatch(isLoading(false));
    }
  };
};

export const updateFilteredResult = () => {
  return (dispatch, getState) => {
    const choices = getState().choicesPage_reducer.choices;
    const search = getState().choicesPage_reducer.search.toLowerCase().trim();
    const filteredChoices = choices.filter(
      (category) =>
        category.Name.toLowerCase().indexOf(search) !== -1 ||
        category.ChoicID.toString().indexOf(search) !== -1 ||
        category.Price.toString().indexOf(search) !== -1
    );
    dispatch({
      type: "choicesPage-filteredChoices",
      data: filteredChoices,
    });
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "choicesPage-isLoading", data: isLoading });
  };
};

const sendRemoveCustomer = (customerID) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${baseURI}/dashboard/users/${customerID}`,
        requestOptions
      );
      const responseText = await response.text();
      const body = responseText ? JSON.parse(responseText) : "";
      if (response.status === 200) {
        resolve(body);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const removeCustomer = (customerID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      await sendRemoveCustomer(customerID);
      dispatch(
        layoutActions.alertModal({
          show: true,
        })
      );
      const choices = await fetchCategories();
      dispatch({
        type: "choicesPage-choices",
        data: choices,
      });
      dispatch({
        type: "choicesPage-filteredChoices",
        data: choices,
      });

      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};
export const choicesSortBy = (column) => {
  return (dispatch, getState) => {
    let choices = getState().choicesPage_reducer.filteredChoices.slice();
    if (column === getState().choicesPage_reducer.tableSorting.column) {
      dispatch({
        type: "choicesPage-tableSorting",
        data: {
          column,
          direction:
            getState().choicesPage_reducer.tableSorting.direction ===
            "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "choicesPage-filteredChoices",
        data: choices.reverse(),
      });
      return;
    }
    switch (column) {
      case "Name":
        choices = choices.sort((a, b) => {
          a = a.Name;
          b = b.Name;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "ChoicID":
        choices = choices.sort((a, b) => {
          a = a.ChoicID;
          b = b.ChoicID;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "Price":
        choices = choices.sort((a, b) => {
          a = a.Price;
          b = b.Price;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "choicesPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "choicesPage-filteredChoices",
      data: choices,
    });
  };
};
