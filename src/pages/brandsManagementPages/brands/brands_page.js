import React, { useEffect } from 'react'
import * as actions from '../../../actions/brandsManagementActions/brandsPage-actions'
import { connect } from 'react-redux'
import { Segment, Button, Table, Loader } from 'semantic-ui-react'
import debounce from 'lodash.debounce'
import PageContainer from '../../../components/pageContainer/pageContainer'
import TopMenu from './topMenu/topMenu'
import BrandsTableItems from './brandsTableItems/brandsTableItems'
let wrappingFunction = null
const _debouncedFetching = debounce(() => {
    wrappingFunction()
}, 700)
const Brands_page = (props) => {
    useEffect(() => {
        let controller = new AbortController()
        let signal = controller.signal
        props.dispatch(actions.fetchInitialData(signal))
        return () => {
            props.dispatch({ type: 'reset-brandsPage_reducer' })
            controller.abort()
        }
    }, [])
    const handleTopMenuChange = (value, meta) => {
        props.dispatch({ type: `brandsPage-${meta.id}`, data: value })

        if (meta.id === 'search') {
            if (value.trim() !== props.search.trim()) {
                _debouncedFetching()
            }
        } else {
            wrappingFunction()
        }
    }

    wrappingFunction = () => {
        props.dispatch(actions.isLoadingBrands(true))
        props.dispatch({
            type: 'brandsPage-nextTo',
            data: 0,
        })
        if (!props.showLoadingMoreBtn) {
            props.dispatch(actions.showLoadingMoreBtn(true))
        }
        props
            .dispatch(actions.getBrands())
            .then(() => {
                props.dispatch(actions.isLoadingBrands(false))
            })
            .catch(() => {
                props.dispatch(actions.isLoadingBrands(false))
            })
    }

    return (
        <PageContainer loading={props.isLoading}>
            <TopMenu
                isLoadingBrands={props.isLoadingBrands}
                handleTopMenuChange={handleTopMenuChange}
                search={props.search}
                order={props.order}
            />
            {!props.isLoadingBrands ? (
                <Table striped celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>المعرف</Table.HeaderCell>
                            <Table.HeaderCell>
                                اسم العلامة التجارية
                            </Table.HeaderCell>
                            <Table.HeaderCell>الحالة</Table.HeaderCell>
                            <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
                            <Table.HeaderCell>أضيف من قبل</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <BrandsTableItems brands={props.brands} />
                    </Table.Body>
                    {props.brands.length > props.numOfResults - 1 ||
                    props.brands.length === 0 ? (
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={7}>
                                    {props.brands.length >
                                        props.numOfResults - 1 &&
                                    props.showLoadingMoreBtn ? (
                                        !props.isLoadingBrands ? (
                                            <Button
                                                fluid
                                                loading={props.isLoadingMore}
                                                disabled={
                                                    props.isLoadingMore
                                                        ? true
                                                        : false
                                                }
                                                onClick={() => {
                                                    props.dispatch(
                                                        actions.loadMore()
                                                    )
                                                }}
                                            >
                                                {!props.isLoadingMore ? (
                                                    'عرض المزيد'
                                                ) : (
                                                    <Loader />
                                                )}
                                            </Button>
                                        ) : null
                                    ) : props.brands.length !== 0 ? (
                                        <span style={{ color: 'GrayText' }}>
                                            &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                                        </span>
                                    ) : !props.isLoadingBrands ? (
                                        <span>لايوجد نتائج</span>
                                    ) : null}
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    ) : null}
                </Table>
            ) : (
                <Segment basic loading={true} />
            )}
        </PageContainer>
    )
}

export default connect(({ brandsPage_reducer }) => {
    return {
        order: brandsPage_reducer.order,
        search: brandsPage_reducer.search,
        brands: brandsPage_reducer.brands,
        showLoadingMoreBtn: brandsPage_reducer.showLoadingMoreBtn,
        isLoading: brandsPage_reducer.isLoading,
        isLoadingMore: brandsPage_reducer.isLoadingMore,
        isLoadingBrands: brandsPage_reducer.isLoadingBrands,
        numOfResults: brandsPage_reducer.numOfResults,
    }
})(Brands_page)
