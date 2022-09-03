let defaultState = {
  isLoading: false,
  isActive: false,
  roles: [],
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
    role: {
      element: "input",
      value: "",
      label: true,
      labelText: "الدور",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        // maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
    phoneNumber: {
      element: "input",
      value: "",
      label: true,
      labelText: "رقم الهاتف",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        dir: "ltr",
        // maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
    email: {
      element: "input",
      value: "",
      label: true,
      labelText: "البريد الإلكتروني",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        dir: "ltr",
        // maxLength: 12,
        // placeholder: 'الاسم',
      },
    },
  },
};

const updateManagerPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "updateManagerPage-isActive":
      return {
        ...state,
        isActive: action.data,
      };
    case "updateManagerPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "updateManagerPage-roles":
      return {
        ...state,
        roles: action.data,
      };
    case "updateManagerPage-name-value":
    case "updateManagerPage-phoneNumber-value":
    case "updateManagerPage-email-value":
    case "updateManagerPage-role-value":
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
    case "updateManagerPage-name-errorMsg":
    case "updateManagerPage-phoneNumber-errorMsg":
    case "updateManagerPage-email-errorMsg":
    case "updateManagerPage-role-errorMsg":
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

export default updateManagerPage_reducer;
