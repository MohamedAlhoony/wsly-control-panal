import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
export const fetchInitialData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const regions = await fetchRegions({
        search: "",
        nextTo: 0,
        order: true,
        numOfResults: 6400,
      });
      dispatch({
        type: "createDenominationPage-regions",
        data: regions,
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
export const fetchRegions = ({
  search,
  nextTo,
  order,
  numOfResults,
  signal,
}) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal,
    };
    try {
      var response = await fetch(
        `${baseURI}/api/Denomination/Region?search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Regions);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const changeFormFieldValue = (value, id) => {
  return (dispatch, getState) => {
    dispatch({
      type: `createDenominationPage-${id}-value`,
      data: { value, id },
    });
    if (
      getState().createDenominationPage_reducer.formData[id].errorMsg !== ""
    ) {
      dispatch({
        type: `createDenominationPage-${id}-errorMsg`,
        data: { value: "", id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "createDenominationPage-isLoading", data: isLoading });
  };
};

export const submitForm = (brandID) => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().createDenominationPage_reducer.formData;
      dispatch(isLoading(true));
      await sendFormData(brandID, formData);
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

const sendFormData = (brandID, formData) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      IsAvailable: formData.isAvailable.value,
      CardName: formData.cardName.value,
      CardNameEn: formData.cardNameEn.value,
      ShortName: formData.shortName.value,
      ShortNameEn: formData.shortNameEn.value,
      MinimumQuantityLimit: formData.minimumQuantityLimit.value,
      SupplyLimit: formData.supplyLimit.value,
      MaximumQuantityLimit: formData.maximumQuantityLimit.value,
      Region: formData.region.value !== "" ? formData.region.value : -1,
      Brand: brandID,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Denomination/Create`,
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

const clearFormFields = () => {
  return async (dispatch, getState) => {
    const formData = getState().createDenominationPage_reducer.formData;
    for (let key in formData) {
      let value;
      if (key === "isAvailable") {
        value = true;
      } else {
        value = "";
      }
      dispatch({
        type: `createDenominationPage-${key}-value`,
        data: { value, id: key },
      });
    }
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    const formData = getState().createDenominationPage_reducer.formData;
    let isFormValid = true;
    if (formData.cardName.value !== "" && formData.cardName.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `createDenominationPage-cardName-errorMsg`,
        data: {
          value: "الإسم لايجب أن يكون أقل من حرفان",
          id: "cardName",
        },
      });
    }

    if (
      formData.cardNameEn.value !== "" &&
      formData.cardNameEn.value.length < 2
    ) {
      isFormValid = false;
      dispatch({
        type: `createDenominationPage-cardNameEn-errorMsg`,
        data: {
          value: "الإسم لايجب أن يكون أقل من حرفان",
          id: "cardNameEn",
        },
      });
    }

    if (
      formData.shortName.value !== "" &&
      formData.shortName.value.length < 2
    ) {
      isFormValid = false;
      dispatch({
        type: `createDenominationPage-shortName-errorMsg`,
        data: {
          value: "الإسم المصغر لايجب أن يكون أقل من حرفان",
          id: "shortName",
        },
      });
    }
    if (
      formData.shortNameEn.value !== "" &&
      formData.shortNameEn.value.length < 2
    ) {
      isFormValid = false;
      dispatch({
        type: `createDenominationPage-shortNameEn-errorMsg`,
        data: {
          value: "الإسم المصغر لايجب أن يكون أقل من حرفان",
          id: "shortNameEn",
        },
      });
    }

    for (let key in formData) {
      if (formData[key].config.required && formData[key].value === "") {
        isFormValid = false;
        dispatch({
          type: `createDenominationPage-${key}-errorMsg`,
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
