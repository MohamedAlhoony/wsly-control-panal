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
      } = getState().managersPage_reducer;
      dispatch(isLoading(true));
      const managers = await fetchManagers({
        search,
        order,
        nextTo,
        numOfResults,
        signal,
      });
      if (managers.length) {
        dispatch({
          type: "managersPage-managers",
          data: managers,
        });
        dispatch({
          type: "managersPage-nextTo",
          data: managers[managers.length - 1].CreatedDate,
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

export const getManagers = (signal, isLoadMore) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const {
        search,
        order,
        nextTo,
        numOfResults,
      } = getState().managersPage_reducer;
      try {
        const managers = await fetchManagers({
          search,
          order,
          nextTo,
          numOfResults,
          signal,
        });
        if (isLoadMore) {
          dispatch({
            type: "managersPage-managers",
            data: getState()
              .managersPage_reducer.managers.slice()
              .concat(managers),
          });
        } else {
          dispatch({
            type: "managersPage-managers",
            data: managers,
          });
        }

        if (managers.length) {
          dispatch({
            type: "managersPage-nextTo",
            data: managers[managers.length - 1].CreatedDate,
          });
        }
        resolve(managers);
      } catch (error) {
        dispatch(layoutActions.handleHttpError(error));
        reject(error);
      }
    });
  };
};

export const fetchManagers = ({
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
        `${baseURI}/api/Manager?search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Managers);
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
      let managers = await dispatch(getManagers(undefined, true));
      if (managers.length < getState().managersPage_reducer.numOfResults) {
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
    dispatch({ type: "managersPage-isLoading", data: isLoading });
  };
};
export const isLoadingMore = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "managersPage-isLoadingMore", data: isLoading });
  };
};
export const showLoadingMoreBtn = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "managersPage-showLoadingMoreBtn", data: isLoading });
  };
};

export const isLoadingManagers = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "managersPage-isLoadingManagers", data: isLoading });
  };
};
