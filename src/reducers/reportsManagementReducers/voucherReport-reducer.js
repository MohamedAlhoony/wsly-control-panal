const defaultState = {
  voucherData: [],
  voucher: "",
  isLoading: false,
  isExportBtnLoading: false,
  tableSorting: {
    column: null,
    direction: null,
  },
};

const voucherReportPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "voucherReportPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "voucherReportPage-voucher":
      return {
        ...state,
        voucher: action.data,
      };
    case "voucherReportPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "voucherReportPage-isExportBtnLoading":
      return {
        ...state,
        isExportBtnLoading: action.data,
      };
    case "voucherReportPage-voucherData":
      return {
        ...state,
        voucherData: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default voucherReportPage_reducer;
