import React, { useEffect } from "react";
import * as actions from "../../../actions/categoriesManagementActions/categoriesPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import CategoriesTableItems from "./categoriesTableItems/categoriesTableItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import debounce from "lodash.debounce";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";

let updateFilteredResult;
const _updateFilteredResult = debounce((value) => {
  updateFilteredResult(value);
}, 700);
const Categories_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData({ storeId: props.storeId }));
    return () => {
      props.dispatch({ type: "reset-categoriesPage_reducer" });
    };
  }, []);
  updateFilteredResult = (value) => {
    props.dispatch(actions.updateFilteredResult());
  };
  const categoriesSortBy = (column) => {
    props.dispatch(actions.categoriesSortBy(column));
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
          props.dispatch({ type: "categoriesPage-search", data: value });
          _updateFilteredResult(value);
        }}
        search={props.search}
      />
      <Table inverted={props.isDarkMode} stackable striped celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "CategoryID"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                categoriesSortBy("CategoryID");
              }}
            >
              المعرف
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "CategoryName"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                categoriesSortBy("CategoryName");
              }}
            >
              الإسم
            </Table.HeaderCell>

            <Table.HeaderCell></Table.HeaderCell>
            {/* <Table.HeaderCell></Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <CategoriesTableItems
            handleDeleteCustomer={handleDeleteCustomer}
            categories={props.filteredCategories}
            storeId={props.storeId}
          />
        </Table.Body>
      </Table>
    </PageContainer>
  );
};

export default connect(({ categoriesPage_reducer, layout_reducer }, props) => {
  return {
    isLoading: categoriesPage_reducer.isLoading,
    filteredCategories: categoriesPage_reducer.filteredCategories,
    tableSorting: categoriesPage_reducer.tableSorting,
    search: categoriesPage_reducer.search,
    storeId: props.match.params.storeId,
  };
})(Categories_Page);
