import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    dispatch({
      type: `createProviderPage-${id}-value`,
      data: { value, id },
    });
    if (getState().createProviderPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `createProviderPage-${id}-errorMsg`,
        data: { value: "", id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "createProviderPage-isLoading", data: isLoading });
  };
};
export const handleCustomFieldsChange = (newArray) => {
  return (dispatch) => {
    dispatch({
      type: "createProviderPage-customFields",
      data: newArray,
    });
  };
};
export const normalizeCustomFields = (customFields) => {
  let result;
  result = [].concat(
    ...customFields.map((item) => {
      if (item.value === "") {
        return [];
      }
      return [{ Key: item.value }];
    })
  );
  return result;
};
const sendFormData = (formData, customFields) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      Name: formData.name.value,
      BalanceNotificationThreshold: formData.balanceNotificationThreshold.value,
      ThresholdViolationTrigger: formData.thresholdViolationTrigger.value,
      IsActive: formData.isActive.value,
      CustomFields: normalizeCustomFields(customFields),
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Provider/Create`,
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
      const formData = getState().createProviderPage_reducer.formData;
      const customFields = getState().createProviderPage_reducer.customFields;
      dispatch(isLoading(true));
      await sendFormData(formData, customFields);
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
    const formData = getState().createProviderPage_reducer.formData;
    let value;
    for (let key in formData) {
      if (key === "isActive") {
        value = true;
      } else {
        value = "";
      }
      dispatch({
        type: `createProviderPage-${key}-value`,
        data: { value, id: key },
      });
    }
    dispatch(handleCustomFieldsChange([{ value: "", errorMsg: "" }]));
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    const formData = getState().createProviderPage_reducer.formData;
    let isFormValid = true;

    if (formData.name.value !== "" && formData.name.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `createProviderPage-name-errorMsg`,
        data: {
          value: "الإسم لايجب أن يكون أقل من 2 أحرف",
          id: "name",
        },
      });
    }

    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `createProviderPage-${key}-errorMsg`,
          data: { value: "يجب تعبئة هذا الحقل", id: key },
        });
      }
    }

    cb(isFormValid);
  };
};

const postSubmitValidation = (errorCode) => {
  return (dispatch) => {
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
