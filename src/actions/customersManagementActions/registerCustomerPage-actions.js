import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { formatPhoneNumber, isValidEmail } from "../../helperFunctions";
import { fetchSubscriptions } from "../subscriptionsManagementActions/subscriptionsPage-actions";
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    if (id === "walletNumber" || id === "phoneNumber") {
      value = value.replace(/[^\d|+]/g, "");
    }
    dispatch({
      type: `registerCustomerPage-${id}-value`,
      data: { value, id },
    });

    if (getState().registerCustomerPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `registerCustomerPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "registerCustomerPage-isLoading", data: isLoading });
  };
};

export const fetchInitialData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const subscriptions = await fetchSubscriptions({
        search: "",
        numOfResults: "6400",
        order: true,
        nextTo: 0,
      });

      dispatch({
        type: "registerCustomerPage-subscriptions",
        data: subscriptions,
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
    urlencoded.append("UserName", formData.username.value);
    urlencoded.append("Password", formData.password.value);
    urlencoded.append("Name", formData.name.value);
    urlencoded.append("PhoneNumber", formData.phoneNumber.value);
    urlencoded.append("Email", formData.email.value);
    urlencoded.append("Subscription", formData.subscription.value);
    urlencoded.append("WalletNumber", formData.walletNumber.value);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Customer/Register`,
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
      const formData = getState().registerCustomerPage_reducer.formData;
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
      dispatch(layoutActions.handleHttpError(error));
      // dispatch(postSubmitValidation(error ? error : null))
      dispatch(isLoading(false));
    }
  };
};

const clearFormFields = () => {
  return async (dispatch, getState) => {
    const formData = getState().registerCustomerPage_reducer.formData;
    for (let key in formData) {
      dispatch({
        type: `registerCustomerPage-${key}-value`,
        data: { value: "", id: key },
      });
    }
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    const formData = getState().registerCustomerPage_reducer.formData;
    let isFormValid = true;

    const phoneNumber = formatPhoneNumber(formData.phoneNumber.value);
    if (formData.phoneNumber.value !== "" && !phoneNumber) {
      isFormValid = false;
      dispatch({
        type: `registerCustomerPage-phoneNumber-errorMsg`,
        data: { value: "رقم الهاتف غير صحيح", id: "phoneNumber" },
      });
    }
    if (formData.email.value !== "" && !isValidEmail(formData.email.value)) {
      isFormValid = false;
      dispatch({
        type: `registerCustomerPage-email-errorMsg`,
        data: { value: "البريد الإلكتروني غير صحيح", id: "email" },
      });
    }
    if (
      formData.walletNumber.value !== "" &&
      formData.walletNumber.value.length < 10
    ) {
      isFormValid = false;
      dispatch({
        type: `registerCustomerPage-walletNumber-errorMsg`,
        data: { value: "رقم المحفظة غير صحيح", id: "walletNumber" },
      });
    }
    if (formData.name.value !== "" && formData.name.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `registerCustomerPage-name-errorMsg`,
        data: { value: "طول الإسم لايجب أن يقل عن حرفان", id: "name" },
      });
    }
    if (formData.username.value !== "" && formData.username.value.length < 3) {
      isFormValid = false;
      dispatch({
        type: `registerCustomerPage-username-errorMsg`,
        data: {
          value: "طول اسم المستخدم لايجب أن يقل عن 3 أحرف",
          id: "username",
        },
      });
    }
    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `registerCustomerPage-${key}-errorMsg`,
          data: { value: "يجب تعبئة هذا الحقل", id: key },
        });
      }
    }

    cb(isFormValid);
  };
};

const postSubmitValidation = (error) => {
  return (dispatch, getState) => {
    switch (error.errorCode) {
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
      case 1:
        dispatch(
          layoutActions.alertModal({
            isSuccess: false,
            show: true,
            body:
              "كلمة السر يجب أن تتكون على أقل من 6 أحرف وتتضمن حرف كبير واحد على الأقل وحرف صغير ورقم ورمز.",
          })
        );
        break;
      default:
        dispatch(
          layoutActions.alertModal({
            isSuccess: false,
            show: true,
            body: error.message,
          })
        );
    }
  };
};
