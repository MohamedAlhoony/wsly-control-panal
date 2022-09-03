import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { download } from "../../helperFunctions";
export const updateCustomerPurchasedCardsReport = () => {
  return async (dispatch, getState) => {
    try {
      const dateFilter = getState().customerPurchasedCardsReportPage_reducer
        .dateFilter;
      const userID = getState().customerPurchasedCardsReportPage_reducer.userID;
      dispatch({
        type: "customerPurchasedCardsReportPage-customerPurchasedCards",
        data: [],
      });
      dispatch({
        type: "customerPurchasedCardsReportPage-tableSorting",
        data: {
          column: null,
          direction: null,
        },
      });
      dispatch(isLoading(true));
      const customerPurchasedCardsReport = await fetchCustomerPurchasedCardsReport(
        {
          to: dateFilter.to,
          from: dateFilter.from,
          userID,
        }
      );
      dispatch({
        type: "customerPurchasedCardsReportPage-customerPurchasedCards",
        data: customerPurchasedCardsReport,
      });
      dispatch(customerPurchasedCardsSortBy("BrandName"));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

export const fetchCustomerPurchasedCardsReport = ({ to, from, userID }) => {
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
        `${baseURI}/api/Report/CustomerPurchasedCards?from=${from}&to=${to}&UserId=${userID}`,
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
    dispatch({
      type: "customerPurchasedCardsReportPage-isLoading",
      data: isLoading,
    });
  };
};
export const isExportBtnLoading = (isExportBtnLoading) => {
  return (dispatch) => {
    dispatch({
      type: "customerPurchasedCardsReportPage-isExportBtnLoading",
      data: isExportBtnLoading,
    });
  };
};
export const dateFilter = (changedFields) => {
  return (dispatch) => {
    dispatch({
      type: "customerPurchasedCardsReportPage-dateFilter",
      data: changedFields,
    });
  };
};
export const changeUserID = (userID) => {
  return (dispatch) => {
    dispatch({
      type: "customerPurchasedCardsReportPage-userID",
      data: userID,
    });
  };
};

export const fetchExportCustomerPurchasedCardsReport = ({
  type,
  from,
  to,
  userID,
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
        `${baseURI}/Export/CustomerPurchasedCardsReport?from=${from}&to=${to}&type=${type}&UserId=${userID}`,
        requestOptions
      );
      const body = await response.text();
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

export const exportCustomerPurchasedCardsReport = (type) => {
  return async (dispatch, getState) => {
    try {
      const dateFilter = getState().customerPurchasedCardsReportPage_reducer
        .dateFilter;
      const userID = getState().customerPurchasedCardsReportPage_reducer.userID;
      dispatch(isExportBtnLoading(true));
      const customerPurchasedCardsReportExportData = await fetchExportCustomerPurchasedCardsReport(
        {
          to: dateFilter.to,
          from: dateFilter.from,
          type,
          userID,
        }
      );
      dispatch(isExportBtnLoading(false));
      download(
        "customerPurchasedCards_report",
        customerPurchasedCardsReportExportData,
        type === 1 ? "csv" : "excel"
      );
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isExportBtnLoading(false));
    }
  };
};

export const customerPurchasedCardsSortBy = (column) => {
  return (dispatch, getState) => {
    let customerPurchasedCards = getState().customerPurchasedCardsReportPage_reducer.customerPurchasedCards.slice();
    if (
      column ===
      getState().customerPurchasedCardsReportPage_reducer.tableSorting.column
    ) {
      dispatch({
        type: "customerPurchasedCardsReportPage-tableSorting",
        data: {
          column,
          direction:
            getState().customerPurchasedCardsReportPage_reducer.tableSorting
              .direction === "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "customerPurchasedCardsReportPage-customerPurchasedCards",
        data: customerPurchasedCards.reverse(),
      });
      return;
    }
    switch (column) {
      case "InvoiceId":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.InvoiceId;
          b = b.InvoiceId;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "CreatedDate":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.CreatedDate;
          b = b.CreatedDate;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "BrandName":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.BrandName;
          b = b.BrandName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "DenominationName":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.DenominationName;
          b = b.DenominationName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "SerialNumber":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.SerialNumber;
          b = b.SerialNumber;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "SecretNumber":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.SecretNumber;
          b = b.SecretNumber;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "MetaData":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.MetaData;
          b = b.MetaData;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "SellingPrice":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.SellingPrice;
          b = b.SellingPrice;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "SellCurrency":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.SellCurrency;
          b = b.SellCurrency;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "ExpirationDate":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.ExpirationDate;
          b = b.ExpirationDate;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "Batch":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.Batch;
          b = b.Batch;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "ProviderName":
        customerPurchasedCards = customerPurchasedCards.sort((a, b) => {
          a = a.ProviderName;
          b = b.ProviderName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "customerPurchasedCardsReportPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "customerPurchasedCardsReportPage-customerPurchasedCards",
      data: customerPurchasedCards,
    });
  };
};
