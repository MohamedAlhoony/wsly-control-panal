import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchSubscriptions } from "../subscriptionsManagementActions/subscriptionsPage-actions";
import { validURL } from "../../helperFunctions";
export const fetchInitialData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const subscriptions = await fetchSubscriptions({
        search: "",
        nextTo: 0,
        order: true,
        numOfResults: 6400,
      });
      dispatch({
        type: "createBrandPage-subscriptions",
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

export const uploadBrandImage = (brandImageFile) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "createBrandPage-isUploadingBrandImage", data: true });
      const imageId = await sendUploadBrandImage(brandImageFile.value);
      dispatch(
        changeFormFieldValue({ ...brandImageFile, imageId }, "brandImageFile")
      );
      dispatch({
        type: "createBrandPage-isUploadingBrandImage",
        data: false,
      });
    } catch (error) {
      dispatch({
        type: "createBrandPage-isUploadingBrandImage",
        data: false,
      });
      dispatch(layoutActions.handleHttpError(error));
    }
  };
};

export const changeFormFieldValue = (value, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: `createBrandPage-${id}-value`,
      data: { value, id },
    });
    if (getState().createBrandPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `createBrandPage-${id}-errorMsg`,
        data: { value: "", id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "createBrandPage-isLoading", data: isLoading });
  };
};

const sendUploadBrandImage = (imageFile) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var formdata = new FormData();
    formdata.append("file", imageFile);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${baseURI}/api/Brand/Image/Upload`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.ImageId);
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
      const formData = getState().createBrandPage_reducer.formData;
      const subscriptionBrands = getState().createBrandPage_reducer
        .subscriptionBrands;
      const imageId = formData.brandImageFile.value.imageId;
      dispatch(isLoading(true));
      await sendFormData(formData, subscriptionBrands, imageId);
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

const sendFormData = (formData, subscriptionBrands, imageID) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      Name: formData.name.value, // length >= 2 && <= 49
      NameEn: formData.nameEn.value, //length >= 2 && <= 49
      ShortDescription: formData.shortDescription.value, // length  <= 249
      LongDescription: formData.longDescription.value, // length  <= 1500
      ShortDescriptionEn: formData.shortDescriptionEn.value, // length  <= 249
      LongDescriptionEn: formData.longDescriptionEn.value, // length  <= 1500
      URL: formData.URL.value ?? new URL(formData.URL.value), // Valid URL => new URL()
      ImageId: imageID ? imageID : -1, // Optinal, if user uploaded an image, place the Id here
      IsAvailable: formData.isAvailable.value,
      SubscriptionBrands: subscriptionBrands,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Brand/Create`,
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
export const clearBrandImageFile = () => {
  return (dispatch) => {
    dispatch(
      changeFormFieldValue(
        { value: "", name: "", data: "", imageId: "", path: "" },
        "brandImageFile"
      )
    );
  };
};
const clearFormFields = () => {
  return async (dispatch, getState) => {
    const formData = getState().createBrandPage_reducer.formData;
    for (let key in formData) {
      let value;
      if (key === "brandImageFile") {
        dispatch(clearBrandImageFile());
        continue;
      } else if (
        key === "isAvailable" ||
        key === "isSubscriptionBrandAvailable"
      ) {
        value = true;
      } else {
        value = "";
      }
      dispatch({
        type: `createBrandPage-${key}-value`,
        data: { value, id: key },
      });
      dispatch({ type: "createBrandPage-subscriptionBrands", data: [] });
    }
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    const formData = getState().createBrandPage_reducer.formData;
    let isFormValid = true;
    if (formData.URL.value !== "" && !validURL(formData.URL.value)) {
      isFormValid = false;
      dispatch({
        type: `createBrandPage-URL-errorMsg`,
        data: {
          value: "عنوان الموقع الإلكتروني غير صحيح",
          id: "URL",
        },
      });
    }
    if (formData.name.value !== "" && formData.name.value.length < 4) {
      isFormValid = false;
      dispatch({
        type: `createBrandPage-name-errorMsg`,
        data: {
          value: "الإسم لايجب أن يكون أقل من 4 أحرف",
          id: "name",
        },
      });
    }

    if (formData.nameEn.value !== "" && formData.nameEn.value.length < 4) {
      isFormValid = false;
      dispatch({
        type: `createBrandPage-nameEn-errorMsg`,
        data: {
          value: "الإسم لايجب أن يكون أقل من 4 أحرف",
          id: "nameEn",
        },
      });
    }

    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `createBrandPage-${key}-errorMsg`,
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
