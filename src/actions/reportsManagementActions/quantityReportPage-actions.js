import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { download } from "../../helperFunctions";
export const fetchInitialData = (providerID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const quantityReport = await fetchQuantityReport();
      dispatch({
        type: "quantityReportPage-quantityData",
        data: quantityReport,
      });
      dispatch(quantitySortBy("Quantity"));
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
export const fetchQuantityReport = () => {
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
        `${baseURI}/api/Report/Quantity`,
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
      type: "quantityReportPage-isLoading",
      data: isLoading,
    });
  };
};
export const isExportBtnLoading = (isExportBtnLoading) => {
  return (dispatch) => {
    dispatch({
      type: "quantityReportPage-isExportBtnLoading",
      data: isExportBtnLoading,
    });
  };
};
export const dateFilter = (changedFields) => {
  return (dispatch) => {
    dispatch({
      type: "quantityReportPage-dateFilter",
      data: changedFields,
    });
  };
};

export const fetchExportQuantityReport = ({ type }) => {
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
        `${baseURI}/Export/QuantityReport?type=${type}`,
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

export const exportQuantityReport = (type) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isExportBtnLoading(true));
      const quantityReportExportData = await fetchExportQuantityReport({
        type,
      });
      dispatch(isExportBtnLoading(false));
      download(
        "quantity_report",
        quantityReportExportData,
        type === 1 ? "csv" : "excel"
      );
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isExportBtnLoading(false));
    }
  };
};

export const quantitySortBy = (column) => {
  return (dispatch, getState) => {
    let quantityData = getState().quantityReportPage_reducer.quantityData.slice();
    if (column === getState().quantityReportPage_reducer.tableSorting.column) {
      dispatch({
        type: "quantityReportPage-tableSorting",
        data: {
          column,
          direction:
            getState().quantityReportPage_reducer.tableSorting.direction ===
            "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "quantityReportPage-quantityData",
        data: quantityData.reverse(),
      });
      return;
    }
    switch (column) {
      case "BrandName":
        quantityData = quantityData.sort((a, b) => {
          a = a.BrandName;
          b = b.BrandName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "DenominationName":
        quantityData = quantityData.sort((a, b) => {
          a = a.DenominationName;
          b = b.DenominationName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "MinimumQuantityLimit":
        quantityData = quantityData.sort((a, b) => {
          a = a.MinimumQuantityLimit;
          b = b.MinimumQuantityLimit;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "SupplyLimit":
        quantityData = quantityData.sort((a, b) => {
          a = a.SupplyLimit;
          b = b.SupplyLimit;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "MaximumQuantityLimit":
        quantityData = quantityData.sort((a, b) => {
          a = a.MaximumQuantityLimit;
          b = b.MaximumQuantityLimit;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "Quantity":
        quantityData = quantityData.sort((a, b) => {
          a = a.Quantity;
          b = b.Quantity;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "quantityReportPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "quantityReportPage-quantityData",
      data: quantityData,
    });
  };
};
