let defaultState = {
  isLoading: false,
  isLoadingMore: false,
  isLoadingProviders: false,
  showLoadingMoreBtn: true,
  search: "",
  nextTo: 0,
  order: true,
  numOfResults: 10,
  providers: [],
};

const providersPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "providersPage-providers":
      return {
        ...state,
        providers: action.data,
      };
    case "providersPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "providersPage-isLoadingMore":
      return {
        ...state,
        isLoadingMore: action.data,
      };
    case "providersPage-showLoadingMoreBtn":
      return {
        ...state,
        showLoadingMoreBtn: action.data,
      };
    case "providersPage-isLoadingProviders":
      return {
        ...state,
        isLoadingProviders: action.data,
      };
    case "providersPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "providersPage-nextTo":
      return {
        ...state,
        nextTo: action.data,
      };
    case "providersPage-order":
      return {
        ...state,
        order: action.data,
      };
    case "providersPage-numOfResults":
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

export default providersPage_reducer;
