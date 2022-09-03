const defaultState = {
  quantityData: [],
  isLoading: false,
  isExportBtnLoading: false,
  tableSorting: {
    column: null,
    direction: null,
  },
};

const quantityReportPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "quantityReportPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "quantityReportPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "quantityReportPage-isExportBtnLoading":
      return {
        ...state,
        isExportBtnLoading: action.data,
      };
    case "quantityReportPage-quantityData":
      return {
        ...state,
        quantityData: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default quantityReportPage_reducer;
