import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { formatPhoneNumber, isValidEmail } from "../../helperFunctions";
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    dispatch({
      type: `addProductPage-${id}-value`,
      data: { value, id },
    });

    if (getState().addProductPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `addProductPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "addProductPage-isLoading", data: isLoading });
  };
};

const sendFormData = ({ formData, categoryId, storeId }) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({
        Name: formData.name.value,
        Description: formData.description.value,
        CategpryID: categoryId,
        Price: formData.price.value,
      }),
    };

    try {
      const response = await fetch(
        `${baseURI}/store/item?StoreID=${storeId}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status >= 200 && response.status < 300) {
        resolve(body);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const submitForm = ({ categoryId, storeId }) => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().addProductPage_reducer.formData;
      dispatch(isLoading(true));
      await sendFormData({ formData, categoryId, storeId });
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
    const formData = getState().addProductPage_reducer.formData;
    for (let key in formData) {
      dispatch({
        type: `addProductPage-${key}-value`,
        data: { value: "", id: key },
      });
    }
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    const formData = getState().addProductPage_reducer.formData;
    let isFormValid = true;

    // if (formData.name.value !== "" && formData.name.value.length < 2) {
    //   isFormValid = false;
    //   dispatch({
    //     type: `addProductPage-name-errorMsg`,
    //     data: { value: "طول الإسم لايجب أن يقل عن حرفان", id: "name" },
    //   });
    // }
    // if (formData.username.value !== "" && formData.username.value.length < 3) {
    //   isFormValid = false;
    //   dispatch({
    //     type: `addProductPage-username-errorMsg`,
    //     data: {
    //       value: "طول اسم المستخدم لايجب أن يقل عن 3 أحرف",
    //       id: "username",
    //     },
    //   });
    // }
    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `addProductPage-${key}-errorMsg`,
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
            body: "كلمة السر يجب أن تتكون على أقل من 6 أحرف وتتضمن حرف كبير واحد على الأقل وحرف صغير ورقم ورمز.",
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
