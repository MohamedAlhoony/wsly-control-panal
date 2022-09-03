import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    dispatch({
      type: `createCategoryPage-${id}-value`,
      data: { value, id },
    });
    if (getState().createCategoryPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `createCategoryPage-${id}-errorMsg`,
        data: { value: "", id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "createCategoryPage-isLoading", data: isLoading });
  };
};

const sendFormData = (formData) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("Name", formData.name.value);
    urlencoded.append("NameEn", formData.nameEn.value);
    urlencoded.append("Rank", formData.rank.value);
    urlencoded.append("IsInternal", formData.isInternal.value);
    urlencoded.append("IsPublic", formData.isPublic.value);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `${baseURI}/api/Category/Create`,
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
      const formData = getState().createCategoryPage_reducer.formData;
      dispatch(isLoading(true));
      await sendFormData(formData);
      dispatch(clearFormFields());
      dispatch(
        layoutActions.alertModal({
          show: true,
          body: "تمت عملية إضافة الصنف بنجاح.",
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
    const formData = getState().createCategoryPage_reducer.formData;
    for (let key in formData) {
      if (!["isInternal", "isPublic"].includes(key)) {
        dispatch({
          type: `createCategoryPage-${key}-value`,
          data: { value: "", id: key },
        });
      } else {
        dispatch({
          type: `createCategoryPage-${key}-value`,
          data: { value: true, id: key },
        });
      }
    }
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    const formData = getState().createCategoryPage_reducer.formData;
    let isFormValid = true;

    if (formData.name.value !== "" && formData.name.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `createCategoryPage-name-errorMsg`,
        data: {
          value: "الإسم لايجب أن يكون أقل من حرفان",
          id: "name",
        },
      });
    }

    if (formData.nameEn.value !== "" && formData.nameEn.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `createCategoryPage-nameEn-errorMsg`,
        data: {
          value: "الإسم لايجب أن يكون أقل من حرفان",
          id: "nameEn",
        },
      });
    }

    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `createCategoryPage-${key}-errorMsg`,
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
