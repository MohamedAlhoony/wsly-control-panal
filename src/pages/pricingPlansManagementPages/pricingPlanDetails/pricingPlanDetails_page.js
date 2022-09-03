import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import * as actions from "../../../actions/pricingPlansManagementActoins/pricingPlanDetailsPage-actions";
import { Grid, Form, Segment } from "semantic-ui-react";
import PricingPlanData from "./pricingPlanData/pricingPlanData";
const PricingPlanDetails_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.pricingPlanID));
    return () => {
      props.dispatch({ type: "reset-pricingPlanDetailsPage_reducer" });
    };
  }, []);
  return (
    <PageContainer loading={props.isLoading}>
      <Form>
        <Segment>
          <Grid stackable columns={"three"}>
            <Grid.Row>
              <PricingPlanData pricingPlanDetails={props.pricingPlanDetails} />
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(({ pricingPlanDetailsPage_reducer }, props) => {
  const pricingPlanDetails = pricingPlanDetailsPage_reducer.pricingPlanDetails;
  const normalizedPricingPlanDetails = pricingPlanDetails && {
    ID: {
      value: pricingPlanDetails.Id,
      label: "معرف الخطة",
    },
    name: {
      value: pricingPlanDetails.Name,
      label: "اسم الخطة",
    },
    // isActive: { value: pricingPlanDetails.IsActive, label: "الحساب مفعل" },
    createdDate: {
      value: pricingPlanDetails.CreatedDate,
      label: "تاريخ الإنشاء",
    },
    createdBy: {
      value: pricingPlanDetails.CreatedBy.Name,
      label: "تم الإنشاء من قبل",
      link: `/managers/${pricingPlanDetails.CreatedBy.Id}`,
    },
    pricingPlanEntries: {
      value: pricingPlanDetails.PricingPlanEntries,
      label: "عناصر الخطة",
    },
  };
  return {
    pricingPlanDetails: normalizedPricingPlanDetails,
    isLoading: pricingPlanDetailsPage_reducer.isLoading,
    pricingPlanID: props.match.params.pricingPlanID,
  };
})(PricingPlanDetails_Page);
