import auth from "../../../auth";
import { baseURI } from "../../../config";
import * as layoutActions from "../../layout-actions";
import { sendConfirmBatch } from "./batchesPage-actions";
import {
  fetchBrands,
  fetchDenominations,
  fetchCategories,
} from "../../subscriptionsManagementActions/denominations/addDenominationPage-actions";
export const updateFields = (value, id) => {
  return async (dispatch, getState) => {
    switch (id) {
      case "denomination":
        try {
          dispatch(providers({ data: [], isLoading: true }));
          dispatch({
            type: "createBatchPage-provider-value",
            data: { id: "provider", value: "" },
          });
          const providersArray = await fetchProviders({
            search: "",
            numOfResults: "6400",
            order: true,
            nextTo: 0,
            denominationID: value,
          });
          if (!providersArray.length) {
            throw Error("يجب إضافة الفئة إلى مزود قبل إكمال هذه العملية.");
          }
          dispatch(
            providers({
              data: providersArray,
              isLoading: false,
            })
          );
        } catch (error) {
          dispatch(providers({ isLoading: false, data: [] }));
          dispatch(layoutActions.handleHttpError(error));
        }
        break;
      case "brand":
        dispatch(denominations({ isLoading: true, data: [] }));
        dispatch({
          type: "createBatchPage-denomination-value",
          data: { id: "denomination", value: "" },
        });
        dispatch(providers({ data: [] }));
        dispatch({
          type: "createBatchPage-provider-value",
          data: { id: "provider", value: "" },
        });
        try {
          const denominationsArray = await fetchDenominations({
            subscriptionID: "",
            search: "",
            numOfResults: "6400",
            order: true,
            nextTo: 0,
            brandID: getState().createBatchPage_reducer.formData.brand.value,
          });
          dispatch(
            denominations({
              isLoading: false,
              data: denominationsArray,
            })
          );
        } catch (error) {
          dispatch(denominations({ isLoading: false, data: [] }));
          dispatch(layoutActions.handleHttpError(error));
        }
        break;
      case "category":
        dispatch(brands({ isLoading: true, data: [] }));
        dispatch(denominations({ isLoading: false, data: [] }));
        dispatch(providers({ isLoading: false, data: [] }));
        dispatch({
          type: "createBatchPage-provider-value",
          data: { id: "provider", value: "" },
        });
        dispatch({
          type: "createBatchPage-brand-value",
          data: { id: "brand", value: "" },
        });
        dispatch({
          type: "createBatchPage-denomination-value",
          data: { id: "denomination", value: "" },
        });
        try {
          const brandsArray = await fetchBrands({
            subscriptionID: "",
            search: "",
            numOfResults: "6400",
            order: true,
            nextTo: 0,
            categoryID: getState().createBatchPage_reducer.formData.category
              .value,
          });
          dispatch(brands({ isLoading: false, data: brandsArray }));
        } catch (error) {
          dispatch(brands({ isLoading: false, data: [] }));
          dispatch(layoutActions.handleHttpError(error));
        }
        break;
      default:
    }
  };
};

export const fetchProviders = ({
  search,
  nextTo,
  order,
  numOfResults,
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

export const changeFormFieldValue = (value, id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: `createBatchPage-${id}-value`,
      data: { value, id },
    });

    if (getState().createBatchPage_reducer.formData[id].errorMsg !== "") {
      dispatch({
        type: `createBatchPage-${id}-errorMsg`,
        data: { value: "", id: id },
      });
    }
  };
};

export const isLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({
      type: "createBatchPage-isLoading",
      data: isLoading,
    });
  };
};

export const providers = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "createBatchPage-providers",
      data: {
        ...getState().createBatchPage_reducer.providers,
        ...changedFields,
      },
    });
  };
};

export const categories = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "createBatchPage-categories",
      data: {
        ...getState().createBatchPage_reducer.categories,
        ...changedFields,
      },
    });
  };
};
export const brands = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "createBatchPage-brands",
      data: {
        ...getState().createBatchPage_reducer.brands,
        ...changedFields,
      },
    });
  };
};
export const denominations = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "createBatchPage-denominations",
      data: {
        ...getState().createBatchPage_reducer.denominations,
        ...changedFields,
      },
    });
  };
};

export const fetchInitialData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const categoriesArray = await fetchCategories({
        search: "",
        numOfResults: "6400",
        order: true,
        nextTo: 0,
        filter: 9,
      });

      dispatch(categories({ data: categoriesArray }));
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

export const confirmBatch = (batchID) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const responseBody = await sendConfirmBatch(batchID);
      if (responseBody?.ConfirmedNumber > 0) {
        dispatch(
          layoutActions.alertModal({
            show: true,
            body: `تم إضافة عدد ${responseBody.ConfirmedNumber} بطاقة إلى المخزون.`,
            redirectBtnText: "عرض الدفعة",
            redirectBtnPath: `/batches/${batchID}/cards`,
          })
        );
      } else {
        dispatch(
          layoutActions.alertModal({
            show: true,
            isSuccess: false,
            body:
              "لم يتم اضافة اي بطاقة الى المخزون, يبدو انك قمت بإضافة البطاقات مسبقاً!",
          })
        );
      }
      dispatch({
        type: "createBatchPage-createdBatchData",
        data: null,
      });
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(isLoading(false));
      dispatch(layoutActions.handleHttpError(error));
    }
  };
};

const sendFormData = (formData) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth.userData.access_token}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      Denomination: Number(formData.denomination.value),
      Provider: Number(formData.provider.value),
      Cards: formData.cardsFile.value.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    };

    try {
      const response = await fetch(
        `${baseURI}/api/Inventory/Batch/Create`,
        requestOptions
      );
      const body = JSON.parse(await response.text());
      if (response.status === 200) {
        resolve(body);
      } else {
        reject(body);
      }
    } catch (error) {
      reject();
    }
  });
};

export const submitForm = () => {
  return async (dispatch, getState) => {
    try {
      const formData = getState().createBatchPage_reducer.formData;
      dispatch(isLoading(true));
      const createdBatchData = await sendFormData(formData);
      dispatch({
        type: "createBatchPage-createdBatchData",
        data: createdBatchData,
      });
      dispatch(clearFormFields());
      dispatch(
        layoutActions.alertModal({
          show: true,
          body:
            'تم رفع البطاقات بنجاح, للإضافة البطاقات إلى المخزون اضغط على زر "الإضافة الى المخزون" بعد غلق النافذة.',
        })
      );
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      // dispatch(postSubmitValidation(error ? error : null))
      dispatch(isLoading(false));
    }
  };
};

const clearFormFields = () => {
  return async (dispatch, getState) => {
    const formData = getState().createBatchPage_reducer.formData;
    for (let key in formData) {
      if (key !== "cardsFile") {
        dispatch(changeFormFieldValue("", key));
      } else {
        dispatch(
          changeFormFieldValue({ value: "", filePath: "", name: "" }, key)
        );
      }
    }
    dispatch(brands({ data: [] }));
    dispatch(denominations({ data: [] }));
    dispatch(providers({ data: [] }));
  };
};

export const preSubmitValidation = (cb) => {
  return (dispatch, getState) => {
    let isFormValid = true;
    const formData = getState().createBatchPage_reducer.formData;
    for (let key in formData) {
      if (
        (key !== "cardsFile" &&
          formData[key].config.required &&
          formData[key].value === "") ||
        (key === "cardsFile" &&
          formData[key].config.required &&
          formData[key].value.value === "")
      ) {
        isFormValid = false;
        dispatch({
          type: `createBatchPage-${key}-errorMsg`,
          data: { value: "يجب تعبئة هذا الحقل", id: key },
        });
      }
    }
    cb(isFormValid);
  };
};

const postSubmitValidation = (error) => {
  return (dispatch, getState) => {
    switch (error.code) {
      default:
        dispatch(
          layoutActions.alertModal({
            body: error.message,
            isSuccess: false,
            show: true,
          })
        );
    }
  };
};
