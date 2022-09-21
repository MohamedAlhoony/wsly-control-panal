import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";

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
              DefaultChoic: pref.ChoicList.find(
                (choice) => choice.selected === true
              ).ChoicID,
              ChoicList: pref.ChoicList.map((choice) => {
                return {
                  ChoicID: choice.ChoicID,
                  Price: choice.Price,
                  Name: choice.Name,
                };
              }),
            };
          }),
      }),
    };

    try {
      const response = await fetch(
        `${baseURI}/store/ItemPreference?StoreID=${storeId}`,
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

export const submitForm = ({ storeId }) => {
  return async (dispatch, getState) => {
    try {
      let prefs = getState().allPage_reducer.selectedItemPrefs.slice();
      let selectedItem = getState().allPage_reducer.selectedItem;
      dispatch(isLoading(true));
      await sendFormData({ storeId, prefs, productId: selectedItem.Id });
      const categories = await fetchCategories({ storeId });
      dispatch({
        type: "allPage-isChanged",
        data: false,
      });
      if (categories.length) {
        dispatch({
          type: "allPage-categories",
          data: categories,
        });
      }
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

export const handleItemClick = (item) => {
  return (dispatch, getState) => {
    const allPrefs =
      getState().allPage_reducer.allCategories[
        getState().allPage_reducer.activeCategoryTab
      ].PreferenceList;
    dispatch({
      type: "allPage-selectedItem",
      data: item,
    });
    dispatch({
      type: "allPage-selectedItemPrefs",
      data: normalize(allPrefs, item.preferences),
    });
  };
};

export const togglePref = (prefId) => {
  return (dispatch, getState) => {
    let selectedItemPrefs =
      getState().allPage_reducer.selectedItemPrefs.slice();
    let pref = selectedItemPrefs.find((pref) => pref.PreferenceID === prefId);
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
      type: "allPage-selectedItemPrefs",
      data: selectedItemPrefs,
    });
    dispatch({
      type: "allPage-isChanged",
      data: true,
    });
  };
};
export const toggleChoice = (prefId, choiceId) => {
  return (dispatch, getState) => {
    let selectedItemPrefs =
      getState().allPage_reducer.selectedItemPrefs.slice();
    let pref = selectedItemPrefs.find((pref) => pref.PreferenceID === prefId);
    let choice = pref.ChoicList.find((choice) => choice.ChoicID === choiceId);
    if (choice.selected) {
      choice.selected = false;
    } else {
      choice.selected = true;
    }
    dispatch({
      type: "allPage-selectedItemPrefs",
      data: selectedItemPrefs,
    });
    dispatch({
      type: "allPage-isChanged",
      data: true,
    });
  };
};
export const toggleChoiceDefault = (prefId, choiceId) => {
  return (dispatch, getState) => {
    let selectedItemPrefs =
      getState().allPage_reducer.selectedItemPrefs.slice();
    let pref = selectedItemPrefs.find((pref) => pref.PreferenceID === prefId);
    let choice = pref.ChoicList.find((choice) => choice.ChoicID === choiceId);
    pref.ChoicList.forEach((choice) => {
      choice.isDefault = false;
    });
    choice.isDefault = true;
    dispatch({
      type: "allPage-selectedItemPrefs",
      data: selectedItemPrefs,
    });
    dispatch({
      type: "allPage-isChanged",
      data: true,
    });
  };
};
export const handeChoicePriceChange = (prefId, choiceId, value) => {
  return (dispatch, getState) => {
    let selectedItemPrefs =
      getState().allPage_reducer.selectedItemPrefs.slice();
    let pref = selectedItemPrefs.find((pref) => pref.PreferenceID === prefId);
    let choice = pref.ChoicList.find((choice) => choice.ChoicID === choiceId);
    choice.Price = value;
    dispatch({
      type: "allPage-selectedItemPrefs",
      data: selectedItemPrefs,
    });
    dispatch({
      type: "allPage-isChanged",
      data: true,
    });
  };
};

export const handlePrefExpandClick = (prefId) => {
  return (dispatch, getState) => {
    let selectedItemPrefs =
      getState().allPage_reducer.selectedItemPrefs.slice();
    let pref = selectedItemPrefs.find((pref) => pref.PreferenceID === prefId);
    if (pref.isExpanded) {
      pref.isExpanded = false;
    } else {
      pref.isExpanded = true;
    }
    dispatch({
      type: "allPage-selectedItemPrefs",
      data: selectedItemPrefs,
    });
  };
};

export const fetchInitialData = ({ storeId }) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const categories = await fetchCategories({ storeId });
      const allCategories = await fetchAllCategories({ storeId });
      if (allCategories.length) {
        dispatch({
          type: "allPage-allCategories",
          data: allCategories,
        });
      }
      if (categories.length) {
        dispatch({
          type: "allPage-categories",
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

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "allPage-isLoading", data: isLoading });
  };
};

// const sendRemoveCustomer = (customerID) => {
//   return new Promise(async (resolve, reject) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
//     var requestOptions = {
//       method: "DELETE",
//       headers: myHeaders,
//       redirect: "follow",
//     };
//     try {
//       const response = await fetch(
//         `${baseURI}/dashboard/users/${customerID}`,
//         requestOptions
//       );
//       const responseText = await response.text();
//       const body = responseText ? JSON.parse(responseText) : "";
//       if (response.status === 200) {
//         resolve(body);
//       } else {
//         reject({ code: body?.errorCode, message: body?.message });
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// export const removeCustomer = (customerID) => {
//   return async (dispatch, getState) => {
//     try {
//       dispatch(isLoading(true));
//       await sendRemoveCustomer(customerID);
//       dispatch(
//         layoutActions.alertModal({
//           show: true,
//         })
//       );
//       const categories = await fetchCategories();
//       dispatch({
//         type: "allPage-categories",
//         data: categories,
//       });
//       dispatch({
//         type: "allPage-filteredCategories",
//         data: categories,
//       });

//       dispatch(isLoading(false));
//     } catch (error) {
//       dispatch(layoutActions.handleHttpError(error));
//       dispatch(isLoading(false));
//     }
//   };
// };
// export const categoriesSortBy = (column) => {
//   return (dispatch, getState) => {
//     let categories =
//       getState().allPage_reducer.filteredCategories.slice();
//     if (column === getState().allPage_reducer.tableSorting.column) {
//       dispatch({
//         type: "allPage-tableSorting",
//         data: {
//           column,
//           direction:
//             getState().allPage_reducer.tableSorting.direction ===
//             "ascending"
//               ? "descending"
//               : "ascending",
//         },
//       });
//       dispatch({
//         type: "allPage-filteredCategories",
//         data: categories.reverse(),
//       });
//       return;
//     }
//     switch (column) {
//       case "CategoryName":
//         categories = categories.sort((a, b) => {
//           a = a.CategoryName;
//           b = b.CategoryName;
//           return a < b ? -1 : a > b ? 1 : 0;
//         });
//         break;
//       case "CategoryID":
//         categories = categories.sort((a, b) => {
//           a = a.CategoryID;
//           b = b.CategoryID;
//           return a < b ? -1 : a > b ? 1 : 0;
//         });
//         break;
//       default:
//     }
//     dispatch({
//       type: "allPage-tableSorting",
//       data: { column, direction: "ascending" },
//     });
//     dispatch({
//       type: "allPage-filteredCategories",
//       data: categories,
//     });
//   };
// };
