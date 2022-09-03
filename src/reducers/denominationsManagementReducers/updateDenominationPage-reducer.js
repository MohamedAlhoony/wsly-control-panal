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

const updateDenominationPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "updateDenominationPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "updateDenominationPage-regions":
      return {
        ...state,
        regions: action.data,
      };
    case "updateDenominationPage-cardName-value":
    case "updateDenominationPage-cardNameEn-value":
    case "updateDenominationPage-shortName-value":
    case "updateDenominationPage-shortNameEn-value":
    case "updateDenominationPage-minimumQuantityLimit-value":
    case "updateDenominationPage-maximumQuantityLimit-value":
    case "updateDenominationPage-supplyLimit-value":
    case "updateDenominationPage-region-value":
    case "updateDenominationPage-isAvailable-value":
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
    case "updateDenominationPage-cardName-errorMsg":
    case "updateDenominationPage-cardNameEn-errorMsg":
    case "updateDenominationPage-shortName-errorMsg":
    case "updateDenominationPage-shortNameEn-errorMsg":
    case "updateDenominationPage-minimumQuantityLimit-errorMsg":
    case "updateDenominationPage-maximumQuantityLimit-errorMsg":
    case "updateDenominationPage-supplyLimit-errorMsg":
    case "updateDenominationPage-region-errorMsg":
    case "updateDenominationPage-isAvailable-errorMsg":
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

export default updateDenominationPage_reducer;
