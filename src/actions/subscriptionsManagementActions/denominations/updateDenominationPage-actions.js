import auth from "../../../auth";
import { baseURI } from "../../../config";
import * as layoutActions from "../../layout-actions";
import {
  fetchProviderDenominations,
  getSmallestBuyingPrice,
} from "./addDenominationPage-actions";
import { normalizeFetchedData } from "../../../helperFunctions";

export const changeFormFieldValue = (value, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: `updateSubscriptionDenominationPage-${id}-value`,
      data: { value, id },
    });

    if (
      getState().updateSubscriptionDenominationPage_reducer.formData[id]
        .errorMsg !== ""
    ) {
      dispatch({
        type: `updateSubscriptionDenominationPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "updateSubscriptionDenominationPage-isLoading",
      data: isLoading,
    });
  };
};

export const providerDenominations = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "updateSubscriptionDenominationPage-providerDenominations",
      data: {
        ...getState().updateSubscriptionDenominationPage_reducer
          .providerDenominations,
        ...changedFields,
      },
    });
  };
};

export const fetchDenominationDetails = (subscriptionID, denominationID) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        `${baseURI}/api/Subscription/Denomination?subscription=${subscriptionID}&denomination=${denominationID}`,
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

const updateFormData = (denominationDetails) => {
  return (dispatch, getState) => {
    dispatch(
      changeFormFieldValue(denominationDetails.IsAvailable, "isAvailable")
    );
    dispatch(changeFormFieldValue(denominationDetails.Price, "price"));
    console.log(denominationDetails.RatePrice);
    if (denominationDetails.RatePrice !== "") {
      dispatch(changeFormFieldValue(true, "isSelectRatePrice"));
      dispatch(
        changeFormFieldValue(denominationDetails.RatePrice, "ratePrice")
      );
    }
  };
};

export const fetchInitialData = (subscriptionID, denominationID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const [denominationDetails, providerDenominations] = await Promise.all([
        fetchDenominationDetails(subscriptionID, denominationID),
        fetchProviderDenominations(denominationID),
      ]);
      dispatch(isLoading(false));
      dispatch(updateFormData(normalizeFetchedData(denominationDetails)));
      if (providerDenominations.length) {
        const smallestBuyingPrice = getSmallestBuyingPrice(
          providerDenominations
        );
        dispatch({
          type: "updateSubscriptionDenominationPage-smallestBuyingPrice",
          data: smallestBuyingPrice,
        });
      } else {
        throw Error("يجب إضافة الفئة إلى مزود قبل إكمال هذه العملية.");
      }
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

export const sendDenominationAvailability = (
  subscriptionID,
  denominationID,
  isAvaiable
) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var urlencoded = new URLSearchParams();
      urlencoded.append("IsAvailable", isAvaiable);
      urlencoded.append("Denomination", denominationID);
      urlencoded.append("Subscription", subscriptionID);
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: urlencoded,
      };
      try {
        const response = await fetch(
          `${baseURI}/api/Subscription/Denomination/UpdateAvailability`,
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
};
export const updateDenominationAvailability = (
  subscriptionID,
  denominationID,
  isAvaiable
) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      await dispatch(
        sendDenominationAvailability(subscriptionID, denominationID, isAvaiable)
      );
      dispatch(changeFormFieldValue(isAvaiable, "isAvailable"));
      dispatch(
        layoutActions.alertModal({
          show: true,
          body: isAvaiable
            ? "تم إتاحة الفئة بنجاح."
            : "تم إلغاء إتاحة الفئة بنجاح",
        })
      );
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

const sendFormData = (subscriptionID, denominationID, formData) => {
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
    urlencoded.append("Denomination", denominationID);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Subscription/Denomination/Update`,
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

export const submitForm = (subscriptionID, denominationID) => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().updateSubscriptionDenominationPage_reducer
        .formData;
      dispatch(isLoading(true));
      await sendFormData(subscriptionID, denominationID, formData);
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

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    let isFormValid = true;
    const formData = getState().updateSubscriptionDenominationPage_reducer
      .formData;
    for (let key in formData) {
      if (
        formData.price.value !== "" &&
        Number(formData.price.value) <
          getState().updateSubscriptionDenominationPage_reducer
            .smallestBuyingPrice
      ) {
        isFormValid = false;
        dispatch({
          type: `updateSubscriptionDenominationPage-price-errorMsg`,
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
          getState().updateSubscriptionDenominationPage_reducer
            .smallestBuyingPrice
      ) {
        isFormValid = false;
        dispatch({
          type: `updateSubscriptionDenominationPage-ratePrice-errorMsg`,
          data: {
            value: "السعر النسبي لايجب أن يكون أقل من سعر الشراء",
            id: "ratePrice",
          },
        });
      }
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `updateSubscriptionDenominationPage-${key}-errorMsg`,
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
