import React, { useEffect } from 'react'
import * as actions from '../../../actions/categoriesManagementActions/categoriesPage-actions'
import { connect } from 'react-redux'
import { Segment, Button, Table, Loader } from 'semantic-ui-react'
import debounce from 'lodash.debounce'
import PageContainer from '../../../components/pageContainer/pageContainer'
import TopMenu from './topMenu/topMenu'
import CategoriesTableItems from './categoriesTableItems/categoriesTableItems'
let wrappingFunction = null
const _debouncedFetching = debounce(() => {
    wrappingFunction()
}, 700)
const Categories_Page = (props) => {
    useEffect(() => {
        let controller = new AbortController()
        let signal = controller.signal
        props.dispatch(actions.fetchInitialData(signal))
        return () => {
            props.dispatch({ type: 'reset-categoriesPage_reducer' })
            controller.abort()
        }
    }, [])
    const handleTopMenuChange = (value, meta) => {
        props.dispatch({ type: `categoriesPage-${meta.id}`, data: value })

        if (meta.id === 'search') {
            if (value.trim() !== props.search.trim()) {
                _debouncedFetching()
            }
        } else {
            wrappingFunction()
        }
    }

    wrappingFunction = () => {
        props.dispatch(actions.isLoadingCategories(true))
        props.dispatch({
            type: 'categoriesPage-nextTo',
            data: 0,
        })
        if (!props.showLoadingMoreBtn) {
            props.dispatch(actions.showLoadingMoreBtn(true))
        }
        props
            .dispatch(actions.getCategories())
            .then(() => {
                props.dispatch(actions.isLoadingCategories(false))
            })
            .catch(() => {
                props.dispatch(actions.isLoadingCategories(false))
            })
    }
    return (
        <PageContainer loading={props.isLoading}>
            <TopMenu
                isLoadingCategories={props.isLoadingCategories}
                handleTopMenuChange={handleTopMenuChange}
                search={props.search}
                order={props.order}
            />
            {!props.isLoadingCategories ? (
                <Table striped celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>الإسم</Table.HeaderCell>
                            <Table.HeaderCell>
                                هل ظاهر للزبائن؟
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                هل ظاهر للمدراء؟
                            </Table.HeaderCell>
                            <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
                            <Table.HeaderCell>أضيف من قبل</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <CategoriesTableItems categories={props.categories} />
                    </Table.Body>
                    {props.categories.length > props.numOfResults - 1 ||
                    props.categories.length === 0 ? (
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={7}>
                                    {props.categories.length >
                                        props.numOfResults - 1 &&
                                    props.showLoadingMoreBtn ? (
                                        !props.isLoadingCategories ? (
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
                                    ) : props.categories.length !== 0 ? (
                                        <span style={{ color: 'GrayText' }}>
                                            &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                                        </span>
                                    ) : !props.isLoadingCategories ? (
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

export default connect(({ categoriesPage_reducer }) => {
    return {
        order: categoriesPage_reducer.order,
        search: categoriesPage_reducer.search,
        categories: categoriesPage_reducer.categories,
        showLoadingMoreBtn: categoriesPage_reducer.showLoadingMoreBtn,
        isLoading: categoriesPage_reducer.isLoading,
        isLoadingMore: categoriesPage_reducer.isLoadingMore,
        isLoadingCategories: categoriesPage_reducer.isLoadingCategories,
        numOfResults: categoriesPage_reducer.numOfResults,
    }
})(Categories_Page)
