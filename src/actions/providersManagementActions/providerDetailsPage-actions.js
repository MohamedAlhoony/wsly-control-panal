import auth from "../../auth";
import { baseURI } from "../../config";
import { normalizeFetchedData } from "../../helperFunctions";
import * as layoutActions from "../layout-actions";

export const fetchInitialData = (providerID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const providerDetails = await fetchProviderDetails(providerID);
      dispatch({
        type: "providerDetailsPage-providerDetails",
        data: normalizeFetchedData(providerDetails),
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

export const fetchProviderDetails = (providerID) => {
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
      var response = await fetch(
        `${baseURI}/api/Provider/${providerID}`,
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

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "providerDetailsPage-isLoading", data: isLoading });
  };
};
