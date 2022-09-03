import auth from "../../auth";
import { baseURI } from "../../config";
import * as layoutActions from "../layout-actions";
import { download } from "../../helperFunctions";
export const updateVoucherReport = () => {
  return async (dispatch, getState) => {
    try {
      const voucher = getState().voucherReportPage_reducer.voucher;
      dispatch({
        type: "voucherReportPage-voucherData",
        data: [],
      });
      dispatch({
        type: "voucherReportPage-tableSorting",
        data: {
          column: null,
          direction: null,
        },
      });
      dispatch(isLoading(true));
      const voucherReport = await fetchVoucherReport({
        voucher,
      });
      dispatch({
        type: "voucherReportPage-voucherData",
        data: voucherReport,
      });
      dispatch(voucherSortBy("SellingPrice"));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isLoading(false));
    }
  };
};

export const fetchVoucherReport = ({ voucher }) => {
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
        `${baseURI}/api/Report/Voucher?voucher=${voucher}`,
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
      type: "voucherReportPage-isLoading",
      data: isLoading,
    });
  };
};
export const isExportBtnLoading = (isExportBtnLoading) => {
  return (dispatch) => {
    dispatch({
      type: "voucherReportPage-isExportBtnLoading",
      data: isExportBtnLoading,
    });
  };
};
export const dateFilter = (changedFields) => {
  return (dispatch) => {
    dispatch({
      type: "voucherReportPage-dateFilter",
      data: changedFields,
    });
  };
};
export const changeVoucher = (voucher) => {
  return (dispatch) => {
    dispatch({
      type: "voucherReportPage-voucher",
      data: voucher,
    });
  };
};

export const fetchExportVoucherReport = ({ type, voucher }) => {
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
        `${baseURI}/Export/VoucherReport?type=${type}&voucher=${voucher}`,
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

export const exportVoucherReport = (type) => {
  return async (dispatch, getState) => {
    try {
      const voucher = getState().voucherReportPage_reducer.voucher;
      dispatch(isExportBtnLoading(true));
      const voucherReportExportData = await fetchExportVoucherReport({
        type,
        voucher,
      });
      dispatch(isExportBtnLoading(false));
      download(
        "voucher_report",
        voucherReportExportData,
        type === 1 ? "csv" : "excel"
      );
    } catch (error) {
      dispatch(layoutActions.handleHttpError(error));
      dispatch(isExportBtnLoading(false));
    }
  };
};

export const voucherSortBy = (column) => {
  return (dispatch, getState) => {
    let voucherData = getState().voucherReportPage_reducer.voucherData.slice();
    if (column === getState().voucherReportPage_reducer.tableSorting.column) {
      dispatch({
        type: "voucherReportPage-tableSorting",
        data: {
          column,
          direction:
            getState().voucherReportPage_reducer.tableSorting.direction ===
            "ascending"
              ? "descending"
              : "ascending",
        },
      });
      dispatch({
        type: "voucherReportPage-voucherData",
        data: voucherData.reverse(),
      });
      return;
    }
    switch (column) {
      case "InvoiceId":
        voucherData = voucherData.sort((a, b) => {
          a = a.InvoiceId;
          b = b.InvoiceId;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "CreatedDate":
        voucherData = voucherData.sort((a, b) => {
          a = a.CreatedDate;
          b = b.CreatedDate;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "BrandName":
        voucherData = voucherData.sort((a, b) => {
          a = a.BrandName;
          b = b.BrandName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "DenominationName":
        voucherData = voucherData.sort((a, b) => {
          a = a.DenominationName;
          b = b.DenominationName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "SerialNumber":
        voucherData = voucherData.sort((a, b) => {
          a = a.SerialNumber;
          b = b.SerialNumber;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "SecretNumber":
        voucherData = voucherData.sort((a, b) => {
          a = a.SecretNumber;
          b = b.SecretNumber;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "MetaData":
        voucherData = voucherData.sort((a, b) => {
          a = a.MetaData;
          b = b.MetaData;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "SellingPrice":
        voucherData = voucherData.sort((a, b) => {
          a = a.SellingPrice;
          b = b.SellingPrice;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "SellCurrency":
        voucherData = voucherData.sort((a, b) => {
          a = a.SellCurrency;
          b = b.SellCurrency;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "ExpirationDate":
        voucherData = voucherData.sort((a, b) => {
          a = a.ExpirationDate;
          b = b.ExpirationDate;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "Batch":
        voucherData = voucherData.sort((a, b) => {
          a = a.Batch;
          b = b.Batch;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "ProviderName":
        voucherData = voucherData.sort((a, b) => {
          a = a.ProviderName;
          b = b.ProviderName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "BuyerName":
        voucherData = voucherData.sort((a, b) => {
          a = a.BuyerName;
          b = b.BuyerName;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      case "BuyerId":
        voucherData = voucherData.sort((a, b) => {
          a = a.BuyerId;
          b = b.BuyerId;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        break;
      default:
    }
    dispatch({
      type: "voucherReportPage-tableSorting",
      data: { column, direction: "ascending" },
    });
    dispatch({
      type: "voucherReportPage-voucherData",
      data: voucherData,
    });
  };
};
