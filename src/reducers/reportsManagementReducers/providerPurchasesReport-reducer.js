const defaultState = {
  providerPurchases: [],
  dateFilter: {
    to: "",
    from: "",
  },
  isLoading: false,
  isExportBtnLoading: false,
  tableSorting: {
    column: null,
    direction: null,
  },
};

const providerPurchasesReportPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "providerPurchasesReportPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "providerPurchasesReportPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "providerPurchasesReportPage-isExportBtnLoading":
      return {
        ...state,
        isExportBtnLoading: action.data,
      };
    case "providerPurchasesReportPage-providerPurchases":
      return {
        ...state,
        providerPurchases: action.data,
      };
    case "providerPurchasesReportPage-dateFilter":
      return {
        ...state,
        dateFilter: { ...state.dateFilter, ...action.data },
      };
    default:
      return {
        ...state,
      };
  }
};

export default providerPurchasesReportPage_reducer;
