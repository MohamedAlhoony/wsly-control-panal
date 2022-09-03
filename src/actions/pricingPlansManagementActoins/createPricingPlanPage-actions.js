import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";

export const fetchInitialData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const pricingPlanTemplateData = await fetchPricingPlanTemplate();
      dispatch({
        type: "createPricingPlanPage-pricingPlanTemplateData",
        data: pricingPlanTemplateData,
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

export const changeFormFieldValue = (value, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: `createPricingPlanPage-${id}-value`,
      data: { value, id },
    });

    if (getState().createPricingPlanPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `createPricingPlanPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "createPricingPlanPage-isLoading",
      data: isLoading,
    });
  };
};

const sendFormData = (formData) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      Name: formData.name.value,
      PricingPlanEntries: formData.pricingPlansEntriesFile.value.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/PricingPlan/Create`,
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
      const formData = getState().createPricingPlanPage_reducer.formData;
      dispatch(isLoading(true));
      const createdPricingPlanData = await sendFormData(formData);
      dispatch(clearFormFields());
      dispatch(
        layoutActions.alertModal({
          redirectBtnText: "عرض الخطة",
          redirectBtnPath: `/pricing-plans/${createdPricingPlanData.Id}`,
          show: true,
          body: "تمت عملية إضافة الخطة بنجاح",
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
    const formData = getState().createPricingPlanPage_reducer.formData;
    for (let key in formData) {
      if (key !== "pricingPlansEntriesFile") {
        dispatch(changeFormFieldValue("", key));
      } else {
        dispatch(
          changeFormFieldValue({ value: "", filePath: "", name: "" }, key)
        );
      }
    }
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    let isFormValid = true;
    const formData = getState().createPricingPlanPage_reducer.formData;
    if (formData.name.value !== "" && formData.name.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `createPricingPlanPage-name-errorMsg`,
        data: { value: "طول الإسم لايجب أن يقل عن حرفان", id: "name" },
      });
    }
    for (let key in formData) {
      if (
        (key !== "pricingPlansEntriesFile" &&
          formData[key].config.required &&
          formData[key].value === "") ||
        (key === "pricingPlansEntriesFile" &&
          formData[key].config.required &&
          formData[key].value.value === "")
      ) {
        isFormValid = false;
        dispatch({
          type: `createPricingPlanPage-${key}-errorMsg`,
          data: { value: "يجب تعبئة هذا الحقل", id: key },
        });
      }
    }
    cb(isFormValid);
  };
};

const postSubmitValidation = (error) => {
  return (dispatch, getState) => {
    switch (error.code) {
      default:
        dispatch(
          layoutActions.alertModal({
            body: error.message,
            isSuccess: false,
            show: true,
          })
        );
    }
  };
};

export const fetchPricingPlanTemplate = () => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${baseURI}/api/PricingPlan/Template`,
        requestOptions
      );
      const body = await response.text();
      if (response.status === 200) {
        resolve(body);
      } else {
        reject();
      }
    } catch (error) {
      reject(error);
    }
  });
};
