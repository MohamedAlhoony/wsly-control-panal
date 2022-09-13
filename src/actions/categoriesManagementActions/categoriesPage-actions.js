import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";

export const fetchInitialData = ({ storeId }) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const categories = await fetchCategories({ storeId });
      if (categories.length) {
        dispatch({
          type: "categoriesPage-categories",
          data: categories,
        });
        dispatch({
          type: "categoriesPage-filteredCategories",
          data: categories,
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
export const fetchCategories = ({ storeId }) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      var response = await fetch(
        `${baseURI}/store/ProductList?StoreID=${storeId}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.categories);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchAllCategories = ({ storeId }) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      var response = await fetch(
        `${baseURI}/store/Categories?StoreID=${storeId}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
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

export const updateFilteredResult = () => {
  return (dispatch, getState) => {
    const categories = getState().categoriesPage_reducer.categories;
    const search = getState()
      .categoriesPage_reducer.search.toLowerCase()
      .trim();
    const filteredCategories = categories.filter(
      (category) =>
        category.CategoryName.toLowerCase().indexOf(search) !== -1 ||
        category.CategoryID.toString().indexOf(search) !== -1
    );
    dispatch({
      type: "categoriesPage-filteredCategories",
      data: filteredCategories,
    });
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "categoriesPage-isLoading", data: isLoading });
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
      const categories = await fetchCategories();
      dispatch({
        type: "categoriesPage-categories",
        data: categories,
      });
      dispatch({
        type: "categoriesPage-filteredCategories",
        data: categories,
      });

      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};
export const categoriesSortBy = (column) => {
  return (dispatch, getState) => {
    let categories =
      getState().categoriesPage_reducer.filteredCategories.slice();
    if (column === getState().categoriesPage_reducer.tableSorting.column) {
      dispatch({
        type: "categoriesPage-tableSorting",
        data: {
          column,
          direction:
            getState().categoriesPage_reducer.tableSorting.direction ===
            "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "categoriesPage-filteredCategories",
        data: categories.reverse(),
      });
      return;
    }
    switch (column) {
      case "CategoryName":
        categories = categories.sort((a, b) => {
          a = a.CategoryName;
          b = b.CategoryName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "CategoryID":
        categories = categories.sort((a, b) => {
          a = a.CategoryID;
          b = b.CategoryID;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "categoriesPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "categoriesPage-filteredCategories",
      data: categories,
    });
  };
};
