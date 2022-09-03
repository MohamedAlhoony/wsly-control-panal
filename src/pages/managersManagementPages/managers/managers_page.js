import React, { useEffect } from "react";
import * as actions from "../../../actions/managersManagementActions/managersPage-actions";
import { connect } from "react-redux";
import { Segment, Button, Table, Loader } from "semantic-ui-react";
import debounce from "lodash.debounce";
import PageContainer from "../../../components/pageContainer/pageContainer";
import TopMenu from "./topMenu/topMenu";
import ManagersTableItems from "./managersTableItems/managersTableItems";
let wrappingFunction = null;
const _debouncedFetching = debounce(() => {
  wrappingFunction();
}, 700);
const Costumers_Page = (props) => {
  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;
    props.dispatch(actions.fetchInitialData(signal));
    return () => {
      props.dispatch({ type: "reset-managersPage_reducer" });
      controller.abort();
    };
  }, []);
  const handleTopMenuChange = (value, meta) => {
    props.dispatch({ type: `managersPage-${meta.id}`, data: value });

    if (meta.id === "search") {
      if (value.trim() !== props.search.trim()) {
        _debouncedFetching();
      }
    } else {
      wrappingFunction();
    }
  };

  wrappingFunction = () => {
    props.dispatch(actions.isLoadingManagers(true));
    props.dispatch({
      type: "managersPage-nextTo",
      data: 0,
    });
    if (!props.showLoadingMoreBtn) {
      props.dispatch(actions.showLoadingMoreBtn(true));
    }
    props
      .dispatch(actions.getManagers())
      .then(() => {
        props.dispatch(actions.isLoadingManagers(false));
      })
      .catch(() => {
        props.dispatch(actions.isLoadingManagers(false));
      });
  };
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu
        isLoadingManagers={props.isLoadingManagers}
        handleTopMenuChange={handleTopMenuChange}
        search={props.search}
        order={props.order}
      />
      {!props.isLoadingManagers ? (
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>الإسم</Table.HeaderCell>
              <Table.HeaderCell>اسم المستخدم</Table.HeaderCell>
              <Table.HeaderCell>رقم الهاتف</Table.HeaderCell>
              <Table.HeaderCell>الحالة</Table.HeaderCell>
              <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <ManagersTableItems managers={props.managers} />
          </Table.Body>
          {props.managers.length > props.numOfResults - 1 ||
          props.managers.length === 0 ? (
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={6}>
                  {props.managers.length > props.numOfResults - 1 &&
                  props.showLoadingMoreBtn ? (
                    !props.isLoadingManagers ? (
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
                  ) : props.managers.length !== 0 ? (
                    <span style={{ color: "GrayText" }}>
                      &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                    </span>
                  ) : !props.isLoadingManagers ? (
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

export default connect(({ managersPage_reducer }) => {
  return {
    order: managersPage_reducer.order,
    search: managersPage_reducer.search,
    managers: managersPage_reducer.managers,
    showLoadingMoreBtn: managersPage_reducer.showLoadingMoreBtn,
    isLoading: managersPage_reducer.isLoading,
    isLoadingMore: managersPage_reducer.isLoadingMore,
    isLoadingManagers: managersPage_reducer.isLoadingManagers,
    numOfResults: managersPage_reducer.numOfResults,
  };
})(Costumers_Page);
