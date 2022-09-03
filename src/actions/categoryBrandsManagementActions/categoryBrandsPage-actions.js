import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { fetchBrands } from "../brandsManagementActions/brandsPage-actions";
import { fetchCategoryDetails } from "../categoriesManagementActions/categoryDetailsPage-actions";
import React from "react";
export const fetchInitialData = (categoryID, signal) => {
  return async (dispatch, getState) => {
    try {
      const {
        search,
        order,
        nextTo,
        numOfResults,
      } = getState().categoryBrandsPage_reducer;
      dispatch(isLoading(true));
      const [categoryBrands, categoryDetails] = await Promise.all([
        fetchBrands({
          search,
          order,
          nextTo,
          numOfResults,
          categoryID,
          signal,
        }),
        fetchCategoryDetails(categoryID),
      ]);
      dispatch({
        type: "categoryBrandsPage-categoryDetails",
        data: categoryDetails,
      });
      if (categoryBrands.length) {
        dispatch({
          type: "categoryBrandsPage-categoryBrands",
          data: categoryBrands,
        });
        dispatch({
          type: "categoryBrandsPage-nextTo",
          data: categoryBrands[categoryBrands.length - 1].Id,
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

export const getCategoryBrands = (categoryID, signal, isLoadMore) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const {
        search,
        order,
        nextTo,
        numOfResults,
      } = getState().categoryBrandsPage_reducer;
      try {
        const categoryBrands = await fetchBrands({
          search,
          order,
          nextTo,
          numOfResults,
          categoryID,
          signal,
        });
        if (isLoadMore) {
          dispatch({
            type: "categoryBrandsPage-categoryBrands",
            data: getState()
              .categoryBrandsPage_reducer.categoryBrands.slice()
              .concat(categoryBrands),
          });
        } else {
          dispatch({
            type: "categoryBrandsPage-categoryBrands",
            data: categoryBrands,
          });
        }

        if (categoryBrands.length) {
          dispatch({
            type: "categoryBrandsPage-nextTo",
            data: categoryBrands[categoryBrands.length - 1].Id,
          });
        }
        resolve(categoryBrands);
      } catch (error) {
        dispatch(layoutActions.handleHttpError(error));
        reject(error);
      }
    });
  };
};

export const loadMore = (categoryID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoadingMore(true));
      let categoryBrands = await dispatch(
        getCategoryBrands(categoryID, undefined, true)
      );
      if (
        categoryBrands.length <
        getState().categoryBrandsPage_reducer.numOfResults
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
    dispatch({ type: "categoryBrandsPage-isLoading", data: isLoading });
  };
};
export const isLoadingMore = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: "categoryBrandsPage-isLoadingMore", data: isLoading });
  };
};
export const showLoadingMoreBtn = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "categoryBrandsPage-showLoadingMoreBtn",
      data: isLoading,
    });
  };
};

export const isLoadingCategoryBrands = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "categoryBrandsPage-isLoadingCategoryBrands",
      data: isLoading,
    });
  };
};

const sendRemoveBrand = (categoryID, brandID) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var urlencoded = new URLSearchParams();
    urlencoded.append("BrandId", brandID);
    urlencoded.append("CategoryId", categoryID);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `${baseURI}/api/Category/Brand/Remove`,
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

export const removeBrand = (categoryID, brand) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      await sendRemoveBrand(categoryID, brand.Id);
      dispatch(
        layoutActions.alertModal({
          show: true,
          body: [
            <span key={0}>
              تمت عملية حذف العلامة التجارية <strong>{brand.Name}</strong> من
              الصنف{" "}
              <strong>
                {getState().categoryBrandsPage_reducer.categoryDetails.Name}
              </strong>{" "}
              بنجاح
            </span>,
          ],
        })
      );
      if (!getState().categoryBrandsPage_reducer.showLoadingMoreBtn) {
        dispatch(showLoadingMoreBtn(true));
      }
      dispatch({
        type: "categoryBrandsPage-categoryBrands",
        data: [],
      });
      dispatch({
        type: "categoryBrandsPage-nextTo",
        data: 0,
      });
      await dispatch(getCategoryBrands(categoryID));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

const fetchAvailableBrandsToAddToACategory = ({
  categoryID,
  search,
  order,
  nextTo,
  numOfResults,
}) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${baseURI}/api/Category/Brand?category=${categoryID}&search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Brands);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getAvailableBrandsToAddToACategory = (categoryID) => {
  return async (dispatch) => {
    try {
      dispatch(addBrandToCategoryModal({ isLoading: true }));
      const availableToAddBrands = await fetchAvailableBrandsToAddToACategory({
        categoryID,
        search: "",
        numOfResults: 6400,
        order: true,
        nextTo: 0,
      });
      dispatch(
        addBrandToCategoryModal({
          isLoading: false,
          availableToAddBrands,
        })
      );
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(resetAddBrandToCategoryModalState());
    }
  };
};

export const addBrandToCategoryModal = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "categoryBrandsPage-addBrandToCategoryModal",
      data: {
        ...getState().categoryBrandsPage_reducer.addBrandToCategoryModal,
        ...changedFields,
      },
    });
  };
};
export const addBrandToCategoryModalSelectedBrand_brand = (value) => {
  return (dispatch, getState) => {
    dispatch({
      type: "categoryBrandsPage-addBrandToCategoryModal-selectBrandInput-brand",
      data: value,
    });
  };
};
export const resetAddBrandToCategoryModalState = () => {
  return (dispatch) => {
    dispatch({
      type: "categoryBrandsPage-addBrandToCategoryModal",
      data: {
        show: false,
        isLoading: false,
        availableToAddBrands: [],
        selectBrandInput: {
          brand: null,
          errorMsg: "",
        },
      },
    });
  };
};

const sendAddBrandToCategory = (categoryID, brandID) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    var urlencoded = new URLSearchParams();
    urlencoded.append("BrandId", brandID);
    urlencoded.append("CategoryId", categoryID);
    var requestOptions = {
      method: "POSt",
      headers: myHeaders,
      redirect: "follow",
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `${baseURI}/api/Category/Brand/Add`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body.Brands);
      } else {
        reject({ code: body?.errorCode, message: body?.message });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const submitCateogryBrand = (categoryID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(addBrandToCategoryModal({ isLoading: true }));
      const brand = getState().categoryBrandsPage_reducer
        .addBrandToCategoryModal.selectBrandInput.brand;
      await sendAddBrandToCategory(categoryID, brand.Id);
      dispatch(addBrandToCategoryModal({ isLoading: false }));
      dispatch(resetAddBrandToCategoryModalState());
      dispatch(
        layoutActions.alertModal({
          show: true,
          body: [
            <span key={0}>
              تمت عملية إضافة العلامة التجارية <strong>{brand.Name}</strong> إلى
              الصنف{" "}
              <strong>
                {getState().categoryBrandsPage_reducer.categoryDetails.Name}
              </strong>{" "}
              بنجاح.
            </span>,
          ],
        })
      );
      if (!getState().categoryBrandsPage_reducer.showLoadingMoreBtn) {
        dispatch(showLoadingMoreBtn(true));
      }
      dispatch({
        type: "categoryBrandsPage-categoryBrands",
        data: [],
      });
      dispatch({
        type: "categoryBrandsPage-nextTo",
        data: 0,
      });
      dispatch(isLoading(true));
      await dispatch(getCategoryBrands(categoryID));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(addBrandToCategoryModal({ isLoading: false }));
      dispatch(layoutActions.handleHttpError(error));
    }
  };
};
