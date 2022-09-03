let defaultState = {
    isLoading: false,
    subscriptions: [],
    formData: {
        name: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'الإسم',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                maxLength: 49,
                // placeholder: 'الاسم',
            },
        },
        username: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'اسم المستخدم',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                dir: 'ltr',
                maxLength: 49,
                // placeholder: 'الاسم',
            },
        },
        password: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'كلمة السر',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                required: true,
                // type: 'password',
                // readOnly: true,
                dir: 'ltr',
                name: 'password',
                // maxLength: 12,
                // placeholder: 'الاسم',
            },
        },
        subscription: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'الإشتراك',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                dir: 'ltr',
                // maxLength: 12,
                // placeholder: 'الاسم',
            },
        },
        phoneNumber: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'رقم الهاتف',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                dir: 'ltr',
                // maxLength: 12,
                // placeholder: 'الاسم',
            },
        },
        email: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'البريد الإلكتروني',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                dir: 'ltr',
                // maxLength: 12,
                // placeholder: 'الاسم',
            },
        },
        walletNumber: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'رقم المحفظة',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                dir: 'ltr',
                maxLength: 12,
                // placeholder: 'الاسم',
            },
        },
    },
}

const registerCustomerPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'registerCustomerPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'registerCustomerPage-subscriptions':
            return {
                ...state,
                subscriptions: action.data,
            }
        case 'registerCustomerPage-name-value':
        case 'registerCustomerPage-username-value':
        case 'registerCustomerPage-password-value':
        case 'registerCustomerPage-phoneNumber-value':
        case 'registerCustomerPage-email-value':
        case 'registerCustomerPage-subscription-value':
        case 'registerCustomerPage-walletNumber-value':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.data.id]: {
                        ...state.formData[action.data.id],
                        value: action.data.value,
                    },
                },
            }
        case 'registerCustomerPage-name-errorMsg':
        case 'registerCustomerPage-username-errorMsg':
        case 'registerCustomerPage-password-errorMsg':
        case 'registerCustomerPage-phoneNumber-errorMsg':
        case 'registerCustomerPage-email-errorMsg':
        case 'registerCustomerPage-subscription-errorMsg':
        case 'registerCustomerPage-walletNumber-errorMsg':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.data.id]: {
                        ...state.formData[action.data.id],
                        errorMsg: action.data.value,
                    },
                },
            }
        default:
            return {
                ...state,
            }
    }
}

export default registerCustomerPage_reducer
