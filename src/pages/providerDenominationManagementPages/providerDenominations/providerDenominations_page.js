import React, { useEffect } from "react";
import * as actions from "../../../actions/providerDenominationManagementActions/providerDenominationsPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import DenominationsTableItems from "./denominationsTableItems/denominationsTableItems";
import { Table, Label } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import debounce from "lodash.debounce";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";
import { Link } from "react-router-dom";
let updateFilteredResult;
const _updateFilteredResult = debounce((value) => {
  updateFilteredResult(value);
}, 700);
const ProviderDenominations_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.providerID));
    return () => {
      props.dispatch({ type: "reset-providerDenominationsPage_reducer" });
    };
  }, []);
  updateFilteredResult = (value) => {
    props.dispatch(actions.updateFilteredResult());
  };
  const confimredRemoveDenomination = (denomination) => {
    props.dispatch(actions.removeDenomination(props.providerID, denomination));
  };
  let confirmedFunction;
  const removeDenomination = (denomination) => {
    confirmedFunction = () => {
      confimredRemoveDenomination(denomination);
    };
    props.dispatch(
      confirmDialog({
        show: true,
      })
    );
  };
  const sortTable = (column) => {
    props.dispatch(actions.denominationsSortBy(column));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
      <Label
        icon={"users"}
        content={props.providerName}
        as={Link}
        to={`/providers/${props.providerID}`}
        tag
        size={"big"}
      />
      <TopMenu
        providerID={props.providerID}
        handleSearchChange={(value) => {
          props.dispatch({
            type: "providerDenominationsPage-search",
            data: value,
          });
          _updateFilteredResult(value);
        }}
        search={props.search}
      />
      <Table stackable striped celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "brand_name"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("brand_name");
              }}
            >
              العلامة التجارية
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "deno_name"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("deno_name");
              }}
            >
              الفئة
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "buying_price"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("buying_price");
              }}
            >
              سعر الشراء
            </Table.HeaderCell>
            <Table.HeaderCell>هل خاصية التعويض الفوري مفعلة؟</Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "created_date"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("created_date");
              }}
            >
              تاريخ الإضافة
            </Table.HeaderCell>
            <Table.HeaderCell>إضيفت من قبل</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <DenominationsTableItems
            removeDenomination={removeDenomination}
            providerID={props.providerID}
            denominations={props.filteredDenominations}
          />
        </Table.Body>
        {!props.filteredDenominations.length && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={7}>لا يوجد نتائج</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </PageContainer>
  );
};

export default connect(({ providerDenominationsPage_reducer }, props) => {
  return {
    denominations: providerDenominationsPage_reducer.denominations,
    isLoading: providerDenominationsPage_reducer.isLoading,
    providerID: props.match.params.providerID,
    filteredDenominations:
      providerDenominationsPage_reducer.filteredDenominations,
    search: providerDenominationsPage_reducer.search,
    providerName: providerDenominationsPage_reducer.providerDetails?.Name,
    tableSorting: providerDenominationsPage_reducer.tableSorting,
  };
})(ProviderDenominations_Page);
