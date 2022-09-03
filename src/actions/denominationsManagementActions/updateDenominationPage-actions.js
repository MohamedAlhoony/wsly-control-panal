import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchDenominationDetails } from "./denominationDetailsPage-actions";
import { normalizeFetchedData } from "../../helperFunctions";
export const fetchInitialData = (denominationID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const [denominationDetails, regions] = await Promise.all([
        fetchDenominationDetails(denominationID),
        fetchRegions({
          search: "",
          nextTo: 0,
          order: true,
          numOfResults: 6400,
        }),
      ]);
      dispatch({
        type: "updateDenominationPage-regions",
        data: regions,
      });
      dispatch(placeFormData(normalizeFetchedData(denominationDetails)));
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

const placeFormData = (denominationDetails) => {
  return (dispatch) => {
    dispatch(changeFormFieldValue(denominationDetails.CardName, "cardName"));
    dispatch(
      changeFormFieldValue(denominationDetails.CardNameEn, "cardNameEn")
    );
    dispatch(changeFormFieldValue(denominationDetails.ShortName, "shortName"));
    dispatch(
      changeFormFieldValue(denominationDetails.ShortNameEn, "shortNameEn")
    );
    dispatch(
      changeFormFieldValue(
        denominationDetails.MaximumQuantityLimit,
        "maximumQuantityLimit"
      )
    );
    dispatch(
      changeFormFieldValue(
        denominationDetails.MinimumQuantityLimit,
        "minimumQuantityLimit"
      )
    );
    dispatch(
      changeFormFieldValue(denominationDetails.SupplyLimit, "supplyLimit")
    );
    dispatch(changeFormFieldValue(denominationDetails.Region.Id, "region"));
    dispatch(
      changeFormFieldValue(denominationDetails.IsAvailable, "isAvailable")
    );
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
      type: `updateDenominationPage-${id}-value`,
      data: { value, id },
    });
    if (
      getState().updateDenominationPage_reducer.formData[id].errorMsg !== ""
    ) {
      dispatch({
        type: `updateDenominationPage-${id}-errorMsg`,
        data: { value: "", id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "updateDenominationPage-isLoading", data: isLoading });
  };
};

export const sendDenominationState = (denominationID, isAvailable) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var urlencoded = new URLSearchParams();
      urlencoded.append("IsAvailable", isAvailable);
      urlencoded.append("Id", denominationID);
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: urlencoded,
      };
      try {
        const response = await fetch(
          `${baseURI}/api/Denomination/UpdateAvailability`,
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

export const updateDenominationState = (denominationID, isAvailable) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      await dispatch(sendDenominationState(denominationID, isAvailable));
      dispatch(changeFormFieldValue(isAvailable, "isAvailable"));
      dispatch(
        layoutActions.alertModal({
          show: true,
          body: !isAvailable
            ? "تم إخفاء الفئة عن المستخدمين بنجاح"
            : "تم إظهار الفئة للمستخدمين بنجاح",
        })
      );
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};
export const submitForm = (brandID, denominationID) => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().updateDenominationPage_reducer.formData;
      dispatch(isLoading(true));
      await sendFormData(brandID, denominationID, formData);
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

const sendFormData = (brandID, denominationID, formData) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      CardName: formData.cardName.value,
      CardNameEn: formData.cardNameEn.value,
      ShortName: formData.shortName.value,
      ShortNameEn: formData.shortNameEn.value,
      MinimumQuantityLimit: formData.minimumQuantityLimit.value,
      SupplyLimit: formData.supplyLimit.value,
      MaximumQuantityLimit: formData.maximumQuantityLimit.value,
      Region: formData.region.value !== "" ? formData.region.value : -1,
      Brand: brandID,
      Id: denominationID,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Denomination/Update`,
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

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    const formData = getState().updateDenominationPage_reducer.formData;
    let isFormValid = true;
    if (formData.cardName.value !== "" && formData.cardName.value.length < 2) {
      isFormValid = false;
      dispatch({
        type: `updateDenominationPage-cardName-errorMsg`,
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
        type: `updateDenominationPage-cardNameEn-errorMsg`,
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
        type: `updateDenominationPage-shortName-errorMsg`,
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
        type: `updateDenominationPage-shortNameEn-errorMsg`,
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
          type: `updateDenominationPage-${key}-errorMsg`,
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
