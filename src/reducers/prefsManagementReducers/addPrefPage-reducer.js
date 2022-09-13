let defaultState = {
  isLoading: false,
  prefs: [],
  filteredPrefs: [],
  search: "",
  tableSorting: {
    column: null,
    direction: null,
  },
};

const addPrefPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "addPrefPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "addPrefPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "addPrefPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "addPrefPage-prefs":
      return {
        ...state,
        prefs: action.data,
      };
    case "addPrefPage-filteredPrefs":
      return {
        ...state,
        filteredPrefs: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default addPrefPage_reducer;
