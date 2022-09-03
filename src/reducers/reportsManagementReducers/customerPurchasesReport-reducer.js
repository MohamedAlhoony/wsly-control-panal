const defaultState = {
  customerPurchases: [],
  dateFilter: {
    to: "",
    from: "",
  },
  userID: "",
  isLoading: false,
  isExportBtnLoading: false,
  tableSorting: {
    column: null,
    direction: null,
  },
};

const customerPurchasesReportPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "customerPurchasesReportPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "customerPurchasesReportPage-userID":
      return {
        ...state,
        userID: action.data,
      };
    case "customerPurchasesReportPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "customerPurchasesReportPage-isExportBtnLoading":
      return {
        ...state,
        isExportBtnLoading: action.data,
      };
    case "customerPurchasesReportPage-customerPurchases":
      return {
        ...state,
        customerPurchases: action.data,
      };
    case "customerPurchasesReportPage-dateFilter":
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

export default customerPurchasesReportPage_reducer;
