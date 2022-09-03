const defaultState = {
  customerPurchasedCards: [],
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

const customerPurchasedCardsReportPage_reducer = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case "customerPurchasedCardsReportPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "customerPurchasedCardsReportPage-userID":
      return {
        ...state,
        userID: action.data,
      };
    case "customerPurchasedCardsReportPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "customerPurchasedCardsReportPage-isExportBtnLoading":
      return {
        ...state,
        isExportBtnLoading: action.data,
      };
    case "customerPurchasedCardsReportPage-customerPurchasedCards":
      return {
        ...state,
        customerPurchasedCards: action.data,
      };
    case "customerPurchasedCardsReportPage-dateFilter":
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

export default customerPurchasedCardsReportPage_reducer;
