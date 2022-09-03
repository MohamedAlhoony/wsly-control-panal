let defaultState = {
    isLoading: false,
    isActive: false,
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
        // username: {
        //     element: 'input',
        //     value: '',
        //     label: true,
        //     labelText: 'اسم المستخدم',
        //     errorMsg: '',
        //     config: {
        //         autoComplete: 'off',
        //         type: 'text',
        //         // maxLength: 12,
        //         // placeholder: 'الاسم',
        //     },
        // },
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
        // walletNumber: {
        //     element: 'input',
        //     value: '',
        //     label: true,
        //     labelText: 'رقم المحفظة',
        //     errorMsg: '',
        //     config: {
        //         autoComplete: 'off',
        //         type: 'text',
        //         // maxLength: 12,
        //         // placeholder: 'الاسم',
        //     },
        // },
    },
}

const updateCustomerPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'updateCustomerPage-isActive':
            return {
                ...state,
                isActive: action.data,
            }
        case 'updateCustomerPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'updateCustomerPage-subscriptions':
            return {
                ...state,
                subscriptions: action.data,
            }
        case 'updateCustomerPage-name-value':
        case 'updateCustomerPage-phoneNumber-value':
        case 'updateCustomerPage-email-value':
        case 'updateCustomerPage-subscription-value':
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
        case 'updateCustomerPage-name-errorMsg':
        case 'updateCustomerPage-phoneNumber-errorMsg':
        case 'updateCustomerPage-email-errorMsg':
        case 'updateCustomerPage-subscription-errorMsg':
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

export default updateCustomerPage_reducer
