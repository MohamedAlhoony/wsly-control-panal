import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import * as actions from "../../../actions/customersManagementActions/customerDetailsPage-actions";
import { Grid, Form, Segment } from "semantic-ui-react";
import CustomerData from "./customerData/customerData";
import { formatPhoneNumber } from "../../../helperFunctions";
const CustomerDetails_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.customerID));
    return () => {
      props.dispatch({ type: "reset-customerDetailsPage_reducer" });
    };
  }, []);
  return (
    <PageContainer loading={props.isLoading}>
      <Form>
        <Segment>
          <Grid stackable columns={"three"}>
            <Grid.Row>
              <CustomerData customerDetails={props.customerDetails} />
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(({ customerDetailsPage_reducer }, props) => {
  const customerDetails = customerDetailsPage_reducer.customerDetails;
  const normalizedCustomerDetails = customerDetails && {
    ID: {
      value: customerDetails.Id,
      label: "معرف الحساب",
    },
    name: {
      value: customerDetails.Name,
      label: "الاسم",
    },
    userName: {
      value: customerDetails.UserName,
      label: "اسم المستخدم",
    },
    subscription: {
      value: customerDetails.Subscription,
      label: "نوع الإشتراك",
      link: `/subscriptions/${customerDetails.Subscription.Id}`,
    },
    walletNumber: {
      value: customerDetails.WalletNumber,
      label: "رقم المحفظة",
    },
    email: {
      value: customerDetails.Email,
      label: "البريد الإلكتروني",
    },

    phoneNumber: {
      value: formatPhoneNumber(customerDetails.PhoneNumber)
        ? formatPhoneNumber(customerDetails.PhoneNumber)
        : customerDetails.PhoneNumber,
      label: "رقم الهاتف",
    },
    isActive: { value: customerDetails.IsActive, label: "الحساب مفعل" },
    createdDate: {
      value: customerDetails.CreatedDate,
      label: "تاريخ الإنشاء",
    },
  };
  return {
    customerDetails: normalizedCustomerDetails,
    isLoading: customerDetailsPage_reducer.isLoading,
    customerID: props.match.params.customerID,
  };
})(CustomerDetails_Page);
