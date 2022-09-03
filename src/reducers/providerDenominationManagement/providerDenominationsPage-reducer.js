let defaultState = {
  isLoading: false,
  denominations: [],
  filteredDenominations: [],
  search: "",
  providerDetails: null,
  tableSorting: {
    column: null,
    direction: null,
  },
};

const providerDenominationsPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "providerDenominationsPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "providerDenominationsPage-providerDetails":
      return {
        ...state,
        providerDetails: action.data,
      };
    case "providerDenominationsPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "providerDenominationsPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "providerDenominationsPage-denominations":
      return {
        ...state,
        denominations: action.data,
      };
    case "providerDenominationsPage-filteredDenominations":
      return {
        ...state,
        filteredDenominations: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default providerDenominationsPage_reducer;
