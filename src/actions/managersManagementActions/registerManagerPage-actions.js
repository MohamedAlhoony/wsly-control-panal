import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { formatPhoneNumber, isValidEmail } from "../../helperFunctions";
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    if (id === "phoneNumber") {
      value = value.replace(/[^\d|+]/g, "");
    }
    dispatch({
      type: `registerManagerPage-${id}-value`,
      data: { value, id },
    });

    if (getState().registerManagerPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `registerManagerPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};
export const fetchRoles = () => {
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
      var response = await fetch(`${baseURI}/api/Manager/Role`, requestOptions);
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Roles);
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
    dispatch({ type: "registerManagerPage-isLoading", data: isLoading });
  };
};

export const fetchInitialData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const roles = await fetchRoles();
      dispatch({
        type: "registerManagerPage-roles",
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
    urlencoded.append("Role", formData.role.value);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Manager/Register`,
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
      const formData = getState().registerManagerPage_reducer.formData;
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
    const formData = getState().registerManagerPage_reducer.formData;
    for (let key in formData) {
      dispatch({
        type: `registerManagerPage-${key}-value`,
        data: { value: "", id: key },
      });
    }
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    const formData = getState().registerManagerPage_reducer.formData;
    let isFormValid = true;

    const phoneNumber = formatPhoneNumber(formData.phoneNumber.value);
    if (formData.phoneNumber.value !== "" && !phoneNumber) {
      isFormValid = false;
      dispatch({
        type: `registerManagerPage-phoneNumber-errorMsg`,
        data: { value: "رقم الهاتف غير صحيح", id: "phoneNumber" },
      });
    }
    if (formData.email.value !== "" && !isValidEmail(formData.email.value)) {
      isFormValid = false;
      dispatch({
        type: `registerManagerPage-email-errorMsg`,
        data: { value: "البريد الإلكتروني غير صحيح", id: "email" },
      });
    }
    if (formData.name.value !== "" && formData.name.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `registerManagerPage-name-errorMsg`,
        data: { value: "طول الإسم لايجب أن يقل عن حرفان", id: "name" },
      });
    }
    if (formData.username.value !== "" && formData.username.value.length < 3) {
      isFormValid = false;
      dispatch({
        type: `registerManagerPage-username-errorMsg`,
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
          type: `registerManagerPage-${key}-errorMsg`,
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
