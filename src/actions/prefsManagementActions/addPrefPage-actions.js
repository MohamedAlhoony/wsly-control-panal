import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import {
  fetchAllCategories,
  fetchCategories,
} from "../categoriesManagementActions/categoriesPage-actions";

const sendFormData = ({ storeId, categoryId, productId, prefs }) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({
        ItemID: Number.parseInt(productId),
        PreferenceList: prefs
          .filter((pref) => pref.selected === true)
          .map((pref) => {
            return {
              PreferenceID: Number.parseInt(pref.PreferenceID),
              Name: pref.Name,
              DefaultChoic: pref.ChoicList.filter(
                (choice) => choice.isDefault === true
              )[0].ChoicID,
              ChoicList: pref.ChoicList.filter(
                (choice) => choice.selected === true
              ).map((choice) => {
                return {
                  ChoicID: choice.ChoicID,
                  Price: choice.Price,
                  Name: choice.Name,
                };
              }),
            };
          }),
        // [
        //   {
        // PreferenceID: 2,
        // Name: "name",
        // DefaultChoic: 4,
        //     ChoicList: [
        //       {
        //         ChoicID: 2,
        //         Price: 5,
        //         Name: "name",
        //       },
        //     ],
        //   },
        // ],
      }),
    };

    try {
      const response = await fetch(
        `${baseURI}/store/ItemPreference`,
        requestOptions
      );
      let body = {};
      try {
        body = JSON.parse(await response.text());
      } catch (err) {
        body.message = "";
      }
      if (response.status >= 200 && response.status < 300) {
        resolve(body);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const submitForm = ({ storeId, categoryId, productId }) => {
  return async (dispatch, getState) => {
    try {
      let prefs = getState().addPrefPage_reducer.filteredPrefs.slice();
      dispatch(isLoading(true));
      await sendFormData({ storeId, categoryId, productId, prefs });

      dispatch(
        layoutActions.alertModal({
          show: true,
        })
      );
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      // dispatch(postSubmitValidation(error ? error : null))
      dispatch(isLoading(false));
    }
  };
};

export const normalize = (prefList, productPreferences) => {
  return prefList.map((pref) => {
    const thePref = productPreferences?.find((item) => {
      return item.id === pref.PreferenceID;
    });
    return {
      ...pref,
      selected: thePref ? true : false,
      ChoicList: pref.ChoicList.map((choice) => {
        return {
          ...choice,
          selected: thePref?.choices?.some((productChoice) => {
            return productChoice.Id === choice.ChoicID;
          }),
          isDefault: pref.DefaultChoic === choice.ChoicID ? true : false,
        };
      }),
    };
  });
};
export const fetchInitialData = ({ storeId, categoryId, productId }) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const categories = await fetchAllCategories({ storeId });
      const storeCategories = await fetchCategories({ storeId });
      const category = categories.find(
        (category) => category.CategoryID === Number.parseInt(categoryId)
      );
      const storeCategory = storeCategories.find(
        (category) => category.Id === Number.parseInt(categoryId)
      );
      const product = storeCategory.items.find(
        (product) => product.Id === Number.parseInt(productId)
      );
      if (category.PreferenceList?.length) {
        dispatch({
          type: "addPrefPage-prefs",
          data: category.PreferenceList,
        });

        dispatch({
          type: "addPrefPage-filteredPrefs",
          data: normalize(category.PreferenceList, product.preferences),
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

export const togglePref = (prefId) => {
  return (dispatch, getState) => {
    let prefs = getState().addPrefPage_reducer.filteredPrefs.slice();
    let pref = prefs.find((pref) => pref.PreferenceID === prefId);
    if (pref.selected) {
      pref.ChoicList.forEach((choice) => {
        choice.selected = false;
      });
      pref.selected = false;
    } else {
      pref.ChoicList.forEach((choice) => {
        choice.selected = true;
      });
      pref.selected = true;
    }
    dispatch({
      type: "addPrefPage-filteredPrefs",
      data: prefs,
    });
  };
};
export const toggleChoice = (prefId, choiceId) => {
  return (dispatch, getState) => {
    let prefs = getState().addPrefPage_reducer.filteredPrefs.slice();
    let pref = prefs.find((pref) => pref.PreferenceID === prefId);
    let choice = pref.ChoicList.find((choice) => choice.ChoicID === choiceId);
    if (choice.selected) {
      choice.selected = false;
    } else {
      choice.selected = true;
    }
    dispatch({
      type: "addPrefPage-filteredPrefs",
      data: prefs,
    });
  };
};
export const toggleChoiceDefault = (prefId, choiceId) => {
  return (dispatch, getState) => {
    let prefs = getState().addPrefPage_reducer.filteredPrefs.slice();
    let pref = prefs.find((pref) => pref.PreferenceID === prefId);
    let choice = pref.ChoicList.find((choice) => choice.ChoicID === choiceId);
    pref.ChoicList.forEach((choice) => {
      choice.isDefault = false;
    });
    choice.isDefault = true;
    dispatch({
      type: "addPrefPage-filteredPrefs",
      data: prefs,
    });
  };
};

export const updateFilteredResult = () => {
  return (dispatch, getState) => {
    const prefs = getState().addPrefPage_reducer.prefs;
    const search = getState().addPrefPage_reducer.search.toLowerCase().trim();
    const filteredPrefs = prefs.filter(
      (category) =>
        category.name.toLowerCase().indexOf(search) !== -1 ||
        category.id.toString().indexOf(search) !== -1
    );
    dispatch({
      type: "addPrefPage-filteredPrefs",
      data: filteredPrefs,
    });
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "addPrefPage-isLoading", data: isLoading });
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
      const prefs = await fetchAllCategories();
      dispatch({
        type: "addPrefPage-prefs",
        data: prefs,
      });
      dispatch({
        type: "addPrefPage-filteredPrefs",
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
    let prefs = getState().addPrefPage_reducer.filteredPrefs.slice();
    if (column === getState().addPrefPage_reducer.tableSorting.column) {
      dispatch({
        type: "addPrefPage-tableSorting",
        data: {
          column,
          direction:
            getState().addPrefPage_reducer.tableSorting.direction ===
            "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "addPrefPage-filteredPrefs",
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
      type: "addPrefPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "addPrefPage-filteredPrefs",
      data: prefs,
    });
  };
};
