import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { download } from "../../helperFunctions";
export const updateProviderPurchasesReport = () => {
  return async (dispatch, getState) => {
    try {
      const dateFilter = getState().providerPurchasesReportPage_reducer
        .dateFilter;
      dispatch({
        type: "providerPurchasesReportPage-providerPurchases",
        data: [],
      });
      dispatch({
        type: "providerPurchasesReportPage-tableSorting",
        data: {
          column: null,
          direction: null,
        },
      });
      dispatch(isLoading(true));
      const providerPurchasesReport = await fetchProviderPurchasesReport({
        to: dateFilter.to,
        from: dateFilter.from,
      });
      dispatch({
        type: "providerPurchasesReportPage-providerPurchases",
        data: providerPurchasesReport,
      });
      dispatch(providerPurchasesSortBy("BrandName"));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

export const fetchProviderPurchasesReport = ({ to, from }) => {
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
        `${baseURI}/api/Report/ProviderPurchases?from=${from}&to=${to}`,
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
      type: "providerPurchasesReportPage-isLoading",
      data: isLoading,
    });
  };
};
export const isExportBtnLoading = (isExportBtnLoading) => {
  return (dispatch) => {
    dispatch({
      type: "providerPurchasesReportPage-isExportBtnLoading",
      data: isExportBtnLoading,
    });
  };
};
export const dateFilter = (changedFields) => {
  return (dispatch) => {
    dispatch({
      type: "providerPurchasesReportPage-dateFilter",
      data: changedFields,
    });
  };
};

export const fetchExportProviderPurchasesReport = ({ type, from, to }) => {
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
        `${baseURI}/Export/ProviderPurchasesReport?from=${from}&to=${to}&type=${type}`,
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

export const exportProviderPurchasesReport = (type) => {
  return async (dispatch, getState) => {
    try {
      const dateFilter = getState().providerPurchasesReportPage_reducer
        .dateFilter;
      dispatch(isExportBtnLoading(true));
      const providerPurchasesReportExportData = await fetchExportProviderPurchasesReport(
        {
          to: dateFilter.to,
          from: dateFilter.from,
          type,
        }
      );
      dispatch(isExportBtnLoading(false));
      download(
        "providerPurchases_report",
        providerPurchasesReportExportData,
        type === 1 ? "csv" : "excel"
      );
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isExportBtnLoading(false));
    }
  };
};

export const providerPurchasesSortBy = (column) => {
  return (dispatch, getState) => {
    let providerPurchases = getState().providerPurchasesReportPage_reducer.providerPurchases.slice();
    if (
      column ===
      getState().providerPurchasesReportPage_reducer.tableSorting.column
    ) {
      dispatch({
        type: "providerPurchasesReportPage-tableSorting",
        data: {
          column,
          direction:
            getState().providerPurchasesReportPage_reducer.tableSorting
              .direction === "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "providerPurchasesReportPage-providerPurchases",
        data: providerPurchases.reverse(),
      });
      return;
    }
    switch (column) {
      case "ProviderName":
        providerPurchases = providerPurchases.sort((a, b) => {
          a = a.ProviderName;
          b = b.ProviderName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "BrandName":
        providerPurchases = providerPurchases.sort((a, b) => {
          a = a.BrandName;
          b = b.BrandName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "DenominationName":
        providerPurchases = providerPurchases.sort((a, b) => {
          a = a.DenominationName;
          b = b.DenominationName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "TotalPaid":
        providerPurchases = providerPurchases.sort((a, b) => {
          a = a.TotalPaid;
          b = b.TotalPaid;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "AVGBuyingPrice":
        providerPurchases = providerPurchases.sort((a, b) => {
          a = a.AVGBuyingPrice;
          b = b.AVGBuyingPrice;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "BuyCurrency":
        providerPurchases = providerPurchases.sort((a, b) => {
          a = a.BuyCurrency;
          b = b.BuyCurrency;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "TotalPurchased":
        providerPurchases = providerPurchases.sort((a, b) => {
          a = a.TotalPurchased;
          b = b.TotalPurchased;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "providerPurchasesReportPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "providerPurchasesReportPage-providerPurchases",
      data: providerPurchases,
    });
  };
};
