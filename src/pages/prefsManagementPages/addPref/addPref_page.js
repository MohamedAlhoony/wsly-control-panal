import React, { useEffect } from "react";
import * as actions from "../../../actions/prefsManagementActions/addPrefPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import PrefsTableItems from "./prefsTableItems/prefsTableItems";
import { Table, Button, Icon } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import debounce from "lodash.debounce";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";

let updateFilteredResult;
const _updateFilteredResult = debounce((value) => {
  updateFilteredResult(value);
}, 700);
const AddPref_Page = (props) => {
  useEffect(() => {
    props.dispatch(
      actions.fetchInitialData({
        storeId: props.storeId,
        categoryId: props.categoryId,
        productId: props.productId,
      })
    );
    return () => {
      props.dispatch({ type: "reset-addPrefPage_reducer" });
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
  const togglePref = (prefId) => {
    props.dispatch(actions.togglePref(prefId));
  };
  const toggleChoice = (prefId, choiceId) => {
    props.dispatch(actions.toggleChoice(prefId, choiceId));
  };

  const toggleChoiceDefault = (prefId, choiceId) => {
    props.dispatch(actions.toggleChoiceDefault(prefId, choiceId));
  };

  const handleSubmit = () => {
    props.dispatch(
      actions.submitForm({
        storeId: props.storeId,
        categoryId: props.categoryId,
        productId: props.productId,
      })
    );
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
      <TopMenu
        handleSubmit={handleSubmit}
        isDarkMode={props.isDarkMode}
        handleSearchChange={(value) => {
          props.dispatch({ type: "addPrefPage-search", data: value });
          _updateFilteredResult(value);
        }}
        search={props.search}
      />
      <Table inverted={props.isDarkMode} stackable sortable celled>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell
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
            </Table.HeaderCell> */}
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
            <Table.HeaderCell>
              اختيار
              <Icon name="arrow down" />
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <PrefsTableItems
            togglePref={togglePref}
            toggleChoice={toggleChoice}
            toggleChoiceDefault={toggleChoiceDefault}
            handleDeleteCustomer={handleDeleteCustomer}
            prefs={props.filteredPrefs}
            storeId={props.storeId}
            categoryId={props.categoryId}
            productId={props.productId}
          />
        </Table.Body>

        {/* <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
              >
                <Icon name="user" /> Add User
              </Button>
              <Button size="small">Approve</Button>
              <Button disabled size="small">
                Approve All
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer> */}
      </Table>
    </PageContainer>
  );
};

export default connect(({ addPrefPage_reducer, layout_reducer }, props) => {
  return {
    isLoading: addPrefPage_reducer.isLoading,
    filteredPrefs: addPrefPage_reducer.filteredPrefs,
    tableSorting: addPrefPage_reducer.tableSorting,
    search: addPrefPage_reducer.search,
    storeId: props.match.params.storeId,
    categoryId: props.match.params.categoryId,
    productId: props.match.params.productId,
  };
})(AddPref_Page);
