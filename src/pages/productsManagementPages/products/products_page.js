import React, { useEffect } from "react";
import * as actions from "../../../actions/productsManagementActions/productsPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import ProductsTableItems from "./productsTableItems/productsTableItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import debounce from "lodash.debounce";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";

let updateFilteredResult;
const _updateFilteredResult = debounce((value) => {
  updateFilteredResult(value);
}, 700);
const Products_Page = (props) => {
  useEffect(() => {
    props.dispatch(
      actions.fetchInitialData({
        storeId: props.storeId,
        categoryId: props.categoryId,
      })
    );
    return () => {
      props.dispatch({ type: "reset-productsPage_reducer" });
    };
  }, []);
  updateFilteredResult = (value) => {
    props.dispatch(actions.updateFilteredResult());
  };
  const productsSortBy = (column) => {
    props.dispatch(actions.productsSortBy(column));
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
          props.dispatch({ type: "productsPage-search", data: value });
          _updateFilteredResult(value);
        }}
        search={props.search}
      />
      <Table inverted={props.isDarkMode} stackable striped celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "PreferenceID"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                productsSortBy("PreferenceID");
              }}
            >
              المعرف
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "Name"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                productsSortBy("Name");
              }}
            >
              الإسم
            </Table.HeaderCell>
            <Table.HeaderCell>متاح؟</Table.HeaderCell>
            <Table.HeaderCell>الوصف</Table.HeaderCell>
            <Table.HeaderCell>السعر</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <ProductsTableItems
            handleDeleteCustomer={handleDeleteCustomer}
            products={props.filteredProducts}
            storeId={props.storeId}
            categoryId={props.categoryId}
          />
        </Table.Body>
      </Table>
    </PageContainer>
  );
};

export default connect(({ productsPage_reducer, layout_reducer }, props) => {
  return {
    isLoading: productsPage_reducer.isLoading,
    filteredProducts: productsPage_reducer.filteredProducts,
    tableSorting: productsPage_reducer.tableSorting,
    search: productsPage_reducer.search,
    storeId: props.match.params.storeId,
    categoryId: props.match.params.categoryId,
  };
})(Products_Page);
