let defaultState = {
    isLoading: false,
    isLoadingMore: false,
    isLoadingSubscriptions: false,
    showLoadingMoreBtn: true,
    search: '',
    nextTo: 0,
    order: true,
    numOfResults: 10,
    subscriptions: [],
    subscriptionUpdatePricesModal: {
        show: false,
        body: '',
        subscription: null,
        isLoading: false,
        rateValueFormInput: {
            value: '',
            errorMsg: '',
        },
        opType: 1,
    },
}

const subscriptionsPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'subscriptionsPage-subscriptions':
            return {
                ...state,
                subscriptions: action.data,
            }
        case 'subscriptionsPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'subscriptionsPage-isLoadingMore':
            return {
                ...state,
                isLoadingMore: action.data,
            }
        case 'subscriptionsPage-showLoadingMoreBtn':
            return {
                ...state,
                showLoadingMoreBtn: action.data,
            }
        case 'subscriptionsPage-isLoadingSubscriptions':
            return {
                ...state,
                isLoadingSubscriptions: action.data,
            }
        case 'subscriptionsPage-search':
            return {
                ...state,
                search: action.data,
            }
        case 'subscriptionsPage-nextTo':
            return {
                ...state,
                nextTo: action.data,
            }
        case 'subscriptionsPage-order':
            return {
                ...state,
                order: action.data,
            }
        case 'subscriptionsPage-numOfResults':
            return {
                ...state,
                numOfResults: action.data,
            }

        case 'subscriptionsPage-subscriptionUpdatePricesModal':
            return {
                ...state,
                subscriptionUpdatePricesModal: action.data,
            }
        case 'subscriptionsPage-subscriptionUpdatePricesModal-rateValueFormInput-value':
            return {
                ...state,
                subscriptionUpdatePricesModal: {
                    ...state.subscriptionUpdatePricesModal,
                    rateValueFormInput: {
                        value: action.data,
                    },
                },
            }
        case 'subscriptionsPage-subscriptionUpdatePricesModal-rateValueFormInput-errorMsg':
            return {
                ...state,
                subscriptionUpdatePricesModal: {
                    ...state.subscriptionUpdatePricesModal,
                    rateValueFormInput: {
                        errorMsg: action.data,
                    },
                },
            }
        default:
            return {
                ...state,
            }
    }
}

export default subscriptionsPage_reducer
