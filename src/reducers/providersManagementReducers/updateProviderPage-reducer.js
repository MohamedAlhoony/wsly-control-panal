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

const updateProviderPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "updateProviderPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "updateProviderPage-customFields":
      return {
        ...state,
        customFields: action.data,
      };
    case "updateProviderPage-name-value":
    case "updateProviderPage-balanceNotificationThreshold-value":
    case "updateProviderPage-thresholdViolationTrigger-value":
    case "updateProviderPage-isActive-value":
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
    case "updateProviderPage-name-errorMsg":
    case "updateProviderPage-balanceNotificationThreshold-errorMsg":
    case "updateProviderPage-thresholdViolationTrigger-errorMsg":
    case "updateProviderPage-isActive-errorMsg":
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

export default updateProviderPage_reducer;
