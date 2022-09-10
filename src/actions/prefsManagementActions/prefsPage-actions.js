import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchCategories } from "../categoriesManagementActions/categoriesPage-actions";

export const fetchInitialData = ({ storeId, categoryId, productId }) => {
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
      if (product.preferences?.length) {
        dispatch({
          type: "prefsPage-prefs",
          data: product.preferences,
        });
        dispatch({
          type: "prefsPage-filteredPrefs",
          data: product.preferences,
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
    const prefs = getState().prefsPage_reducer.prefs;
    const search = getState().prefsPage_reducer.search.toLowerCase().trim();
    const filteredPrefs = prefs.filter(
      (category) =>
        category.name.toLowerCase().indexOf(search) !== -1 ||
        category.id.toString().indexOf(search) !== -1
    );
    dispatch({
      type: "prefsPage-filteredPrefs",
      data: filteredPrefs,
    });
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "prefsPage-isLoading", data: isLoading });
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
      const prefs = await fetchCategories();
      dispatch({
        type: "prefsPage-prefs",
        data: prefs,
      });
      dispatch({
        type: "prefsPage-filteredPrefs",
        data: prefs,
      });

      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};
export const prefsSortBy = (column) => {
  return (dispatch, getState) => {
    let prefs = getState().prefsPage_reducer.filteredPrefs.slice();
    if (column === getState().prefsPage_reducer.tableSorting.column) {
      dispatch({
        type: "prefsPage-tableSorting",
        data: {
          column,
          direction:
            getState().prefsPage_reducer.tableSorting.direction === "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "prefsPage-filteredPrefs",
        data: prefs.reverse(),
      });
      return;
    }
    switch (column) {
      case "name":
        prefs = prefs.sort((a, b) => {
          a = a.name;
          b = b.name;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "id":
        prefs = prefs.sort((a, b) => {
          a = a.id;
          b = b.id;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "prefsPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "prefsPage-filteredPrefs",
      data: prefs,
    });
  };
};
