import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchCategories } from "../categoriesManagementActions/categoriesPage-actions";

export const fetchInitialData = ({ storeId, categoryId }) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const categories = await fetchCategories({ storeId });
      const category = categories.find(
        (category) => category.Id === Number.parseInt(categoryId)
      );
      if (category.items?.length) {
        dispatch({
          type: "productsPage-products",
          data: category.items,
        });
        dispatch({
          type: "productsPage-filteredProducts",
          data: category.items,
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
    const products = getState().productsPage_reducer.products;
    const search = getState().productsPage_reducer.search.toLowerCase().trim();
    const filteredProducts = products.filter(
      (category) =>
        category.Name.toLowerCase().indexOf(search) !== -1 ||
        category.PreferenceID.toString().indexOf(search) !== -1
    );
    dispatch({
      type: "productsPage-filteredProducts",
      data: filteredProducts,
    });
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "productsPage-isLoading", data: isLoading });
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
      const products = await fetchCategories();
      dispatch({
        type: "productsPage-products",
        data: products,
      });
      dispatch({
        type: "productsPage-filteredProducts",
        data: products,
      });

      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};
export const productsSortBy = (column) => {
  return (dispatch, getState) => {
    let products = getState().productsPage_reducer.filteredProducts.slice();
    if (column === getState().productsPage_reducer.tableSorting.column) {
      dispatch({
        type: "productsPage-tableSorting",
        data: {
          column,
          direction:
            getState().productsPage_reducer.tableSorting.direction ===
            "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "productsPage-filteredProducts",
        data: products.reverse(),
      });
      return;
    }
    switch (column) {
      case "Name":
        products = products.sort((a, b) => {
          a = a.Name;
          b = b.Name;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "PreferenceID":
        products = products.sort((a, b) => {
          a = a.PreferenceID;
          b = b.PreferenceID;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "productsPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "productsPage-filteredProducts",
      data: products,
    });
  };
};
