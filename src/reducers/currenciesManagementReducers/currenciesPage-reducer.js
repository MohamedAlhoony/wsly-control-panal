let defaultState = {
    isLoading: false,
    isLoadingMore: false,
    isLoadingCurrencies: false,
    showLoadingMoreBtn: true,
    search: '',
    nextTo: 0,
    order: true,
    numOfResults: 10,
    currencies: [],
    currencyExchangeValueModal: {
        show: false,
        currency: null,
        isLoading: false,
        currentCurrencyExchangeValue: null,
        exchangeValueFormInput: {
            value: '',
            errorMsg: '',
        },
    },
}

const currenciesPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'currenciesPage-currencies':
            return {
                ...state,
                currencies: action.data,
            }
        case 'currenciesPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'currenciesPage-isLoadingMore':
            return {
                ...state,
                isLoadingMore: action.data,
            }
        case 'currenciesPage-showLoadingMoreBtn':
            return {
                ...state,
                showLoadingMoreBtn: action.data,
            }
        case 'currenciesPage-isLoadingCurrencies':
            return {
                ...state,
                isLoadingCurrencies: action.data,
            }
        case 'currenciesPage-search':
            return {
                ...state,
                search: action.data,
            }
        case 'currenciesPage-nextTo':
            return {
                ...state,
                nextTo: action.data,
            }
        case 'currenciesPage-order':
            return {
                ...state,
                order: action.data,
            }
        case 'currenciesPage-numOfResults':
            return {
                ...state,
                numOfResults: action.data,
            }

        case 'currenciesPage-currencyExchangeValueModal':
            return {
                ...state,
                currencyExchangeValueModal: action.data,
            }
        case 'currenciesPage-currencyExchangeValueModal-exchangeValueFormInput-value':
            return {
                ...state,
                currencyExchangeValueModal: {
                    ...state.currencyExchangeValueModal,
                    exchangeValueFormInput: {
                        value: action.data,
                    },
                },
            }
        case 'currenciesPage-currencyExchangeValueModal-exchangeValueFormInput-errorMsg':
            return {
                ...state,
                currencyExchangeValueModal: {
                    ...state.currencyExchangeValueModal,
                    exchangeValueFormInput: {
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

export default currenciesPage_reducer
