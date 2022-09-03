let defaultState = {
    isLoading: false,
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
        nameEn: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'الإسم باللغة الإنجليزية',
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
        code: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'الإختصار',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                maxLength: 9,
                // placeholder: 'الاسم',
            },
        },
        codeEn: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'الإختصار باللغة الإنجليزية',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                dir: 'ltr',
                maxLength: 9,
                // placeholder: 'الاسم',
            },
        },
        symbol: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'الرمز',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                required: true,
                dir: 'ltr',
                maxLength: 9,
                // placeholder: 'الاسم',
            },
        },
    },
}

const updateCurrencyPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'updateCurrencyPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'updateCurrencyPage-name-value':
        case 'updateCurrencyPage-nameEn-value':
        case 'updateCurrencyPage-symbol-value':
        case 'updateCurrencyPage-code-value':
        case 'updateCurrencyPage-codeEn-value':
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
        case 'updateCurrencyPage-name-errorMsg':
        case 'updateCurrencyPage-nameEn-errorMsg':
        case 'updateCurrencyPage-symbol-errorMsg':
        case 'updateCurrencyPage-code-errorMsg':
        case 'updateCurrencyPage-codeEn-errorMsg':
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

export default updateCurrencyPage_reducer
