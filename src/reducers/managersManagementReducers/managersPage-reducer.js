let defaultState = {
  isLoading: false,
  isLoadingMore: false,
  isLoadingManagers: false,
  showLoadingMoreBtn: true,
  search: "",
  nextTo: 0,
  order: true,
  numOfResults: 10,
  managers: [],
};

const managersPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "managersPage-managers":
      return {
        ...state,
        managers: action.data,
      };
    case "managersPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "managersPage-isLoadingMore":
      return {
        ...state,
        isLoadingMore: action.data,
      };
    case "managersPage-showLoadingMoreBtn":
      return {
        ...state,
        showLoadingMoreBtn: action.data,
      };
    case "managersPage-isLoadingManagers":
      return {
        ...state,
        isLoadingManagers: action.data,
      };
    case "managersPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "managersPage-nextTo":
      return {
        ...state,
        nextTo: action.data,
      };
    case "managersPage-order":
      return {
        ...state,
        order: action.data,
      };
    case "managersPage-numOfResults":
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

export default managersPage_reducer;
