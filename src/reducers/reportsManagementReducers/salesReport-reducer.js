const defaultState = {
  sales: [],
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

const salesReportPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "salesReportPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "salesReportPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "salesReportPage-isExportBtnLoading":
      return {
        ...state,
        isExportBtnLoading: action.data,
      };
    case "salesReportPage-sales":
      return {
        ...state,
        sales: action.data,
      };
    case "salesReportPage-dateFilter":
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

export default salesReportPage_reducer;
