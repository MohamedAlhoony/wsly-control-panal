import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchCategories } from "../categoriesManagementActions/categoriesPage-actions";

export const fetchInitialData = ({
  storeId,
  categoryId,
  preferenceId,
  productId,
}) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const categories = await fetchCategories({ storeId });
      const category = categories.find(
        (category) => category.Id === Number.parseInt(categoryId)
      );
      const product = category.items.find(
        (item) => item.Id === Number.parseInt(productId)
      );
      const pref = product.preferences.find(
        (pref) => pref.id === Number.parseInt(preferenceId)
      );
      pref.choices = pref.choices.map((choice) => {
        return {
          ...choice,
          isDefault: choice.Id === pref.choice.Id ? true : false,
        };
      });
      if (pref.choices?.length) {
        dispatch({
          type: "choicesPage-choices",
          data: pref.choices,
        });
        dispatch({
          type: "choicesPage-filteredChoices",
          data: pref.choices,
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
        category.Id.toString().indexOf(search) !== -1 ||
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

const sendSetAsDefault = (choiceId) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${baseURI}/store/DefaultChoic?ChoicID=${choiceId}`,
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

export const setAsDefault = ({
  storeId,
  categoryId,
  preferenceId,
  productId,
  choiceId,
}) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      await sendSetAsDefault(choiceId);
      dispatch(
        layoutActions.alertModal({
          show: true,
        })
      );
      const categories = await fetchCategories({ storeId });
      const category = categories.find(
        (category) => category.Id === Number.parseInt(categoryId)
      );
      const product = category.items.find(
        (item) => item.Id === Number.parseInt(productId)
      );
      const pref = product.preferences.find(
        (pref) => pref.id === Number.parseInt(preferenceId)
      );
      pref.choices = pref.choices.map((choice) => {
        return {
          ...choice,
          isDefault: choice.Id === pref.choice.Id ? true : false,
        };
      });
      if (pref.choices?.length) {
        dispatch({
          type: "choicesPage-choices",
          data: pref.choices,
        });
        dispatch({
          type: "choicesPage-filteredChoices",
          data: pref.choices,
        });
      }

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
      case "isDefault":
        choices = choices.sort((a, b) => {
          a = a.isDefault;
          b = b.isDefault;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "Id":
        choices = choices.sort((a, b) => {
          a = a.Id;
          b = b.Id;
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
