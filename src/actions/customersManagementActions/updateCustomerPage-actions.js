import React from "react";
import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { formatPhoneNumber, isValidEmail } from "../../helperFunctions";
import { fetchSubscriptions } from "../subscriptionsManagementActions/subscriptionsPage-actions";
import { fetchCustomerDetails } from "./customerDetailsPage-actions";
import { normalizeFetchedData } from "../../helperFunctions";
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    if (id === "walletNumber" || id === "phoneNumber") {
      value = value.replace(/[^\d|+]/g, "");
    }
    dispatch({
      type: `updateCustomerPage-${id}-value`,
      data: { value, id },
    });

    if (getState().updateCustomerPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `updateCustomerPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "updateCustomerPage-isLoading", data: isLoading });
  };
};
export const isActive = (isActive) => {
  return (dispatch) => {
    dispatch({ type: "updateCustomerPage-isActive", data: isActive });
  };
};
const placeFormData = (customerDetails) => {
  return (dispatch) => {
    dispatch(changeFormFieldValue(customerDetails.Email, "email"));
    dispatch(changeFormFieldValue(customerDetails.Name, "name"));
    dispatch(
      changeFormFieldValue(customerDetails.Subscription.Id, "subscription")
    );
    const formatedPhoneNumber = formatPhoneNumber(customerDetails.PhoneNumber);
    dispatch(
      changeFormFieldValue(
        formatedPhoneNumber ? formatedPhoneNumber : customerDetails.PhoneNumber,
        "phoneNumber"
      )
    );
  };
};
export const fetchInitialData = (customerID) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const [subscriptions, customerDetails] = await Promise.all([
        fetchSubscriptions({
          search: "",
          numOfResults: "6400",
          order: true,
          nextTo: 0,
        }),
        fetchCustomerDetails(customerID),
      ]);
      dispatch(isActive(customerDetails.IsActive));
      dispatch(placeFormData(normalizeFetchedData(customerDetails)));
      dispatch({
        type: "updateCustomerPage-subscriptions",
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

const sendFormData = (customerID, formData) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    // urlencoded.append('UserName', formData.username.value)
    urlencoded.append("Name", formData.name.value);
    urlencoded.append("PhoneNumber", formData.phoneNumber.value);
    urlencoded.append("Email", formData.email.value);
    urlencoded.append("Subscription", formData.subscription.value);
    // urlencoded.append('WalletNumber', formData.walletNumber.value)
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Customer/Update?id=${customerID}`,
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
export const sendCustomerState = (customerID, isActive) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var urlencoded = new URLSearchParams();
      urlencoded.append("IsActive", isActive);
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: urlencoded,
      };
      try {
        const response = await fetch(
          `${baseURI}/api/Customer/UpdateState?id=${customerID}`,
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
export const updateCustomerState = (customerID, newState) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      await dispatch(sendCustomerState(customerID, newState));
      dispatch(isActive(newState));
      dispatch(
        layoutActions.alertModal({
          show: true,
          body: newState
            ? "تم تفعيل الحساب بنجاح."
            : "تم إلغاء تفعيل الحساب بنجاح",
        })
      );
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

const sendResetPassword = (customerID) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Customer/ResetPassword?id=${customerID}`,
        requestOptions
      );

      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.NewPassword);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const resetPassword = (customerID) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const newPassword = await sendResetPassword(customerID);
      dispatch(isLoading(false));
      dispatch(
        layoutActions.alertModal({
          show: true,
          body: [
            <span key={0}>كلمة السر الجديدة:&nbsp;&nbsp;</span>,
            <strong key={1} style={{ color: "Highlight" }}>
              {newPassword}
            </strong>,
          ],
        })
      );
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

export const submitForm = (customerID) => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().updateCustomerPage_reducer.formData;
      dispatch(isLoading(true));
      await sendFormData(customerID, formData);
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
    const formData = getState().updateCustomerPage_reducer.formData;
    let isFormValid = true;

    const phoneNumber = formatPhoneNumber(formData.phoneNumber.value);
    if (formData.name.value !== "" && formData.name.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `updateCustomerPage-name-errorMsg`,
        data: { value: "طول الإسم لايجب أن يقل عن حرفان", id: "name" },
      });
    }
    if (formData.phoneNumber.value !== "" && !phoneNumber) {
      isFormValid = false;
      dispatch({
        type: `updateCustomerPage-phoneNumber-errorMsg`,
        data: { value: "رقم الهاتف غير صحيح", id: "phoneNumber" },
      });
    }
    if (formData.email.value !== "" && !isValidEmail(formData.email.value)) {
      isFormValid = false;
      dispatch({
        type: `updateCustomerPage-email-errorMsg`,
        data: { value: "البريد الإلكتروني غير صحيح", id: "email" },
      });
    }
    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `updateCustomerPage-${key}-errorMsg`,
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
