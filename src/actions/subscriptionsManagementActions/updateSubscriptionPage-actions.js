import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchCurrencies } from "../currenciesManagementActions/currenciesPage-actions";
import { normalizeFetchedData } from "../../helperFunctions";
import { fetchSubscriptionDetails } from "./subscriptionDetailsPage-actions";
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    if (id === "walletNumber") {
      value = value.replace(/[^\d|+]/g, "");
    }
    dispatch({
      type: `updateSubscriptionPage-${id}-value`,
      data: { value, id },
    });

    if (
      getState().updateSubscriptionPage_reducer.formData[id].errorMsg !== ""
    ) {
      dispatch({
        type: `updateSubscriptionPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "updateSubscriptionPage-isLoading", data: isLoading });
  };
};
const placeFormData = (subscriptionDetails) => {
  return (dispatch) => {
    dispatch(changeFormFieldValue(subscriptionDetails.Name, "name"));
    dispatch(
      changeFormFieldValue(
        subscriptionDetails.PriceEffectiveCurrency.Id,
        "priceEffectiveCurrency"
      )
    );
    dispatch(
      changeFormFieldValue(
        subscriptionDetails.RoundDecimalPlaces,
        "roundDecimalPlaces"
      )
    );
  };
};
export const fetchInitialData = (subscriptionID) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const [currencies, subscriptionDetails] = await Promise.all([
        fetchCurrencies({
          search: "",
          numOfResults: "6400",
          order: true,
          nextTo: 0,
        }),
        fetchSubscriptionDetails(subscriptionID),
      ]);
      dispatch(placeFormData(normalizeFetchedData(subscriptionDetails)));
      dispatch({
        type: "updateSubscriptionPage-currencies",
        data: currencies,
      });
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

const sendFormData = (subscriptionID, formData) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("Name", formData.name.value);
    // urlencoded.append('WalletNumber', formData.walletNumber.value)
    // urlencoded.append('Currency', formData.currency.value)
    urlencoded.append(
      "PriceEffectiveCurrency",
      formData.priceEffectiveCurrency.value
    );
    urlencoded.append("RoundDecimalPlaces", formData.roundDecimalPlaces.value);
    urlencoded.append("Id", subscriptionID);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Subscription/Update`,
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
      const formData = getState().updateSubscriptionPage_reducer.formData;
      dispatch(isLoading(true));
      await sendFormData(subscriptionID, formData);
      dispatch(
        layoutActions.alertModal({
          show: true,
          willGoBack: true,
        })
      );
      dispatch(isLoading(false));
    } catch (error) {
      // dispatch(postSubmitValidation(error ? error.errorCode : null))
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    const formData = getState().updateSubscriptionPage_reducer.formData;
    let isFormValid = true;

    if (formData.name.value !== "" && formData.name.value.length < 4) {
      isFormValid = false;
      dispatch({
        type: `updateSubscriptionPage-name-errorMsg`,
        data: { value: "طول الإسم لايجب أن يقل عن 4 أحرف", id: "name" },
      });
    }
    if (
      formData.roundDecimalPlaces.value !== "" &&
      formData.roundDecimalPlaces.value < 0
    ) {
      isFormValid = false;
      dispatch({
        type: `updateSubscriptionPage-roundDecimalPlaces-errorMsg`,
        data: {
          value: "القيمة لايجب أن تكون أقل من صفر",
          id: "roundDecimalPlaces",
        },
      });
    }
    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `updateSubscriptionPage-${key}-errorMsg`,
          data: { value: "يجب تعبئة هذا الحقل", id: key },
        });
      }
    }

    cb(isFormValid);
  };
};

// const postSubmitValidation = (errorCode) => {
//     return (dispatch, getState) => {
//         switch (errorCode) {
//             case 2:
//                 dispatch(
//                     layoutActions.alertModal({
//                         isSuccess: false,
//                         show: true,
//                         body: 'اسم المستخدم موجود بالفعل الرجاء تحديد اسم آخر',
//                     })
//                 )
//                 break
//             case 3:
//                 dispatch(
//                     layoutActions.alertModal({
//                         isSuccess: false,
//                         show: true,
//                         body:
//                             'رقم المحفظة موجود بالفعل الرجاء تحديد رقم محفظة آخر',
//                     })
//                 )
//                 break
//             default:
//                 dispatch(
//                     layoutActions.alertModal({
//                         isSuccess: false,
//                         show: true,
//                     })
//                 )
//         }
//     }
// }
