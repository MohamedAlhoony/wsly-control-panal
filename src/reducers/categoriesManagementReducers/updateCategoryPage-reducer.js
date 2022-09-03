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
        rank: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'التصنيف',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'number',
                required: true,
                maxLength: 9,
                // placeholder: 'الاسم',
            },
        },
        isInternal: {
            element: 'input',
            value: true,
            label: true,
            labelText: 'هل يعرض للمدراء؟',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                // placeholder: 'الاسم',
            },
        },
        isPublic: {
            element: 'input',
            value: true,
            label: true,
            labelText: 'هل يعرض للزبائن؟',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                // placeholder: 'الاسم',
            },
        },
    },
}

const updateCategoryPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'updateCategoryPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'updateCategoryPage-name-value':
        case 'updateCategoryPage-nameEn-value':
        case 'updateCategoryPage-rank-value':
        case 'updateCategoryPage-isInternal-value':
        case 'updateCategoryPage-isPublic-value':
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
        case 'updateCategoryPage-name-errorMsg':
        case 'updateCategoryPage-nameEn-errorMsg':
        case 'updateCategoryPage-rank-errorMsg':
        case 'updateCategoryPage-isInternal-errorMsg':
        case 'updateCategoryPage-isPublic-errorMsg':
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

export default updateCategoryPage_reducer
