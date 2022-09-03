import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchCurrencies } from "../currenciesManagementActions/currenciesPage-actions";
import { fetchProviderDetails } from "../providersManagementActions/providerDetailsPage-actions";
import { fetchProviderDenominationDetails } from "./providerDenominationDetailsPage-actions";
import { normalizeFetchedData } from "../../helperFunctions";
export const changeFormFieldValue = (value, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: `updateProviderDenominationPage-${id}-value`,
      data: { value, id },
    });

    if (
      getState().updateProviderDenominationPage_reducer.formData[id]
        .errorMsg !== ""
    ) {
      dispatch({
        type: `updateProviderDenominationPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "updateProviderDenominationPage-isLoading",
      data: isLoading,
    });
  };
};

export const categories = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "updateProviderDenominationPage-categories",
      data: {
        ...getState().updateProviderDenominationPage_reducer.categories,
        ...changedFields,
      },
    });
  };
};
export const brands = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "updateProviderDenominationPage-brands",
      data: {
        ...getState().updateProviderDenominationPage_reducer.brands,
        ...changedFields,
      },
    });
  };
};
export const denominations = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "updateProviderDenominationPage-denominations",
      data: {
        ...getState().updateProviderDenominationPage_reducer.denominations,
        ...changedFields,
      },
    });
  };
};
export const handleCustomFieldsChange = (newArray) => {
  return (dispatch) => {
    dispatch({
      type: "updateProviderDenominationPage-customFields",
      data: newArray,
    });
  };
};
const buildCustomFieldsArray = (customFields) => {
  let customFieldsArray = Object.keys(customFields);
  console.log(customFieldsArray);
  return [].concat(
    ...customFieldsArray.map((key) => {
      return [{ key: key, value: customFields[key], errorMsg: "" }];
    })
  );
};
const normalizeCustomFields = (customFields) => {
  return customFields.reduce((accumulator, currentValue) => {
    return { ...accumulator, [currentValue.key]: currentValue.value };
  }, {});
};
export const fetchInitialData = (providerID, denominationID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const [
        providerDenominationDetails,
        categoriesArray,
        currenciesArray,
      ] = await Promise.all([
        fetchProviderDenominationDetails(providerID, denominationID),
        fetchCategories({
          search: "",
          numOfResults: "6400",
          order: true,
          nextTo: 0,
          filter: 9,
        }),
        fetchCurrencies({
          search: "",
          numOfResults: "6400",
          order: true,
          nextTo: 0,
        }),
        fetchProviderDetails(providerID),
      ]);
      dispatch(
        placeFormData(normalizeFetchedData(providerDenominationDetails))
      );
      dispatch({
        type: "updateProviderDenominationPage-currencies",
        data: currenciesArray,
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

const placeFormData = (providerDenominationDetails) => {
  return (dispatch) => {
    dispatch(
      changeFormFieldValue(providerDenominationDetails.BuyingPrice, "price")
    );
    dispatch(
      changeFormFieldValue(providerDenominationDetails.Currency.Id, "currency")
    );
    dispatch(
      changeFormFieldValue(
        providerDenominationDetails.ProviderDenominationId,
        "providerDenominationId"
      )
    );
    dispatch(
      changeFormFieldValue(
        providerDenominationDetails.IsStockReplaceActive,
        "isStockReplaceActive"
      )
    );
    dispatch({
      type: "updateProviderDenominationPage-customFields",
      data: buildCustomFieldsArray(
        providerDenominationDetails.ProviderMetaData
      ),
    });
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
  providerID,
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
        `${baseURI}/api/Provider/Denomination/AvailableBrand?provider=${providerID}&search=${search.trim()}&category=${categoryID}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
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
  providerID,
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
        `${baseURI}/api/Provider/Denomination/AvailableDenomination?provider=${providerID}&search=${search.trim()}&brand=${brandID}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
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

const sendFormData = (providerID, denominationID, formData, customFields) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      BuyingPrice: Number(formData.price.value),
      Provider: providerID,
      Denomination: denominationID,
      Currency: formData.currency.value,
      ProviderDenominationId: formData.providerDenominationId.value,
      ProviderMetaData: customFields,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Provider/Denomination/Update`,
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

export const submitForm = (providerID, denominationID) => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().updateProviderDenominationPage_reducer
        .formData;
      dispatch(isLoading(true));
      await sendFormData(
        providerID,
        denominationID,
        formData,
        normalizeCustomFields(
          getState().updateProviderDenominationPage_reducer.customFields
        )
      );
      dispatch(
        layoutActions.alertModal({
          show: true,
          willGoBack: true,
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

export const sendUpdateStockReplaceActivity = (
  providerID,
  denominationID,
  isStockReplaceActive
) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("IsStockReplaceActive", isStockReplaceActive);
    urlencoded.append("Denomination", denominationID);
    urlencoded.append("Provider", providerID);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `${baseURI}/api/Provider/Denomination/UpdateStockReplaceActivity`,
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

export const updateStockReplaceActivity = (
  providerID,
  denominationID,
  isStockReplaceActive
) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      await sendUpdateStockReplaceActivity(
        providerID,
        denominationID,
        isStockReplaceActive
      );
      dispatch(
        changeFormFieldValue(isStockReplaceActive, "isStockReplaceActive")
      );
      dispatch(
        layoutActions.alertModal({
          show: true,
          body: isStockReplaceActive
            ? "تم تفعيل خاصية التعويض الفوري بنجاح"
            : "تم إلغاء تفعيل خاصية التعويض الفوري بنجاح",
        })
      );
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    let isFormValid = true;
    const formData = getState().updateProviderDenominationPage_reducer.formData;
    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `updateProviderDenominationPage-${key}-errorMsg`,
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
