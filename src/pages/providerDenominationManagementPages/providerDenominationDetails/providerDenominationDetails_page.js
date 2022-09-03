import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import * as actions from "../../../actions/providerDenominationManagementActions/providerDenominationDetailsPage-actions";
import { Grid, Form, Segment } from "semantic-ui-react";
import ProviderDenominationData from "./providerDenominationData/providerDenominationData";
const ProviderDetails_Page = (props) => {
  useEffect(() => {
    props.dispatch(
      actions.fetchInitialData(props.providerID, props.denominationID)
    );
    return () => {
      props.dispatch({ type: "reset-providerDenominationDetailsPage_reducer" });
    };
  }, []);
  return (
    <PageContainer loading={props.isLoading}>
      <Form>
        <Segment>
          <Grid stackable columns={"three"}>
            <Grid.Row>
              <ProviderDenominationData
                providerDenominationDetails={props.providerDenominationDetails}
              />
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(({ providerDenominationDetailsPage_reducer }, props) => {
  const providerDenominationDetails =
    providerDenominationDetailsPage_reducer.providerDenominationDetails;
  const normalizedProviderDetails = providerDenominationDetails && {
    denominationID: {
      value: providerDenominationDetails.Brand.Denomination.Id,
      label: "معرف الفئة",
    },
    providerDenominationID: {
      value: providerDenominationDetails.ProviderDenominationId,
      label: "معرف فئة المزود",
    },
    provider: {
      value: providerDenominationDetails.Provider.Name,
      label: "المزود",
      link: `/providers/${providerDenominationDetails.Provider.Id}`,
    },
    brand: {
      value: providerDenominationDetails.Brand.Name,
      label: "العلامة التجارية",
      link: `/brands/${providerDenominationDetails.Brand.Id}`,
    },
    denomination: {
      value: providerDenominationDetails.Brand.Denomination.Name,
      label: "الفئة",
      link: `/denominations/${providerDenominationDetails.Brand.Denomination.Id}`,
    },
    currency: {
      value: providerDenominationDetails.Currency.Name,
      label: "العملة",
      link: `/currencies/${providerDenominationDetails.Currency.Id}`,
    },
    buyingPrice: {
      value: providerDenominationDetails.BuyingPrice,
      label: "سعر الشراء من المزود",
    },
    IsStockReplaceActive: {
      value: !providerDenominationDetails.IsStockReplaceActive ? "لا" : "نعم",
      label: "هل خاصية التعويض الفوري مفعلة؟",
    },
    createdDate: {
      value: providerDenominationDetails.CreatedDate,
      label: "تاريخ الإنشاء",
    },
    createdBy: {
      value: providerDenominationDetails.CreatedBy.Name,
      label: "تم الإنشاء من قبل",
      link: `/managers/${providerDenominationDetails.CreatedBy.Id}`,
    },
    providerMetaData: {
      value: providerDenominationDetails.ProviderMetaData,
      label:
        "معلومات اضافية يوفرها المزود يتم استخدامها في الربط البرمجي للتعويض المباشر بإستخدام ال API",
    },
  };
  return {
    providerDenominationDetails: normalizedProviderDetails,
    isLoading: providerDenominationDetailsPage_reducer.isLoading,
    providerID: props.match.params.providerID,
    denominationID: props.match.params.denominationID,
  };
})(ProviderDetails_Page);
