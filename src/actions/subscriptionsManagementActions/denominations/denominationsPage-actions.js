import auth from "../../../auth";
import { baseURI } from "../../../config";
import * as layoutActions from "../../layout-actions";
import { fetchSubscriptionDetails } from "../../subscriptionsManagementActions/subscriptionDetailsPage-actions";
export const fetchInitialData = (subscriptionID, signal) => {
  return async (dispatch, getState) => {
    try {
      const {
        search,
        nextTo,
        order,
        numOfResults,
      } = getState().subscriptionDenominationsPage_reducer;
      dispatch(isLoading(true));
      const [denominations, subscriptionDetails] = await Promise.all([
        fetchDenominations({
          subscriptionID,
          signal,
          search,
          nextTo,
          order,
          numOfResults,
        }),
        fetchSubscriptionDetails(subscriptionID, signal),
      ]);
      if (denominations.length) {
        dispatch({
          type: "subscriptionDenominationsPage-denominations",
          data: denominations,
        });
        dispatch({
          type: "subscriptionDenominationsPage-nextTo",
          data: denominations[denominations.length - 1].Brand.Denomination.Id,
        });
      }
      dispatch({
        type: "subscriptionDenominationsPage-subscriptionDetails",
        data: subscriptionDetails,
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
export const getDenominations = (subscriptionID, signal, isLoadMore) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const {
        search,
        nextTo,
        order,
        numOfResults,
      } = getState().subscriptionDenominationsPage_reducer;
      try {
        const denominations = await fetchDenominations({
          search,
          nextTo,
          order,
          numOfResults,
          subscriptionID,
          signal,
        });
        if (isLoadMore) {
          dispatch({
            type: "subscriptionDenominationsPage-denominations",
            data: getState()
              .subscriptionDenominationsPage_reducer.denominations.slice()
              .concat(denominations),
          });
        } else {
          dispatch({
            type: "subscriptionDenominationsPage-denominations",
            data: denominations,
          });
        }
        if (denominations.length) {
          dispatch({
            type: "subscriptionDenominationsPage-nextTo",
            data: denominations[denominations.length - 1].Brand.Denomination.Id,
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
  subscriptionID,
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
        `${baseURI}/api/Subscription/Denominations?subscription=${subscriptionID}&search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.SubscriptionDenominations);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const loadMore = (subscriptionID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoadingMore(true));
      let denominations = await dispatch(
        getDenominations(subscriptionID, undefined, true)
      );
      if (
        denominations.length <
        getState().subscriptionDenominationsPage_reducer.numOfResults
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
    dispatch({
      type: "subscriptionDenominationsPage-isLoading",
      data: isLoading,
    });
  };
};
export const isLoadingMore = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "subscriptionDenominationsPage-isLoadingMore",
      data: isLoading,
    });
  };
};
export const showLoadingMoreBtn = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "subscriptionDenominationsPage-showLoadingMoreBtn",
      data: isLoading,
    });
  };
};

export const isLoadingDenominations = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "subscriptionDenominationsPage-isLoadingDenominations",
      data: isLoading,
    });
  };
};

const sendRemoveDenomination = (subscriptionID, denominationID) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var urlencoded = new URLSearchParams();
    urlencoded.append("Denomination", denominationID);
    urlencoded.append("Subscription", subscriptionID);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `${baseURI}/api/Subscription/Denomination/Remove`,
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

export const removeDenomination = (subscriptionID, denomination) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      await sendRemoveDenomination(subscriptionID, denomination.Id);
      dispatch(
        layoutActions.alertModal({
          show: true,
          body: `تمت عملية حذف الفئة "${denomination.Name}" من الاشتراك "${
            getState().subscriptionDenominationsPage_reducer.subscriptionDetails
              ?.Name
          }" بنجاح`,
        })
      );
      if (
        !getState().subscriptionDenominationsPage_reducer.showLoadingMoreBtn
      ) {
        dispatch(showLoadingMoreBtn(true));
      }
      dispatch({
        type: "subscriptionDenominationsPage-denominations",
        data: [],
      });
      dispatch({
        type: "subscriptionDenominationsPage-nextTo",
        data: 0,
      });
      await dispatch(getDenominations(subscriptionID));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};
