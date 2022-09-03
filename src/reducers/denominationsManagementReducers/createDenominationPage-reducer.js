let defaultState = {
  isLoading: false,
  regions: [],
  formData: {
    cardName: {
      element: "input",
      value: "",
      label: true,
      labelText: "الإسم باللغة العربية",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        maxLength: 49,
        // placeholder: 'الاسم',
      },
    },
    cardNameEn: {
      element: "input",
      value: "",
      label: true,
      labelText: "الإسم باللغة الإنجليزية",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        dir: "ltr",
        maxLength: 49,
        // placeholder: 'الاسم',
      },
    },
    shortName: {
      element: "input",
      value: "",
      label: true,
      labelText: "اسم مصغر عربي",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        required: true,
        maxLength: 15,
        // placeholder: 'الاسم',
      },
    },
    shortNameEn: {
      element: "input",
      value: "",
      label: true,
      labelText: "اسم مصغر إنجليزي",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "text",
        dir: "ltr",
        required: true,
        maxLength: 15,
        // placeholder: 'الاسم',
      },
    },
    minimumQuantityLimit: {
      element: "input",
      value: "",
      label: true,
      labelText: "الحد الأدنى للكمية",
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
    maximumQuantityLimit: {
      element: "input",
      value: "",
      label: true,
      labelText: "الحد الأعلى للكمية",
      errorMsg: "",
      config: {
        autoComplete: "off",
        type: "number",
        required: true,
        min: 0,
        dir: "ltr",
        // placeholder: 'الاسم',
      },
    },
    supplyLimit: {
      element: "input",
      value: "",
      label: true,
      labelText: "حد وجوب التوريد",
      errorMsg: "",
      config: {
        type: "number",
        autoComplete: "off",
        required: true,
        min: 0,
        dir: "ltr",
        // placeholder: "https://example.com/",
      },
    },
    region: {
      element: "input",
      value: true,
      label: true,
      labelText: "المنطقة",
      errorMsg: "",
      config: {
        autoComplete: "off",
        // placeholder: 'الاسم',
      },
    },
    isAvailable: {
      element: "input",
      value: true,
      label: true,
      labelText: "هل ظاهر للمستخدمين؟",
      errorMsg: "",
      config: {
        autoComplete: "off",
        // placeholder: 'الاسم',
      },
    },
  },
};

const createDenominationPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "createDenominationPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "createDenominationPage-regions":
      return {
        ...state,
        regions: action.data,
      };
    case "createDenominationPage-cardName-value":
    case "createDenominationPage-cardNameEn-value":
    case "createDenominationPage-shortName-value":
    case "createDenominationPage-shortNameEn-value":
    case "createDenominationPage-minimumQuantityLimit-value":
    case "createDenominationPage-maximumQuantityLimit-value":
    case "createDenominationPage-supplyLimit-value":
    case "createDenominationPage-region-value":
    case "createDenominationPage-isAvailable-value":
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
    case "createDenominationPage-cardName-errorMsg":
    case "createDenominationPage-cardNameEn-errorMsg":
    case "createDenominationPage-shortName-errorMsg":
    case "createDenominationPage-shortNameEn-errorMsg":
    case "createDenominationPage-minimumQuantityLimit-errorMsg":
    case "createDenominationPage-maximumQuantityLimit-errorMsg":
    case "createDenominationPage-supplyLimit-errorMsg":
    case "createDenominationPage-region-errorMsg":
    case "createDenominationPage-isAvailable-errorMsg":
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

export default createDenominationPage_reducer;
