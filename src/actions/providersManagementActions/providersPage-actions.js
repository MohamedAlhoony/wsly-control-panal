import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
export const fetchInitialData = (signal) => {
  return async (dispatch, getState) => {
    try {
      const {
        search,
        order,
        nextTo,
        numOfResults,
      } = getState().providersPage_reducer;
      dispatch(isLoading(true));
      const providers = await fetchProviders({
        search,
        order,
        nextTo,
        numOfResults,
        denominationID: undefined,
      });
      if (providers.length) {
        dispatch({
          type: "providersPage-providers",
          data: providers,
        });
        dispatch({
          type: "providersPage-nextTo",
          data: providers[providers.length - 1].Id,
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

export const getProviders = (signal, isLoadMore) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const {
        search,
        order,
        nextTo,
        numOfResults,
      } = getState().providersPage_reducer;
      try {
        const providers = await fetchProviders({
          search,
          order,
          nextTo,
          numOfResults,
          signal,
          denominationID: undefined,
        });
        if (isLoadMore) {
          dispatch({
            type: "providersPage-providers",
            data: getState()
              .providersPage_reducer.providers.slice()
              .concat(providers),
          });
        } else {
          dispatch({
            type: "providersPage-providers",
            data: providers,
          });
        }

        if (providers.length) {
          dispatch({
            type: "providersPage-nextTo",
            data: providers[providers.length - 1].Id,
          });
        }
        resolve(providers);
      } catch (error) {
        dispatch(layoutActions.handleHttpError(error));
        reject(error);
      }
    });
  };
};

export const fetchProviders = ({
  search,
  nextTo,
  order,
  numOfResults,
  signal,
  denominationID,
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
        `${baseURI}/api/Provider?denomination=${denominationID}&search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Providers);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const loadMore = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoadingMore(true));
      let providers = await dispatch(getProviders(undefined, true));
      if (providers.length < getState().providersPage_reducer.numOfResults) {
        dispatch(showLoadingMoreBtn(false));
      } else {
        dispatch(showLoadingMoreBtn(true));
      }
      dispatch(isLoadingMore(false));
    } catch (error) {
      dispatch(isLoadingMore(false));
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "providersPage-isLoading", data: isLoading });
  };
};
export const isLoadingMore = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "providersPage-isLoadingMore", data: isLoading });
  };
};
export const showLoadingMoreBtn = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "providersPage-showLoadingMoreBtn", data: isLoading });
  };
};

export const isLoadingProviders = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "providersPage-isLoadingProviders", data: isLoading });
  };
};
