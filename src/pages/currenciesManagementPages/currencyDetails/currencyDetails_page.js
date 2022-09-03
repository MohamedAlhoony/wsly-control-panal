import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import * as actions from "../../../actions/currenciesManagementActions/currencyDetailsPage-actions";
import { Grid, Form, Segment } from "semantic-ui-react";
import CurrencyData from "./currencyData/currencyData";
const CurrencyDetails_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.currencyID));
    return () => {
      props.dispatch({ type: "reset-currencyDetailsPage_reducer" });
    };
  }, []);
  return (
    <PageContainer loading={props.isLoading}>
      <Form>
        <Segment>
          <Grid stackable columns={"three"}>
            <Grid.Row>
              <CurrencyData currencyDetails={props.currencyDetails} />
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(({ currencyDetailsPage_reducer }, props) => {
  const currencyDetails = currencyDetailsPage_reducer.currencyDetails;
  const normalizedCurrencyDetails = currencyDetails && {
    id: {
      value: currencyDetails.Id,
      label: "المعرف",
    },
    name: {
      value: currencyDetails.Name,
      label: "الإسم",
    },
    nameEn: {
      value: currencyDetails.NameEn,
      label: "الإسم باللغة الإنجليزية",
    },
    code: {
      value: currencyDetails.Code,
      label: "الإختصار",
    },
    codeEn: {
      value: currencyDetails.CodeEn,
      label: "الإختصار باللغة الإنجليزية",
    },
    symbol: {
      value: currencyDetails.Symbol,
      label: "الرمز",
    },
    exchangeValue: {
      value: currencyDetailsPage_reducer.exchangeValue || "",
      label: "سعر الصرف",
    },
    createdDate: {
      value: currencyDetails.CreatedDate,
      label: "تاريخ الإنشاء",
    },
    createdBy: {
      value: currencyDetails.CreatedBy.Name,
      label: "تم الإنشاء من قبل",
      link: `/managers/${currencyDetails.CreatedBy.Id}`,
    },
  };
  return {
    currencyDetails: normalizedCurrencyDetails,
    isLoading: currencyDetailsPage_reducer.isLoading,
    currencyID: props.match.params.currencyID,
  };
})(CurrencyDetails_Page);
