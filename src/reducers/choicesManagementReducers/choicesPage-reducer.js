let defaultState = {
  isLoading: false,
  choices: [],
  filteredChoices: [],
  search: "",
  tableSorting: {
    column: null,
    direction: null,
  },
};

const choicesPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "choicesPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "choicesPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "choicesPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "choicesPage-choices":
      return {
        ...state,
        choices: action.data,
      };
    case "choicesPage-filteredChoices":
      return {
        ...state,
        filteredChoices: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default choicesPage_reducer;
