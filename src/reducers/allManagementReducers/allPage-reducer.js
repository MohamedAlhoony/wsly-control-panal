let defaultState = {
  isLoading: true,
  selectedItemPrefs: [],
  isChanged: false,
  selectedItemPrefsOriginal: [],
  selectedItem: null,
  categories: [],
  allCategories: [],
  activeCategoryTab: 0,
  filteredCategories: [],
  search: "",
  tableSorting: {
    column: null,
    direction: null,
  },
};

const allPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "allPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "allPage-activeCategoryTab":
      return {
        ...state,
        activeCategoryTab: action.data,
      };
    case "allPage-selectedItemPrefs":
      return {
        ...state,
        selectedItemPrefs: action.data,
      };
    case "allPage-isChanged":
      return {
        ...state,
        isChanged: action.data,
      };
    case "allPage-selectedItem":
      return {
        ...state,
        selectedItem: action.data,
      };
    case "allPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "allPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "allPage-categories":
      return {
        ...state,
        categories: action.data,
      };
    case "allPage-allCategories":
      return {
        ...state,
        allCategories: action.data,
      };
    case "allPage-filteredCategories":
      return {
        ...state,
        filteredCategories: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default allPage_reducer;
