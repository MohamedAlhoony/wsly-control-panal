import auth from "../../auth";
import { baseURI } from "../../config";
import { normalizeFetchedData } from "../../helperFunctions";
import { fetchProviderDetails } from "./providerDetailsPage-actions";
import { normalizeCustomFields } from "./createProviderPage-actions";
import * as layoutActions from "../layout-actions";
export const fetchInitialData = (providerID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const providerDetails = await fetchProviderDetails(providerID);
      dispatch(placeFormData(normalizeFetchedData(providerDetails)));
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
const placeFormData = (providerDetails) => {
  return (dispatch) => {
    dispatch(changeFormFieldValue(providerDetails.Name, "name"));
    dispatch(
      changeFormFieldValue(
        providerDetails.BalanceNotificationThreshold,
        "balanceNotificationThreshold"
      )
    );
    dispatch(
      changeFormFieldValue(
        providerDetails.ThresholdViolationTrigger,
        "thresholdViolationTrigger"
      )
    );
    dispatch(changeFormFieldValue(providerDetails.IsActive, "isActive"));
    dispatch({
      type: "updateProviderPage-customFields",
      data: reverseNormalizeCustomFields(providerDetails.CustomFields),
    });
  };
};
export const sendProviderIsActive = (providerID, isActive) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var urlencoded = new URLSearchParams();
      urlencoded.append("IsActive", isActive);
      urlencoded.append("Id", providerID);
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: urlencoded,
      };
      try {
        const response = await fetch(
          `${baseURI}/api/Provider/UpdateActivity`,
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
export const updateProviderIsActive = (providerID, isActive) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      await dispatch(sendProviderIsActive(providerID, isActive));
      dispatch(
        layoutActions.alertModal({
          show: true,
          body: isActive ? "تم التفعيل بنجاح." : "تم إلغاء التفعيل بنجاح",
        })
      );
      dispatch(changeFormFieldValue(isActive, "isActive"));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    dispatch({
      type: `updateProviderPage-${id}-value`,
      data: { value, id },
    });
    if (getState().updateProviderPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `updateProviderPage-${id}-errorMsg`,
        data: { value: "", id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "updateProviderPage-isLoading", data: isLoading });
  };
};
export const handleCustomFieldsChange = (newArray) => {
  return (dispatch) => {
    dispatch({
      type: "updateProviderPage-customFields",
      data: newArray,
    });
  };
};
export const reverseNormalizeCustomFields = (customFields) => {
  let result;
  if (!customFields.length) {
    return [{ value: "", errorMsg: "" }];
  }
  result = [].concat(
    ...customFields.map((item) => {
      return [{ value: item.Key, errorMsg: "" }];
    })
  );
  return result;
};
const sendFormData = (providerID, formData, customFields) => {
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
      Id: providerID,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Provider/Update`,
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
      const formData = getState().updateProviderPage_reducer.formData;
      const customFields = getState().updateProviderPage_reducer.customFields;
      dispatch(isLoading(true));
      await sendFormData(providerID, formData, customFields);
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
    const formData = getState().updateProviderPage_reducer.formData;
    let isFormValid = true;

    if (formData.name.value !== "" && formData.name.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `updateProviderPage-name-errorMsg`,
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
          type: `updateProviderPage-${key}-errorMsg`,
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
