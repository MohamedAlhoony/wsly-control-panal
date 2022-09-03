let defaultState = {
  isLoading: false,
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
    username: {
      element: "input",
      value: "",
      label: true,
      labelText: "اسم المستخدم",
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
    password: {
      element: "input",
      value: "",
      label: true,
      labelText: "كلمة السر",
      errorMsg: "",
      config: {
        autoComplete: "off",
        required: true,
        // type: 'password',
        // readOnly: true,
        dir: "ltr",
        name: "password",
        // maxLength: 12,
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
        dir: "ltr",
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

const registerManagerPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "registerManagerPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "registerManagerPage-roles":
      return {
        ...state,
        roles: action.data,
      };
    case "registerManagerPage-name-value":
    case "registerManagerPage-username-value":
    case "registerManagerPage-password-value":
    case "registerManagerPage-phoneNumber-value":
    case "registerManagerPage-email-value":
    case "registerManagerPage-role-value":
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
    case "registerManagerPage-name-errorMsg":
    case "registerManagerPage-username-errorMsg":
    case "registerManagerPage-password-errorMsg":
    case "registerManagerPage-phoneNumber-errorMsg":
    case "registerManagerPage-email-errorMsg":
    case "registerManagerPage-role-errorMsg":
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

export default registerManagerPage_reducer;
