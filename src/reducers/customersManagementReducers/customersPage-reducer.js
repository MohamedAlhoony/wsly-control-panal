let defaultState = {
    isLoading: false,
    isLoadingMore: false,
    isLoadingCustomers: false,
    showLoadingMoreBtn: true,
    search: '',
    nextTo: 0,
    order: true,
    numOfResults: 10,
    customers: [],
}

const customersPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'customersPage-customers':
            return {
                ...state,
                customers: action.data,
            }
        case 'customersPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'customersPage-isLoadingMore':
            return {
                ...state,
                isLoadingMore: action.data,
            }
        case 'customersPage-showLoadingMoreBtn':
            return {
                ...state,
                showLoadingMoreBtn: action.data,
            }
        case 'customersPage-isLoadingCustomers':
            return {
                ...state,
                isLoadingCustomers: action.data,
            }
        case 'customersPage-search':
            return {
                ...state,
                search: action.data,
            }
        case 'customersPage-nextTo':
            return {
                ...state,
                nextTo: action.data,
            }
        case 'customersPage-order':
            return {
                ...state,
                order: action.data,
            }
        case 'customersPage-numOfResults':
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

export default customersPage_reducer
