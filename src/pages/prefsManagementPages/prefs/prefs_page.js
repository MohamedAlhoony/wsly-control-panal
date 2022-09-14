import React, { useEffect } from "react";
import * as actions from "../../../actions/prefsManagementActions/prefsPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import PrefsTableItems from "./prefsTableItems/prefsTableItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import debounce from "lodash.debounce";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";

let updateFilteredResult;
const _updateFilteredResult = debounce((value) => {
  updateFilteredResult(value);
}, 700);
const Prefs_Page = (props) => {
  useEffect(() => {
    props.dispatch(
      actions.fetchInitialData({
        storeId: props.storeId,
        categoryId: props.categoryId,
        productId: props.productId,
      })
    );
    return () => {
      props.dispatch({ type: "reset-prefsPage_reducer" });
    };
  }, []);
  updateFilteredResult = (value) => {
    props.dispatch(actions.updateFilteredResult());
  };
  const prefsSortBy = (column) => {
    props.dispatch(actions.prefsSortBy(column));
  };
  let confirmedFunction;
  const confirmedHandleDeleteCustomer = (customer) => {
    props.dispatch(actions.removeCustomer(customer.id));
  };
  const handleDeleteCustomer = (customer) => {
    confirmedFunction = () => {
      confirmedHandleDeleteCustomer(customer);
    };
    props.dispatch(confirmDialog({ show: true }));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
      <TopMenu
        isDarkMode={props.isDarkMode}
        handleSearchChange={(value) => {
          props.dispatch({ type: "prefsPage-search", data: value });
          _updateFilteredResult(value);
        }}
        search={props.search}
      />
      <Table inverted={props.isDarkMode} stackable striped celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "id"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                prefsSortBy("id");
              }}
            >
              المعرف
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "name"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                prefsSortBy("name");
              }}
            >
              الإسم
            </Table.HeaderCell>
            <Table.HeaderCell>الخيار الافتراضي</Table.HeaderCell>
            {/* <Table.HeaderCell></Table.HeaderCell> */}
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <PrefsTableItems
            handleDeleteCustomer={handleDeleteCustomer}
            prefs={props.filteredPrefs}
            storeId={props.storeId}
            categoryId={props.categoryId}
            productId={props.productId}
          />
        </Table.Body>
      </Table>
    </PageContainer>
  );
};

export default connect(({ prefsPage_reducer, layout_reducer }, props) => {
  return {
    isLoading: prefsPage_reducer.isLoading,
    filteredPrefs: prefsPage_reducer.filteredPrefs,
    tableSorting: prefsPage_reducer.tableSorting,
    search: prefsPage_reducer.search,
    storeId: props.match.params.storeId,
    categoryId: props.match.params.categoryId,
    productId: props.match.params.productId,
  };
})(Prefs_Page);
