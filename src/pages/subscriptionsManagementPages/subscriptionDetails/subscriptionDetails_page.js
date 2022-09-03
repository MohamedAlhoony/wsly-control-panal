import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import * as actions from "../../../actions/subscriptionsManagementActions/subscriptionDetailsPage-actions";
import { Grid, Form, Segment } from "semantic-ui-react";
import SubscriptionData from "./subscriptionData/subscriptionData";
import TopMenu from "./topMenu/topMenu";
const SubscriptionDetails_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.subscriptionID));
  }, []);
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu subscriptionID={props.subscriptionID} />
      <Form>
        <Segment>
          <Grid stackable columns={"three"}>
            <Grid.Row>
              <SubscriptionData
                subscriptionDetails={props.subscriptionDetails}
              />
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(({ subscriptionDetailsPage_reducer }, props) => {
  const subscriptionDetails =
    subscriptionDetailsPage_reducer.subscriptionDetails;
  const normalizedSubscriptionDetails = subscriptionDetails && {
    id: {
      value: subscriptionDetails.Id,
      label: "المعرف",
    },
    name: {
      value: subscriptionDetails.Name,
      label: "الإسم",
    },
    roundDecimalPlaces: {
      value: subscriptionDetails.RoundDecimalPlaces,
      label: "عدد الأرقام بعد الفاصلة",
    },
    createdDate: {
      value: subscriptionDetails.CreatedDate,
      label: "تاريخ الإنشاء",
    },
    wallet: {
      value: subscriptionDetails.Wallet,
      label: "المحفظة",
      link: "#",
    },
    currency: {
      value: subscriptionDetails.Currency.Name,
      label: "العملة",
      link: `/currencies/${subscriptionDetails.Currency.Id}`,
    },
    priceEffectiveCurrency: {
      value: subscriptionDetails.PriceEffectiveCurrency.Name,
      label: "العملة المـتأثرة بالسعر",
      link: `/currencies/${subscriptionDetails.PriceEffectiveCurrency.Id}`,
    },
    createdBy: {
      value: subscriptionDetails.CreatedBy.Name,
      label: "تم الإنشاء من قبل",
      link: `/managers/${subscriptionDetails.CreatedBy.Id}`,
    },
  };
  return {
    subscriptionDetails: normalizedSubscriptionDetails,
    isLoading: subscriptionDetailsPage_reducer.isLoading,
    subscriptionID: props.match.params.subscriptionID,
  };
})(SubscriptionDetails_Page);
