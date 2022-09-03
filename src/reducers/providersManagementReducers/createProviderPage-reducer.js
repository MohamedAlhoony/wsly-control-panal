let defaultState = {
  isLoading: false,
  customFields: [],
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
        maxLength: 50,
        // placeholder: 'الاسم',
      },
    },
    balanceNotificationThreshold: {
      element: "input",
      value: "",
      label: true,
      labelText: "إشعار فرق سعر الشراء الفعلي",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "number",
        min: 0,
        required: true,
        dir: "ltr",
        // placeholder: 'الاسم',
      },
    },
    thresholdViolationTrigger: {
      element: "input",
      value: "",
      label: true,
      labelText: "إشعار عند وصول رصيد المزود اقل من",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "number",
        dir: "ltr",
        required: true,
        min: 0,
        // placeholder: 'الاسم',
      },
    },
    isActive: {
      element: "input",
      value: true,
      label: true,
      labelText: "الحالة",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        dir: "ltr",
        // placeholder: 'الاسم',
      },
    },
  },
};

const createProviderPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "createProviderPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "createProviderPage-customFields":
      return {
        ...state,
        customFields: action.data,
      };
    case "createProviderPage-name-value":
    case "createProviderPage-balanceNotificationThreshold-value":
    case "createProviderPage-thresholdViolationTrigger-value":
    case "createProviderPage-isActive-value":
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
    case "createProviderPage-name-errorMsg":
    case "createProviderPage-balanceNotificationThreshold-errorMsg":
    case "createProviderPage-thresholdViolationTrigger-errorMsg":
    case "createProviderPage-isActive-errorMsg":
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

export default createProviderPage_reducer;
