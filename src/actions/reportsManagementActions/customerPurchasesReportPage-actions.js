import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { download } from "../../helperFunctions";
export const updateCustomerPurchasesReport = () => {
  return async (dispatch, getState) => {
    try {
      const dateFilter = getState().customerPurchasesReportPage_reducer
        .dateFilter;
      const userID = getState().customerPurchasesReportPage_reducer.userID;
      dispatch({
        type: "customerPurchasesReportPage-customerPurchases",
        data: [],
      });
      dispatch({
        type: "customerPurchasesReportPage-tableSorting",
        data: {
          column: null,
          direction: null,
        },
      });
      dispatch(isLoading(true));
      const customerPurchasesReport = await fetchCustomerPurchasesReport({
        to: dateFilter.to,
        from: dateFilter.from,
        userID,
      });
      dispatch({
        type: "customerPurchasesReportPage-customerPurchases",
        data: customerPurchasesReport,
      });
      dispatch(customerPurchasesSortBy("BrandName"));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

export const fetchCustomerPurchasesReport = ({ to, from, userID }) => {
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
        `${baseURI}/api/Report/CustomerPurchases?from=${from}&to=${to}&UserId=${userID}`,
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
      type: "customerPurchasesReportPage-isLoading",
      data: isLoading,
    });
  };
};
export const isExportBtnLoading = (isExportBtnLoading) => {
  return (dispatch) => {
    dispatch({
      type: "customerPurchasesReportPage-isExportBtnLoading",
      data: isExportBtnLoading,
    });
  };
};
export const dateFilter = (changedFields) => {
  return (dispatch) => {
    dispatch({
      type: "customerPurchasesReportPage-dateFilter",
      data: changedFields,
    });
  };
};
export const changeUserID = (userID) => {
  return (dispatch) => {
    dispatch({
      type: "customerPurchasesReportPage-userID",
      data: userID,
    });
  };
};

export const fetchExportCustomerPurchasesReport = ({
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
        `${baseURI}/Export/CustomerPurchasesReport?from=${from}&to=${to}&type=${type}&UserId=${userID}`,
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

export const exportCustomerPurchasesReport = (type) => {
  return async (dispatch, getState) => {
    try {
      const dateFilter = getState().customerPurchasesReportPage_reducer
        .dateFilter;
      const userID = getState().customerPurchasesReportPage_reducer.userID;
      dispatch(isExportBtnLoading(true));
      const customerPurchasesReportExportData = await fetchExportCustomerPurchasesReport(
        {
          to: dateFilter.to,
          from: dateFilter.from,
          type,
          userID,
        }
      );
      dispatch(isExportBtnLoading(false));
      download(
        "customerPurchases_report",
        customerPurchasesReportExportData,
        type === 1 ? "csv" : "excel"
      );
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isExportBtnLoading(false));
    }
  };
};

export const customerPurchasesSortBy = (column) => {
  return (dispatch, getState) => {
    let customerPurchases = getState().customerPurchasesReportPage_reducer.customerPurchases.slice();
    if (
      column ===
      getState().customerPurchasesReportPage_reducer.tableSorting.column
    ) {
      dispatch({
        type: "customerPurchasesReportPage-tableSorting",
        data: {
          column,
          direction:
            getState().customerPurchasesReportPage_reducer.tableSorting
              .direction === "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "customerPurchasesReportPage-customerPurchases",
        data: customerPurchases.reverse(),
      });
      return;
    }
    switch (column) {
      case "SubscriptionName":
        customerPurchases = customerPurchases.sort((a, b) => {
          a = a.SubscriptionName;
          b = b.SubscriptionName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "BrandName":
        customerPurchases = customerPurchases.sort((a, b) => {
          a = a.BrandName;
          b = b.BrandName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "DenominationName":
        customerPurchases = customerPurchases.sort((a, b) => {
          a = a.DenominationName;
          b = b.DenominationName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "TotalPaid":
        customerPurchases = customerPurchases.sort((a, b) => {
          a = a.TotalPaid;
          b = b.TotalPaid;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "AVGSellingPrice":
        customerPurchases = customerPurchases.sort((a, b) => {
          a = a.AVGSellingPrice;
          b = b.AVGSellingPrice;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "SellCurrency":
        customerPurchases = customerPurchases.sort((a, b) => {
          a = a.SellCurrency;
          b = b.SellCurrency;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "TotalPurchased":
        customerPurchases = customerPurchases.sort((a, b) => {
          a = a.TotalPurchased;
          b = b.TotalPurchased;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "customerPurchasesReportPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "customerPurchasesReportPage-customerPurchases",
      data: customerPurchases,
    });
  };
};
