let defaultState = {
    isLoading: false,
    isLoadingMore: false,
    isLoadingDenominations: false,
    showLoadingMoreBtn: true,
    search: '',
    nextTo: 0,
    order: true,
    numOfResults: 10,
    subscriptionDetails: null,
    denominations: [],
}

const subscriptionDenominationsPage_reducer = (
    state = defaultState,
    action
) => {
    switch (action.type) {
        case 'subscriptionDenominationsPage-subscriptionDetails':
            return {
                ...state,
                subscriptionDetails: action.data,
            }
        case 'subscriptionDenominationsPage-denominations':
            return {
                ...state,
                denominations: action.data,
            }
        case 'subscriptionDenominationsPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'subscriptionDenominationsPage-isLoadingMore':
            return {
                ...state,
                isLoadingMore: action.data,
            }
        case 'subscriptionDenominationsPage-showLoadingMoreBtn':
            return {
                ...state,
                showLoadingMoreBtn: action.data,
            }
        case 'subscriptionDenominationsPage-isLoadingDenominations':
            return {
                ...state,
                isLoadingDenominations: action.data,
            }
        case 'subscriptionDenominationsPage-search':
            return {
                ...state,
                search: action.data,
            }
        case 'subscriptionDenominationsPage-nextTo':
            return {
                ...state,
                nextTo: action.data,
            }
        case 'subscriptionDenominationsPage-order':
            return {
                ...state,
                order: action.data,
            }
        case 'subscriptionDenominationsPage-numOfResults':
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

export default subscriptionDenominationsPage_reducer
