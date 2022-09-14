import React, { useEffect } from "react";
import * as actions from "../../../actions/choicesManagementActions/choicesPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import ChoicesTableItems from "./choicesTableItems/choicesTableItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import debounce from "lodash.debounce";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";

let updateFilteredResult;
const _updateFilteredResult = debounce((value) => {
  updateFilteredResult(value);
}, 700);
const Choices_Page = (props) => {
  useEffect(() => {
    props.dispatch(
      actions.fetchInitialData({
        storeId: props.storeId,
        categoryId: props.categoryId,
        preferenceId: props.preferenceId,
        productId: props.productId,
      })
    );
    return () => {
      props.dispatch({ type: "reset-choicesPage_reducer" });
    };
  }, []);
  updateFilteredResult = (value) => {
    props.dispatch(actions.updateFilteredResult());
  };
  const choicesSortBy = (column) => {
    props.dispatch(actions.choicesSortBy(column));
  };
  let confirmedFunction;
  const confirmedSetAsDefault = (choice) => {
    props.dispatch(
      actions.setAsDefault({
        storeId: props.storeId,
        categoryId: props.categoryId,
        preferenceId: props.preferenceId,
        productId: props.productId,
        choiceId: choice.Id,
      })
    );
  };
  const setAsDefault = (choice) => {
    confirmedFunction = () => {
      confirmedSetAsDefault(choice);
    };
    props.dispatch(confirmDialog({ show: true }));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
      <TopMenu
        isDarkMode={props.isDarkMode}
        handleSearchChange={(value) => {
          props.dispatch({ type: "choicesPage-search", data: value });
          _updateFilteredResult(value);
        }}
        search={props.search}
      />
      <Table inverted={props.isDarkMode} stackable striped celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "Id"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                choicesSortBy("Id");
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
                choicesSortBy("Name");
              }}
            >
              الإسم
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "isDefault"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                choicesSortBy("isDefault");
              }}
            >
              خيار افتراضي
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "Price"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                choicesSortBy("Price");
              }}
            >
              السعر
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <ChoicesTableItems
            setAsDefault={setAsDefault}
            choices={props.filteredChoices}
            storeId={props.storeId}
          />
        </Table.Body>
      </Table>
    </PageContainer>
  );
};

export default connect(({ choicesPage_reducer, layout_reducer }, props) => {
  return {
    isLoading: choicesPage_reducer.isLoading,
    filteredChoices: choicesPage_reducer.filteredChoices,
    tableSorting: choicesPage_reducer.tableSorting,
    search: choicesPage_reducer.search,
    storeId: props.match.params.storeId,
    categoryId: props.match.params.categoryId,
    preferenceId: props.match.params.preferenceId,
    productId: props.match.params.productId,
  };
})(Choices_Page);
