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

const addCurrencyPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'addCurrencyPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'addCurrencyPage-name-value':
        case 'addCurrencyPage-nameEn-value':
        case 'addCurrencyPage-symbol-value':
        case 'addCurrencyPage-code-value':
        case 'addCurrencyPage-codeEn-value':
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
        case 'addCurrencyPage-name-errorMsg':
        case 'addCurrencyPage-nameEn-errorMsg':
        case 'addCurrencyPage-symbol-errorMsg':
        case 'addCurrencyPage-code-errorMsg':
        case 'addCurrencyPage-codeEn-errorMsg':
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

export default addCurrencyPage_reducer
