import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchCurrencies } from "../currenciesManagementActions/currenciesPage-actions";
import { fetchProviderDetails } from "../providersManagementActions/providerDetailsPage-actions";
export const updateFields = (value, id, providerID) => {
  return async (dispatch, getState) => {
    switch (id) {
      case "brand":
        dispatch(denominations({ isLoading: true, data: [] }));
        dispatch({
          type: "addProviderDenominationPage-denomination-value",
          data: { id: "denomination", value: "" },
        });
        try {
          const denominationsArray = await fetchDenominations({
            providerID,
            search: "",
            numOfResults: "6400",
            order: true,
            nextTo: 0,
            brandID: getState().addProviderDenominationPage_reducer.formData
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
          type: "addProviderDenominationPage-brand-value",
          data: { id: "brand", value: "" },
        });
        dispatch({
          type: "addProviderDenominationPage-denomination-value",
          data: { id: "denomination", value: "" },
        });
        try {
          const brandsArray = await fetchBrands({
            providerID,
            search: "",
            numOfResults: "6400",
            order: true,
            nextTo: 0,
            categoryID: getState().addProviderDenominationPage_reducer.formData
              .category.value,
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
      type: `addProviderDenominationPage-${id}-value`,
      data: { value, id },
    });

    if (
      getState().addProviderDenominationPage_reducer.formData[id].errorMsg !==
      ""
    ) {
      dispatch({
        type: `addProviderDenominationPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "addProviderDenominationPage-isLoading",
      data: isLoading,
    });
  };
};

export const categories = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "addProviderDenominationPage-categories",
      data: {
        ...getState().addProviderDenominationPage_reducer.categories,
        ...changedFields,
      },
    });
  };
};
export const brands = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "addProviderDenominationPage-brands",
      data: {
        ...getState().addProviderDenominationPage_reducer.brands,
        ...changedFields,
      },
    });
  };
};
export const denominations = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "addProviderDenominationPage-denominations",
      data: {
        ...getState().addProviderDenominationPage_reducer.denominations,
        ...changedFields,
      },
    });
  };
};
export const handleCustomFieldsChange = (newArray) => {
  return (dispatch) => {
    dispatch({
      type: "addProviderDenominationPage-customFields",
      data: newArray,
    });
  };
};
const buildCustomFieldsArray = (customFields) => {
  return [].concat(
    ...customFields.map((item) => {
      return [{ key: item.Key, value: "", errorMsg: "" }];
    })
  );
};
const normalizeCustomFields = (customFields) => {
  return customFields.reduce((accumulator, currentValue) => {
    return { ...accumulator, [currentValue.key]: currentValue.value };
  }, {});
};
export const fetchInitialData = (providerID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const [
        categoriesArray,
        currenciesArray,
        providerDetails,
      ] = await Promise.all([
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
      dispatch({
        type: "addProviderDenominationPage-currencies",
        data: currenciesArray,
      });
      dispatch({
        type: "addProviderDenominationPage-customFields",
        data: buildCustomFieldsArray(providerDetails.CustomFields),
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

const sendFormData = (providerID, formData, customFields) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      BuyingPrice: Number(formData.price.value),
      IsStockReplaceActive: formData.isStockReplaceActive.value,
      Provider: providerID,
      Denomination: formData.denomination.value,
      Currency: formData.currency.value,
      ProviderDenominationId: formData.providerDenominationId.value,
      ProviderMetaData: customFields,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Provider/Denomination/Add`,
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

export const submitForm = (providerID) => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().addProviderDenominationPage_reducer.formData;
      dispatch(isLoading(true));
      await sendFormData(
        providerID,
        formData,
        normalizeCustomFields(
          getState().addProviderDenominationPage_reducer.customFields
        )
      );
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
const clearCustomFields = (customFields) => {
  return [].concat(
    ...customFields.map((item) => {
      return [{ key: item.key, value: "", errorMsg: "" }];
    })
  );
};
const clearFormFields = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: "addProviderDenominationPage-smallestBuyingPrice",
      data: null,
    });
    const formData = getState().addProviderDenominationPage_reducer.formData;
    for (let key in formData) {
      if (key !== "isStockReplaceActive") {
        dispatch(changeFormFieldValue("", key));
      }
    }
    dispatch({
      type: "addProviderDenominationPage-customFields",
      data: clearCustomFields(
        getState().addProviderDenominationPage_reducer.customFields
      ),
    });
    dispatch(changeFormFieldValue(true, "isStockReplaceActive"));
    dispatch(brands({ data: [] }));
    dispatch(denominations({ data: [] }));
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    let isFormValid = true;
    const formData = getState().addProviderDenominationPage_reducer.formData;
    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `addProviderDenominationPage-${key}-errorMsg`,
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
