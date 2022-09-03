import React from "react";
import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { formatPhoneNumber, isValidEmail } from "../../helperFunctions";
import { fetchRoles } from "./registerManagerPage-actions";
import { fetchManagerDetails } from "./managerDetailsPage-actions";
import { normalizeFetchedData } from "../../helperFunctions";
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    if (id === "phoneNumber") {
      value = value.replace(/[^\d|+]/g, "");
    }
    dispatch({
      type: `updateManagerPage-${id}-value`,
      data: { value, id },
    });

    if (getState().updateManagerPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `updateManagerPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "updateManagerPage-isLoading", data: isLoading });
  };
};
export const isActive = (isActive) => {
  return (dispatch) => {
    dispatch({ type: "updateManagerPage-isActive", data: isActive });
  };
};
const placeFormData = (managerDetails) => {
  return (dispatch) => {
    dispatch(changeFormFieldValue(managerDetails.Email, "email"));
    dispatch(changeFormFieldValue(managerDetails.Name, "name"));
    dispatch(changeFormFieldValue(managerDetails.Role.Id, "role"));
    const formatedPhoneNumber = formatPhoneNumber(managerDetails.PhoneNumber);
    dispatch(
      changeFormFieldValue(
        formatedPhoneNumber ? formatedPhoneNumber : managerDetails.PhoneNumber,
        "phoneNumber"
      )
    );
  };
};

export const fetchInitialData = (managerID) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const [roles, managerDetails] = await Promise.all([
        fetchRoles(),
        fetchManagerDetails(managerID),
      ]);
      dispatch(isActive(managerDetails.IsActive));
      dispatch(placeFormData(normalizeFetchedData(managerDetails)));
      dispatch({
        type: "updateManagerPage-roles",
        data: roles,
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

const sendFormData = (managerID, formData) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    // urlencoded.append('UserName', formData.username.value)
    urlencoded.append("Name", formData.name.value);
    urlencoded.append("PhoneNumber", formData.phoneNumber.value);
    urlencoded.append("Email", formData.email.value);
    urlencoded.append("Role", formData.role.value);
    // urlencoded.append('WalletNumber', formData.walletNumber.value)
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Manager/Update?id=${managerID}`,
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
export const sendManagerState = (managerID, isActive) => {
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
          `${baseURI}/api/Manager/UpdateState?id=${managerID}`,
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
export const updateManagerState = (managerID, newState) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      await dispatch(sendManagerState(managerID, newState));
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

const sendResetPassword = (managerID) => {
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
        `${baseURI}/api/Manager/ResetPassword?id=${managerID}`,
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

export const resetPassword = (managerID) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const newPassword = await sendResetPassword(managerID);
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

export const submitForm = (managerID) => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().updateManagerPage_reducer.formData;
      dispatch(isLoading(true));
      await sendFormData(managerID, formData);
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
    const formData = getState().updateManagerPage_reducer.formData;
    let isFormValid = true;

    const phoneNumber = formatPhoneNumber(formData.phoneNumber.value);
    if (formData.name.value !== "" && formData.name.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `updateManagerPage-name-errorMsg`,
        data: { value: "طول الإسم لايجب أن يقل عن حرفان", id: "name" },
      });
    }
    if (formData.phoneNumber.value !== "" && !phoneNumber) {
      isFormValid = false;
      dispatch({
        type: `updateManagerPage-phoneNumber-errorMsg`,
        data: { value: "رقم الهاتف غير صحيح", id: "phoneNumber" },
      });
    }
    if (formData.email.value !== "" && !isValidEmail(formData.email.value)) {
      isFormValid = false;
      dispatch({
        type: `updateManagerPage-email-errorMsg`,
        data: { value: "البريد الإلكتروني غير صحيح", id: "email" },
      });
    }
    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `updateManagerPage-${key}-errorMsg`,
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
