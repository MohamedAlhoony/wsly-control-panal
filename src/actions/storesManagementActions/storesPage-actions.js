import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
export const fetchInitialData = (signal) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const stores = await fetchStores();
      if (stores.length) {
        dispatch({
          type: "storesPage-stores",
          data: stores,
        });
      }
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

export const fetchStores = () => {
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
      var response = await fetch(`${baseURI}/store/Stores`, requestOptions);
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
    dispatch({ type: "storesPage-isLoading", data: isLoading });
  };
};
