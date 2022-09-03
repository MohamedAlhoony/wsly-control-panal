import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { download } from "../../helperFunctions";
export const fetchInitialData = (providerID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const providerStorageReport = await fetchProviderStorageReport();
      dispatch({
        type: "providerStorageReportPage-providerStorageData",
        data: providerStorageReport,
      });
      dispatch(providerStorageSortBy("Total"));
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
export const fetchProviderStorageReport = () => {
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
        `${baseURI}/api/Report/ProviderStorageAmount`,
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
      type: "providerStorageReportPage-isLoading",
      data: isLoading,
    });
  };
};
export const isExportBtnLoading = (isExportBtnLoading) => {
  return (dispatch) => {
    dispatch({
      type: "providerStorageReportPage-isExportBtnLoading",
      data: isExportBtnLoading,
    });
  };
};
export const dateFilter = (changedFields) => {
  return (dispatch) => {
    dispatch({
      type: "providerStorageReportPage-dateFilter",
      data: changedFields,
    });
  };
};

export const fetchExportProviderStorageReport = ({ type }) => {
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
        `${baseURI}/Export/ProviderStorageAmountReport?type=${type}`,
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

export const exportProviderStorageReport = (type) => {
  return async (dispatch, getState) => {
    try {
      dispatch(isExportBtnLoading(true));
      const providerStorageReportExportData = await fetchExportProviderStorageReport(
        {
          type,
        }
      );
      dispatch(isExportBtnLoading(false));
      download(
        "providerStorage_report",
        providerStorageReportExportData,
        type === 1 ? "csv" : "excel"
      );
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isExportBtnLoading(false));
    }
  };
};

export const providerStorageSortBy = (column) => {
  return (dispatch, getState) => {
    let providerStorageData = getState().providerStorageReportPage_reducer.providerStorageData.slice();
    if (
      column ===
      getState().providerStorageReportPage_reducer.tableSorting.column
    ) {
      dispatch({
        type: "providerStorageReportPage-tableSorting",
        data: {
          column,
          direction:
            getState().providerStorageReportPage_reducer.tableSorting
              .direction === "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "providerStorageReportPage-providerStorageData",
        data: providerStorageData.reverse(),
      });
      return;
    }
    switch (column) {
      case "ProviderName":
        providerStorageData = providerStorageData.sort((a, b) => {
          a = a.ProviderName;
          b = b.ProviderName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "Total":
        providerStorageData = providerStorageData.sort((a, b) => {
          a = a.Total;
          b = b.Total;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "providerStorageReportPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "providerStorageReportPage-providerStorageData",
      data: providerStorageData,
    });
  };
};
