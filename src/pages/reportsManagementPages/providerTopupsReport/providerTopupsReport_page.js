import React, { useEffect } from "react";
import * as actions from "../../../actions/reportsManagementActions/providerTopupsReportPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import ProviderTopupsReportTableItems from "./providerTopupsReportItems/providerTopupsReportItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import moment from "moment";
const ProviderTopupsReport_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData());
    return () => {
      props.dispatch({ type: "reset-providerTopupsReportPage_reducer" });
    };
  }, []);
  const sortTable = (column) => {
    props.dispatch(actions.providerTopupsSortBy(column));
  };
  const handleProviderIDChange = (value) => {
    props.dispatch(actions.changeProviderID(value));
  };
  const handleDatePickerChange = (value, meta) => {
    if (
      meta.id === "from" &&
      props.dateFilter.to !== "" &&
      moment(value).isAfter(moment(props.dateFilter.to))
    ) {
      props.dispatch(actions.dateFilter({ to: "" }));
    }
    props.dispatch(actions.dateFilter({ [meta.id]: value }));
  };
  const updateProviderTopupsReport = () => {
    props.dispatch(actions.updateProviderTopupsReport());
  };
  const exportProviderTopupsReport = (type) => {
    props.dispatch(actions.exportProviderTopupsReport(type));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu
        providers={props.providers}
        providerID={props.providerID}
        isExportBtnLoading={props.isExportBtnLoading}
        exportProviderTopupsReport={exportProviderTopupsReport}
        updateProviderTopupsReport={updateProviderTopupsReport}
        handleDatePickerChange={handleDatePickerChange}
        handleProviderIDChange={handleProviderIDChange}
        dateFilter={props.dateFilter}
      />
      <Table sortable stackable striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "Amount"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("Amount");
              }}
            >
              القيمة
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "Date"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("Date");
              }}
            >
              تاريخ الشحن
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <ProviderTopupsReportTableItems
            providerTopups={props.providerTopups}
          />
        </Table.Body>
        {!props.providerTopups.length && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={2}>لا يوجد نتائج</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </PageContainer>
  );
};

export default connect(({ providerTopupsReportPage_reducer }) => {
  return {
    providers: providerTopupsReportPage_reducer.providers,
    isLoading: providerTopupsReportPage_reducer.isLoading,
    isExportBtnLoading: providerTopupsReportPage_reducer.isExportBtnLoading,
    providerTopups: providerTopupsReportPage_reducer.providerTopups,
    tableSorting: providerTopupsReportPage_reducer.tableSorting,
    dateFilter: providerTopupsReportPage_reducer.dateFilter,
    providerID: providerTopupsReportPage_reducer.providerID,
  };
})(ProviderTopupsReport_Page);
