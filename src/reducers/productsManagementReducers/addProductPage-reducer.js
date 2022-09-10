let defaultState = {
  isLoading: false,
  formData: {
    name: {
      element: "input",
      value: "",
      label: true,
      labelText: "الإسم",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        maxLength: 49,
        // placeholder: 'الاسم',
      },
    },
    price: {
      element: "input",
      value: "",
      label: true,
      labelText: "السعر",
      errorMsg: "",
      config: {
        autoComplete: "off",
        required: true,
        type: "number",
        // readOnly: true,
        dir: "ltr",
        name: "password",
        // maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
    description: {
      element: "input",
      value: "",
      label: true,
      labelText: "الوصف",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        // required: true,
        dir: "ltr",
        maxLength: 49,
        // placeholder: 'الاسم',
      },
    },
  },
};

const addProductPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "addProductPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "addProductPage-roles":
      return {
        ...state,
        roles: action.data,
      };
    case "addProductPage-name-value":
    case "addProductPage-description-value":
    case "addProductPage-price-value":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.data.id]: {
            ...state.formData[action.data.id],
            value: action.data.value,
          },
        },
      };
    case "addProductPage-name-errorMsg":
    case "addProductPage-description-errorMsg":
    case "addProductPage-price-errorMsg":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.data.id]: {
            ...state.formData[action.data.id],
            errorMsg: action.data.value,
          },
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default addProductPage_reducer;
