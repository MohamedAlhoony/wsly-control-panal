import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { download } from "../../helperFunctions";

export const updateSalesReport = () => {
  return async (dispatch, getState) => {
    try {
      const dateFilter = getState().salesReportPage_reducer.dateFilter;
      dispatch({
        type: "salesReportPage-sales",
        data: [],
      });
      dispatch({
        type: "salesReportPage-tableSorting",
        data: {
          column: null,
          direction: null,
        },
      });
      dispatch(isLoading(true));
      const salesReport = await fetchSalesReport({
        to: dateFilter.to,
        from: dateFilter.from,
      });
      dispatch({
        type: "salesReportPage-sales",
        data: salesReport,
      });
      dispatch(salesSortBy("BrandName"));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

export const fetchSalesReport = ({ to, from }) => {
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
        `${baseURI}/api/Report/Sales?from=${from}&to=${to}`,
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
    dispatch({ type: "salesReportPage-isLoading", data: isLoading });
  };
};
export const isExportBtnLoading = (isExportBtnLoading) => {
  return (dispatch) => {
    dispatch({
      type: "salesReportPage-isExportBtnLoading",
      data: isExportBtnLoading,
    });
  };
};
export const dateFilter = (changedFields) => {
  return (dispatch) => {
    dispatch({ type: "salesReportPage-dateFilter", data: changedFields });
  };
};

export const fetchExportSalesReport = ({ type, from, to }) => {
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
        `${baseURI}/Export/SalesReport?from=${from}&to=${to}&type=${type}`,
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

export const exportSalesReport = (type) => {
  return async (dispatch, getState) => {
    try {
      const dateFilter = getState().salesReportPage_reducer.dateFilter;
      dispatch(isExportBtnLoading(true));
      const salesReportExportData = await fetchExportSalesReport({
        to: dateFilter.to,
        from: dateFilter.from,
        type,
      });
      dispatch(isExportBtnLoading(false));
      download(
        "sales_report",
        salesReportExportData,
        type === 1 ? "csv" : "excel"
      );
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isExportBtnLoading(false));
    }
  };
};

export const salesSortBy = (column) => {
  return (dispatch, getState) => {
    let sales = getState().salesReportPage_reducer.sales.slice();
    if (column === getState().salesReportPage_reducer.tableSorting.column) {
      dispatch({
        type: "salesReportPage-tableSorting",
        data: {
          column,
          direction:
            getState().salesReportPage_reducer.tableSorting.direction ===
            "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "salesReportPage-sales",
        data: sales.reverse(),
      });
      return;
    }
    switch (column) {
      case "SubscriptionName":
        sales = sales.sort((a, b) => {
          a = a.SubscriptionName;
          b = b.SubscriptionName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "BrandName":
        sales = sales.sort((a, b) => {
          a = a.BrandName;
          b = b.BrandName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "DenominationName":
        sales = sales.sort((a, b) => {
          a = a.DenominationName;
          b = b.DenominationName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "TotalNumberOfSales":
        sales = sales.sort((a, b) => {
          a = a.TotalNumberOfSales;
          b = b.TotalNumberOfSales;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "AVGBuyingPrice":
        sales = sales.sort((a, b) => {
          a = a.AVGBuyingPrice;
          b = b.AVGBuyingPrice;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "BuyCurrency":
        sales = sales.sort((a, b) => {
          a = a.BuyCurrency;
          b = b.BuyCurrency;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "AVGSellingPrice":
        sales = sales.sort((a, b) => {
          a = a.AVGSellingPrice;
          b = b.AVGSellingPrice;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "SellCurrency":
        sales = sales.sort((a, b) => {
          a = a.SellCurrency;
          b = b.SellCurrency;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "Profit":
        sales = sales.sort((a, b) => {
          a = a.Profit;
          b = b.Profit;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "TotalSales":
        sales = sales.sort((a, b) => {
          a = a.TotalSales;
          b = b.TotalSales;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "salesReportPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "salesReportPage-sales",
      data: sales,
    });
  };
};
