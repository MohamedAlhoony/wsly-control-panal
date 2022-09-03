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
      } = getState().categoriesPage_reducer;
      dispatch(isLoading(true));
      const categories = await fetchCategories({
        search,
        order,
        nextTo,
        numOfResults,
        signal,
        filter: 4,
      });
      if (categories.length) {
        dispatch({
          type: "categoriesPage-categories",
          data: categories,
        });
        dispatch({
          type: "categoriesPage-nextTo",
          data: categories[categories.length - 1].Id,
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

export const getCategories = (signal, isLoadMore) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const {
        search,
        order,
        nextTo,
        numOfResults,
      } = getState().categoriesPage_reducer;
      try {
        const categories = await fetchCategories({
          search,
          order,
          nextTo,
          numOfResults,
          signal,
          filter: 4,
        });
        if (isLoadMore) {
          dispatch({
            type: "categoriesPage-categories",
            data: getState()
              .categoriesPage_reducer.categories.slice()
              .concat(categories),
          });
        } else {
          dispatch({
            type: "categoriesPage-categories",
            data: categories,
          });
        }

        if (categories.length) {
          dispatch({
            type: "categoriesPage-nextTo",
            data: categories[categories.length - 1].Id,
          });
        }
        resolve(categories);
      } catch (error) {
        dispatch(layoutActions.handleHttpError(error));
        reject(error);
      }
    });
  };
};

export const fetchCategories = ({
  search,
  nextTo,
  order,
  numOfResults,
  signal,
  filter,
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
        `${baseURI}/api/Category?search=${search.trim()}&filter=${filter}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Categories);
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
      let categories = await dispatch(getCategories(undefined, true));
      if (categories.length < getState().categoriesPage_reducer.numOfResults) {
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
    dispatch({ type: "categoriesPage-isLoading", data: isLoading });
  };
};
export const isLoadingMore = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "categoriesPage-isLoadingMore", data: isLoading });
  };
};
export const showLoadingMoreBtn = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "categoriesPage-showLoadingMoreBtn", data: isLoading });
  };
};

export const isLoadingCategories = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "categoriesPage-isLoadingCategories",
      data: isLoading,
    });
  };
};
