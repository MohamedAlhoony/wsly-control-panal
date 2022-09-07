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

const prefsPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "prefsPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "prefsPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "prefsPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "prefsPage-prefs":
      return {
        ...state,
        prefs: action.data,
      };
    case "prefsPage-filteredPrefs":
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

export default prefsPage_reducer;
