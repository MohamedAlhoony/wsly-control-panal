import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchCurrencies } from "../currenciesManagementActions/currenciesPage-actions";
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    if (id === "walletNumber" || id === "phoneNumber") {
      value = value.replace(/[^\d|+]/g, "");
    }
    dispatch({
      type: `addSubscriptionPage-${id}-value`,
      data: { value, id },
    });

    if (getState().addSubscriptionPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `addSubscriptionPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "addSubscriptionPage-isLoading", data: isLoading });
  };
};

export const fetchInitialData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const currencies = await fetchCurrencies({
        search: "",
        numOfResults: "6400",
        order: true,
        nextTo: 0,
      });

      dispatch({
        type: "addSubscriptionPage-currencies",
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

const sendFormData = (formData) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("Name", formData.name.value);
    urlencoded.append("WalletNumber", formData.walletNumber.value);
    urlencoded.append("Currency", formData.currency.value);
    urlencoded.append(
      "PriceEffectiveCurrency",
      formData.priceEffectiveCurrency.value
    );
    urlencoded.append("RoundDecimalPlaces", formData.roundDecimalPlaces.value);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Subscription/Add`,
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

export const submitForm = () => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().addSubscriptionPage_reducer.formData;
      dispatch(isLoading(true));
      await sendFormData(formData);
      dispatch(clearFormFields());
      dispatch(
        layoutActions.alertModal({
          show: true,
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

const clearFormFields = () => {
  return async (dispatch, getState) => {
    const formData = getState().addSubscriptionPage_reducer.formData;
    for (let key in formData) {
      dispatch({
        type: `addSubscriptionPage-${key}-value`,
        data: { value: "", id: key },
      });
    }
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    const formData = getState().addSubscriptionPage_reducer.formData;
    let isFormValid = true;

    if (
      (formData.walletNumber.value !== "" &&
        formData.walletNumber.value.length < 10) ||
      Number(formData.walletNumber.value) === 0
    ) {
      isFormValid = false;
      dispatch({
        type: `addSubscriptionPage-walletNumber-errorMsg`,
        data: { value: "رقم المحفظة غير صحيح", id: "walletNumber" },
      });
    }
    if (formData.name.value !== "" && formData.name.value.length < 4) {
      isFormValid = false;
      dispatch({
        type: `addSubscriptionPage-name-errorMsg`,
        data: { value: "طول الإسم لايجب أن يقل عن 4 أحرف", id: "name" },
      });
    }
    if (
      formData.roundDecimalPlaces.value !== "" &&
      formData.roundDecimalPlaces.value < 0
    ) {
      isFormValid = false;
      dispatch({
        type: `addSubscriptionPage-roundDecimalPlaces-errorMsg`,
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
          type: `addSubscriptionPage-${key}-errorMsg`,
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
      case 2:
        dispatch(
          layoutActions.alertModal({
            isSuccess: false,
            show: true,
            body: "اسم المستخدم موجود بالفعل الرجاء تحديد اسم آخر",
          })
        );
        break;
      case 3:
        dispatch(
          layoutActions.alertModal({
            isSuccess: false,
            show: true,
            body: "رقم المحفظة موجود بالفعل الرجاء تحديد رقم محفظة آخر",
          })
        );
        break;
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
