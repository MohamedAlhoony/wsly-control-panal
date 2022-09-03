const defaultState = {
  providerTopups: [],
  providers: [],
  dateFilter: {
    to: "",
    from: "",
  },
  providerID: "",
  isLoading: false,
  isExportBtnLoading: false,
  tableSorting: {
    column: null,
    direction: null,
  },
};

const providerTopupsReportPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "providerTopupsReportPage-providers":
      return {
        ...state,
        providers: action.data,
      };
    case "providerTopupsReportPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "providerTopupsReportPage-providerID":
      return {
        ...state,
        providerID: action.data,
      };
    case "providerTopupsReportPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "providerTopupsReportPage-isExportBtnLoading":
      return {
        ...state,
        isExportBtnLoading: action.data,
      };
    case "providerTopupsReportPage-providerTopups":
      return {
        ...state,
        providerTopups: action.data,
      };
    case "providerTopupsReportPage-dateFilter":
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

export default providerTopupsReportPage_reducer;
