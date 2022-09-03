import auth from "../../../auth";
import { baseURI } from "../../../config";
import * as layoutActions from "../../layout-actions";

export const updateFields = (value, id, subscriptionID) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "addSubscriptionDenominationPage-smallestBuyingPrice",
      data: null,
    });
    dispatch({
      type: "addSubscriptionDenominationPage-price-value",
      data: { id: "price", value: "" },
    });
    dispatch({
      type: "addSubscriptionDenominationPage-ratePrice-value",
      data: { id: "ratePrice", value: "" },
    });
    switch (id) {
      case "denomination":
        try {
          dispatch(providerDenominations({ isLoading: true }));
          const providerDenominationsArray = await fetchProviderDenominations(
            value
          );
          dispatch(
            providerDenominations({
              data: providerDenominationsArray,
              isLoading: false,
            })
          );
          if (providerDenominationsArray.length) {
            const smallestBuyingPrice = getSmallestBuyingPrice(
              providerDenominationsArray
            );
            dispatch(changeFormFieldValue(smallestBuyingPrice, "price"));
            dispatch({
              type: "addSubscriptionDenominationPage-smallestBuyingPrice",
              data: smallestBuyingPrice,
            });
          } else {
            throw Error("يجب إضافة الفئة إلى مزود قبل إكمال هذه العملية.");
          }
        } catch (error) {
          dispatch(providerDenominations({ isLoading: false, data: [] }));
          dispatch(layoutActions.handleHttpError(error));
        }
        break;
      case "brand":
        dispatch(denominations({ isLoading: true, data: [] }));
        dispatch({
          type: "addSubscriptionDenominationPage-denomination-value",
          data: { id: "denomination", value: "" },
        });
        try {
          const denominationsArray = await fetchDenominations({
            subscriptionID,
            search: "",
            numOfResults: "6400",
            order: true,
            nextTo: 0,
            brandID: getState().addSubscriptionDenominationPage_reducer.formData
              .brand.value,
          });
          dispatch(
            denominations({
              isLoading: false,
              data: denominationsArray,
            })
          );
        } catch (error) {
          dispatch(
            denominations({
              isLoading: false,
              data: [],
            })
          );
          dispatch(layoutActions.handleHttpError(error));
        }
        break;
      case "category":
        dispatch(brands({ isLoading: true, data: [] }));
        dispatch(denominations({ isLoading: false, data: [] }));
        dispatch({
          type: "addSubscriptionDenominationPage-brand-value",
          data: { id: "brand", value: "" },
        });
        dispatch({
          type: "addSubscriptionDenominationPage-denomination-value",
          data: { id: "denomination", value: "" },
        });
        try {
          const brandsArray = await fetchBrands({
            subscriptionID,
            search: "",
            numOfResults: "6400",
            order: true,
            nextTo: 0,
            categoryID: getState().addSubscriptionDenominationPage_reducer
              .formData.category.value,
          });
          dispatch(brands({ isLoading: false, data: brandsArray }));
        } catch (error) {
          dispatch(brands({ isLoading: false, data: [] }));
          dispatch(layoutActions.handleHttpError(error));
        }
        break;
      default:
    }
  };
};
export const changeFormFieldValue = (value, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: `addSubscriptionDenominationPage-${id}-value`,
      data: { value, id },
    });

    if (
      getState().addSubscriptionDenominationPage_reducer.formData[id]
        .errorMsg !== ""
    ) {
      dispatch({
        type: `addSubscriptionDenominationPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const getSmallestBuyingPrice = (providerDenominations) => {
  providerDenominations.sort((a, b) => {
    return a.BuyingPrice - b.BuyingPrice;
  });
  return providerDenominations[0].BuyingPrice;
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "addSubscriptionDenominationPage-isLoading",
      data: isLoading,
    });
  };
};

export const providerDenominations = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "addSubscriptionDenominationPage-providerDenominations",
      data: {
        ...getState().addSubscriptionDenominationPage_reducer
          .providerDenominations,
        ...changedFields,
      },
    });
  };
};

export const categories = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "addSubscriptionDenominationPage-categories",
      data: {
        ...getState().addSubscriptionDenominationPage_reducer.categories,
        ...changedFields,
      },
    });
  };
};
export const brands = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "addSubscriptionDenominationPage-brands",
      data: {
        ...getState().addSubscriptionDenominationPage_reducer.brands,
        ...changedFields,
      },
    });
  };
};
export const denominations = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "addSubscriptionDenominationPage-denominations",
      data: {
        ...getState().addSubscriptionDenominationPage_reducer.denominations,
        ...changedFields,
      },
    });
  };
};

export const fetchInitialData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const categoriesArray = await fetchCategories({
        search: "",
        numOfResults: "6400",
        order: true,
        nextTo: 0,
        filter: 9,
      });

      dispatch(categories({ data: categoriesArray }));
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

export const fetchCategories = ({
  search,
  nextTo,
  order,
  numOfResults,
  filter,
}) => {
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
        `${baseURI}/api/Category?search=${search.trim()}&filter=${filter}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Categories);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchBrands = ({
  search,
  nextTo,
  order,
  numOfResults,
  categoryID,
  subscriptionID,
}) => {
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
        `${baseURI}/api/Brand?${
          subscriptionID !== "" ? `subscription=${subscriptionID}&` : ""
        }search=${search.trim()}&category=${categoryID}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Brands);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const fetchDenominations = ({
  subscriptionID,
  search,
  nextTo,
  order,
  numOfResults,
  brandID,
}) => {
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
        `${baseURI}/api/Denomination?${
          subscriptionID !== "" ? `subscription=${subscriptionID}&` : ""
        }search=${search.trim()}&brand=${brandID}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Denominations);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchProviderDenominations = (denominationID) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    try {
      let response = await fetch(
        `${baseURI}/api/Denomination/Provider?denomination=${denominationID}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.ProviderDenominations);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const sendFormData = (subscriptionID, formData) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("Price", Number(formData.price.value));
    urlencoded.append(
      "RatePrice",
      formData.isSelectRatePrice.value && formData.ratePrice.value !== ""
        ? Number(formData.ratePrice.value)
        : -1
    );
    urlencoded.append("IsAvailable", formData.isAvailable.value);
    urlencoded.append("Subscription", subscriptionID);
    urlencoded.append("Denomination", formData.denomination.value);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Subscription/Denomination/Add`,
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

export const submitForm = (subscriptionID) => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().addSubscriptionDenominationPage_reducer
        .formData;
      dispatch(isLoading(true));
      await sendFormData(subscriptionID, formData);
      dispatch(clearFormFields());
      dispatch(
        layoutActions.alertModal({
          show: true,
        })
      );
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      // dispatch(postSubmitValidation(error ? error.errorCode : null))
      dispatch(isLoading(false));
    }
  };
};

const clearFormFields = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: "addSubscriptionDenominationPage-smallestBuyingPrice",
      data: null,
    });
    const formData = getState().addSubscriptionDenominationPage_reducer
      .formData;
    for (let key in formData) {
      if (key !== "isAvailable" && key !== "isSelectRatePrice") {
        dispatch(changeFormFieldValue("", key));
      }
    }
    dispatch(changeFormFieldValue(false, "isSelectRatePrice"));
    dispatch(changeFormFieldValue(true, "isAvailable"));
    dispatch(brands({ data: [] }));
    dispatch(denominations({ data: [] }));
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    let isFormValid = true;
    const formData = getState().addSubscriptionDenominationPage_reducer
      .formData;
    for (let key in formData) {
      if (
        formData.price.value !== "" &&
        Number(formData.price.value) <
          getState().addSubscriptionDenominationPage_reducer.smallestBuyingPrice
      ) {
        isFormValid = false;
        dispatch({
          type: `addSubscriptionDenominationPage-price-errorMsg`,
          data: {
            value: "السعر لايجب أن يكون أقل من سعر الشراء",
            id: "price",
          },
        });
      }
      if (
        formData.ratePrice.value !== "" &&
        formData.isSelectRatePrice.value &&
        Number(formData.ratePrice.value) <
          getState().addSubscriptionDenominationPage_reducer.smallestBuyingPrice
      ) {
        isFormValid = false;
        dispatch({
          type: `addSubscriptionDenominationPage-ratePrice-errorMsg`,
          data: {
            value: "السعر النسبي لايجب أن يكون أقل من سعر الشراء",
            id: "ratePrice",
          },
        });
      }
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `addSubscriptionDenominationPage-${key}-errorMsg`,
          data: { value: "يجب تعبئة هذا الحقل", id: key },
        });
      }
    }
    cb(isFormValid);
  };
};

const postSubmitValidation = (errorCode) => {
  return (dispatch, getState) => {
    switch (errorCode) {
      default:
        dispatch(
          layoutActions.alertModal({
            isSuccess: false,
            show: true,
          })
        );
    }
  };
};
