const defaultState = {
  providerStorageData: [],
  isLoading: false,
  isExportBtnLoading: false,
  tableSorting: {
    column: null,
    direction: null,
  },
};

const providerStorageReportPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "providerStorageReportPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "providerStorageReportPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "providerStorageReportPage-isExportBtnLoading":
      return {
        ...state,
        isExportBtnLoading: action.data,
      };
    case "providerStorageReportPage-providerStorageData":
      return {
        ...state,
        providerStorageData: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default providerStorageReportPage_reducer;
