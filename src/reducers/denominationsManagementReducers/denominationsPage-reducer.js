let defaultState = {
  isLoading: false,
  isLoadingMore: false,
  isLoadingDenominations: false,
  showLoadingMoreBtn: true,
  search: "",
  nextTo: 0,
  order: true,
  numOfResults: 10,
  denominations: [],
  brandDetails: null,
};

const denominationsPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "denominationsPage-denominations":
      return {
        ...state,
        denominations: action.data,
      };
    case "denominationsPage-brandDetails":
      return {
        ...state,
        brandDetails: action.data,
      };
    case "denominationsPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "denominationsPage-isLoadingMore":
      return {
        ...state,
        isLoadingMore: action.data,
      };
    case "denominationsPage-showLoadingMoreBtn":
      return {
        ...state,
        showLoadingMoreBtn: action.data,
      };
    case "denominationsPage-isLoadingDenominations":
      return {
        ...state,
        isLoadingDenominations: action.data,
      };
    case "denominationsPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "denominationsPage-nextTo":
      return {
        ...state,
        nextTo: action.data,
      };
    case "denominationsPage-order":
      return {
        ...state,
        order: action.data,
      };
    case "denominationsPage-numOfResults":
      return {
        ...state,
        numOfResults: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default denominationsPage_reducer;
