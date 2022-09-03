import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchCategoryDetails } from "./categoryDetailsPage-actions";
import { normalizeFetchedData } from "../../helperFunctions";

export const fetchInitialData = (categoryID) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const [categoryDetails] = await Promise.all([
        fetchCategoryDetails(categoryID),
      ]);
      dispatch(placeFormData(normalizeFetchedData(categoryDetails)));
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
const placeFormData = (categoryDetails) => {
  return (dispatch) => {
    dispatch(changeFormFieldValue(categoryDetails.Name, "name"));
    dispatch(changeFormFieldValue(categoryDetails.NameEn, "nameEn"));
    dispatch(changeFormFieldValue(categoryDetails.Rank, "rank"));
    dispatch(changeFormFieldValue(categoryDetails.IsInternal, "isInternal"));
    dispatch(changeFormFieldValue(categoryDetails.IsPublic, "isPublic"));
  };
};
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    dispatch({
      type: `updateCategoryPage-${id}-value`,
      data: { value, id },
    });
    if (getState().updateCategoryPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `updateCategoryPage-${id}-errorMsg`,
        data: { value: "", id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "updateCategoryPage-isLoading", data: isLoading });
  };
};

const sendFormData = (categoryID, formData) => {
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
    urlencoded.append("Id", categoryID);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `${baseURI}/api/Category/Update`,
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

export const submitForm = (categoryID) => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().updateCategoryPage_reducer.formData;
      dispatch(isLoading(true));
      await sendFormData(categoryID, formData);
      dispatch(
        layoutActions.alertModal({
          willGoBack: true,
          show: true,
          body: "تمت عملية تحديث الصنف بنجاح.",
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
    const formData = getState().updateCategoryPage_reducer.formData;
    let isFormValid = true;

    if (formData.name.value !== "" && formData.name.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `updateCategoryPage-name-errorMsg`,
        data: {
          value: "الإسم لايجب أن يكون أقل من حرفان",
          id: "name",
        },
      });
    }

    if (formData.nameEn.value !== "" && formData.nameEn.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `updateCategoryPage-nameEn-errorMsg`,
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
          type: `updateCategoryPage-${key}-errorMsg`,
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
