import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchBrandDetails } from "../brandsManagementActions/brandDetailsPage-actions";
import { normalizeFetchedData } from "../../helperFunctions";
export const fetchInitialData = (brandID, signal) => {
  return async (dispatch, getState) => {
    try {
      const {
        search,
        order,
        nextTo,
        numOfResults,
      } = getState().denominationsPage_reducer;
      dispatch(isLoading(true));
      const [denominations, brandDetails] = await Promise.all([
        fetchDenominations({
          search,
          order,
          nextTo,
          numOfResults,
          brandID,
        }),
        fetchBrandDetails(brandID),
      ]);
      dispatch({
        type: "denominationsPage-brandDetails",
        data: normalizeFetchedData(brandDetails),
      });
      if (denominations.length) {
        dispatch({
          type: "denominationsPage-denominations",
          data: denominations,
        });
        dispatch({
          type: "denominationsPage-nextTo",
          data: denominations[denominations.length - 1].Id,
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

export const getDenominations = (brandID, signal, isLoadMore) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const {
        search,
        order,
        nextTo,
        numOfResults,
      } = getState().denominationsPage_reducer;
      try {
        const denominations = await fetchDenominations({
          search,
          order,
          nextTo,
          numOfResults,
          signal,
          brandID,
        });
        if (isLoadMore) {
          dispatch({
            type: "denominationsPage-denominations",
            data: getState()
              .denominationsPage_reducer.denominations.slice()
              .concat(denominations),
          });
        } else {
          dispatch({
            type: "denominationsPage-denominations",
            data: denominations,
          });
        }

        if (denominations.length) {
          dispatch({
            type: "denominationsPage-nextTo",
            data: denominations[denominations.length - 1].Id,
          });
        }
        resolve(denominations);
      } catch (error) {
        dispatch(layoutActions.handleHttpError(error));
        reject(error);
      }
    });
  };
};

export const fetchDenominations = ({
  search,
  nextTo,
  order,
  numOfResults,
  signal,
  brandID,
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
        `${baseURI}/api/Denomination?brand=${brandID}&search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Denominations);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const loadMore = (brandID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoadingMore(true));
      let denominations = await dispatch(
        getDenominations(brandID, undefined, true)
      );
      if (
        denominations.length < getState().denominationsPage_reducer.numOfResults
      ) {
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
    dispatch({ type: "denominationsPage-isLoading", data: isLoading });
  };
};
export const isLoadingMore = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "denominationsPage-isLoadingMore", data: isLoading });
  };
};
export const showLoadingMoreBtn = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "denominationsPage-showLoadingMoreBtn", data: isLoading });
  };
};

export const isLoadingDenominations = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "denominationsPage-isLoadingDenominations",
      data: isLoading,
    });
  };
};
