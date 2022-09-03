import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import * as actions from "../../../actions/providersManagementActions/providerDetailsPage-actions";
import { Grid, Form, Segment } from "semantic-ui-react";
import ProviderData from "./providerData/providerData";
const ProviderDetails_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.providerID));
    return () => {
      props.dispatch({ type: "reset-providerDetailsPage_reducer" });
    };
  }, []);
  return (
    <PageContainer loading={props.isLoading}>
      <Form>
        <Segment>
          <Grid stackable columns={"three"}>
            <Grid.Row>
              <ProviderData providerDetails={props.providerDetails} />
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(({ providerDetailsPage_reducer }, props) => {
  const providerDetails = providerDetailsPage_reducer.providerDetails;
  const normalizedProviderDetails = providerDetails && {
    ID: {
      value: providerDetails.Id,
      label: "المعرف",
    },
    name: {
      value: providerDetails.Name,
      label: "الاسم",
    },
    thresholdViolationTrigger: {
      value: providerDetails.ThresholdViolationTrigger,
      label: "إشعار فرق سعر الشراء الفعلي",
    },
    balanceNotificationThreshold: {
      value: providerDetails.BalanceNotificationThreshold,
      label: "إشعار عند وصول رصيد المزود اقل من القيمة",
    },
    isActive: {
      value: !providerDetails.IsActive ? "غير مفعل" : "مفعل",
      label: "الحالة",
    },
    createdDate: {
      value: providerDetails.CreatedDate,
      label: "تاريخ الإنشاء",
    },
    createdBy: {
      value: providerDetails.CreatedBy.Name,
      label: "تم الإنشاء من قبل",
      link: `/managers/${providerDetails.CreatedBy.Id}`,
    },
    customFields: {
      value: providerDetails.CustomFields,
      label:
        "معلومات اضافية يوفرها المزود يتم استخدامها في الربط البرمجي للتعويض المباشر بإستخدام ال API",
    },
  };
  return {
    providerDetails: normalizedProviderDetails,
    isLoading: providerDetailsPage_reducer.isLoading,
    providerID: props.match.params.providerID,
  };
})(ProviderDetails_Page);
