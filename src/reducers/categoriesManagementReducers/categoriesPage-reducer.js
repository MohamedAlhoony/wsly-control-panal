let defaultState = {
    isLoading: false,
    isLoadingMore: false,
    isLoadingCategories: false,
    showLoadingMoreBtn: true,
    search: '',
    nextTo: 0,
    order: true,
    numOfResults: 10,
    categories: [],
}

const categoriesPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'categoriesPage-categories':
            return {
                ...state,
                categories: action.data,
            }
        case 'categoriesPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'categoriesPage-isLoadingMore':
            return {
                ...state,
                isLoadingMore: action.data,
            }
        case 'categoriesPage-showLoadingMoreBtn':
            return {
                ...state,
                showLoadingMoreBtn: action.data,
            }
        case 'categoriesPage-isLoadingCategories':
            return {
                ...state,
                isLoadingCategories: action.data,
            }
        case 'categoriesPage-search':
            return {
                ...state,
                search: action.data,
            }
        case 'categoriesPage-nextTo':
            return {
                ...state,
                nextTo: action.data,
            }
        case 'categoriesPage-order':
            return {
                ...state,
                order: action.data,
            }
        case 'categoriesPage-numOfResults':
            return {
                ...state,
                numOfResults: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default categoriesPage_reducer
