import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { download } from "../../helperFunctions";
import { fetchProviders } from "../providersManagementActions/providersPage-actions";
export const fetchInitialData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(isLoading(true));
      const providersArray = await fetchProviders({
        search: "",
        numOfResults: "6400",
        order: true,
        nextTo: 0,
        denominationID: undefined,
      });
      dispatch({
        type: "providerTopupsReportPage-providers",
        data: providersArray,
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
export const updateProviderTopupsReport = () => {
  return async (dispatch, getState) => {
    try {
      const dateFilter = getState().providerTopupsReportPage_reducer.dateFilter;
      const providerID = getState().providerTopupsReportPage_reducer.providerID;
      dispatch({
        type: "providerTopupsReportPage-providerTopups",
        data: [],
      });
      dispatch({
        type: "providerTopupsReportPage-tableSorting",
        data: {
          column: null,
          direction: null,
        },
      });
      dispatch(isLoading(true));
      const providerTopupsReport = await fetchProviderTopupsReport({
        to: dateFilter.to,
        from: dateFilter.from,
        providerID,
      });
      dispatch({
        type: "providerTopupsReportPage-providerTopups",
        data: providerTopupsReport,
      });
      dispatch(providerTopupsSortBy("BrandName"));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

export const fetchProviderTopupsReport = ({ to, from, providerID }) => {
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
        `${baseURI}/api/Report/ProviderTopups?from=${from}&to=${to}&Provider=${providerID}`,
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
      type: "providerTopupsReportPage-isLoading",
      data: isLoading,
    });
  };
};
export const isExportBtnLoading = (isExportBtnLoading) => {
  return (dispatch) => {
    dispatch({
      type: "providerTopupsReportPage-isExportBtnLoading",
      data: isExportBtnLoading,
    });
  };
};
export const dateFilter = (changedFields) => {
  return (dispatch) => {
    dispatch({
      type: "providerTopupsReportPage-dateFilter",
      data: changedFields,
    });
  };
};
export const changeProviderID = (providerID) => {
  return (dispatch) => {
    dispatch({
      type: "providerTopupsReportPage-providerID",
      data: providerID,
    });
  };
};

export const fetchExportProviderTopupsReport = ({
  type,
  from,
  to,
  providerID,
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
        `${baseURI}/Export/ProviderTopupsReport?from=${from}&to=${to}&type=${type}&Provider=${providerID}`,
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

export const exportProviderTopupsReport = (type) => {
  return async (dispatch, getState) => {
    try {
      const dateFilter = getState().providerTopupsReportPage_reducer.dateFilter;
      const providerID = getState().providerTopupsReportPage_reducer.providerID;
      dispatch(isExportBtnLoading(true));
      const providerTopupsReportExportData = await fetchExportProviderTopupsReport(
        {
          to: dateFilter.to,
          from: dateFilter.from,
          type,
          providerID,
        }
      );
      dispatch(isExportBtnLoading(false));
      download(
        "providerTopups_report",
        providerTopupsReportExportData,
        type === 1 ? "csv" : "excel"
      );
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isExportBtnLoading(false));
    }
  };
};

export const providerTopupsSortBy = (column) => {
  return (dispatch, getState) => {
    let providerTopups = getState().providerTopupsReportPage_reducer.providerTopups.slice();
    if (
      column === getState().providerTopupsReportPage_reducer.tableSorting.column
    ) {
      dispatch({
        type: "providerTopupsReportPage-tableSorting",
        data: {
          column,
          direction:
            getState().providerTopupsReportPage_reducer.tableSorting
              .direction === "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "providerTopupsReportPage-providerTopups",
        data: providerTopups.reverse(),
      });
      return;
    }
    switch (column) {
      case "Amount":
        providerTopups = providerTopups.sort((a, b) => {
          a = a.Amount;
          b = b.Amount;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "Date":
        providerTopups = providerTopups.sort((a, b) => {
          a = a.Date;
          b = b.Date;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;

      default:
    }
    dispatch({
      type: "providerTopupsReportPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "providerTopupsReportPage-providerTopups",
      data: providerTopups,
    });
  };
};
