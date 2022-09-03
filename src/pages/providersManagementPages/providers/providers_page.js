import React, { useEffect } from "react";
import * as actions from "../../../actions/providersManagementActions/providersPage-actions";
import { connect } from "react-redux";
import { Segment, Button, Table, Loader } from "semantic-ui-react";
import debounce from "lodash.debounce";
import PageContainer from "../../../components/pageContainer/pageContainer";
import TopMenu from "./topMenu/topMenu";
import ProvidersTableItems from "./providersTableItems/providersTableItems";
let wrappingFunction = null;
const _debouncedFetching = debounce(() => {
  wrappingFunction();
}, 700);
const Providers_page = (props) => {
  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;
    props.dispatch(actions.fetchInitialData(signal));
    return () => {
      props.dispatch({ type: "reset-providersPage_reducer" });
      controller.abort();
    };
  }, []);
  const handleTopMenuChange = (value, meta) => {
    props.dispatch({ type: `providersPage-${meta.id}`, data: value });

    if (meta.id === "search") {
      if (value.trim() !== props.search.trim()) {
        _debouncedFetching();
      }
    } else {
      wrappingFunction();
    }
  };

  wrappingFunction = () => {
    props.dispatch(actions.isLoadingProviders(true));
    props.dispatch({
      type: "providersPage-nextTo",
      data: 0,
    });
    if (!props.showLoadingMoreBtn) {
      props.dispatch(actions.showLoadingMoreBtn(true));
    }
    props
      .dispatch(actions.getProviders())
      .then(() => {
        props.dispatch(actions.isLoadingProviders(false));
      })
      .catch(() => {
        props.dispatch(actions.isLoadingProviders(false));
      });
  };

  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu
        isLoadingProviders={props.isLoadingProviders}
        handleTopMenuChange={handleTopMenuChange}
        search={props.search}
        order={props.order}
      />
      {!props.isLoadingProviders ? (
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>المعرف</Table.HeaderCell>
              <Table.HeaderCell>اسم المزود</Table.HeaderCell>
              <Table.HeaderCell>الحالة</Table.HeaderCell>
              <Table.HeaderCell>إشعار فرق سعر الشراء الفعلي</Table.HeaderCell>
              <Table.HeaderCell>
                إشعار عند وصول رصيد المزود اقل من القيمة
              </Table.HeaderCell>
              <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
              <Table.HeaderCell>أضيف من قبل</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <ProvidersTableItems providers={props.providers} />
          </Table.Body>
          {props.providers.length > props.numOfResults - 1 ||
          props.providers.length === 0 ? (
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={9}>
                  {props.providers.length > props.numOfResults - 1 &&
                  props.showLoadingMoreBtn ? (
                    !props.isLoadingProviders ? (
                      <Button
                        fluid
                        loading={props.isLoadingMore}
                        disabled={props.isLoadingMore ? true : false}
                        onClick={() => {
                          props.dispatch(actions.loadMore());
                        }}
                      >
                        {!props.isLoadingMore ? "عرض المزيد" : <Loader />}
                      </Button>
                    ) : null
                  ) : props.providers.length !== 0 ? (
                    <span style={{ color: "GrayText" }}>
                      &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                    </span>
                  ) : !props.isLoadingProviders ? (
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
  );
};

export default connect(({ providersPage_reducer }) => {
  return {
    order: providersPage_reducer.order,
    search: providersPage_reducer.search,
    providers: providersPage_reducer.providers,
    showLoadingMoreBtn: providersPage_reducer.showLoadingMoreBtn,
    isLoading: providersPage_reducer.isLoading,
    isLoadingMore: providersPage_reducer.isLoadingMore,
    isLoadingProviders: providersPage_reducer.isLoadingProviders,
    numOfResults: providersPage_reducer.numOfResults,
  };
})(Providers_page);
