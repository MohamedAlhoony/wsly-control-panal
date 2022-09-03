import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import * as actions from "../../../actions/managersManagementActions/managerDetailsPage-actions";
import { Grid, Form, Segment } from "semantic-ui-react";
import ManagerData from "./managerData/managerData";
import { formatPhoneNumber } from "../../../helperFunctions";
const ManagerDetails_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.managerID));
    return () => {
      props.dispatch({ type: "reset-managerDetailsPage_reducer" });
    };
  }, []);
  return (
    <PageContainer loading={props.isLoading}>
      <Form>
        <Segment>
          <Grid stackable columns={"three"}>
            <Grid.Row>
              <ManagerData managerDetails={props.managerDetails} />
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(({ managerDetailsPage_reducer }, props) => {
  const managerDetails = managerDetailsPage_reducer.managerDetails;
  const normalizedManagerDetails = managerDetails && {
    ID: {
      value: managerDetails.Id,
      label: "معرف الحساب",
    },
    name: {
      value: managerDetails.Name,
      label: "الاسم",
    },
    userName: {
      value: managerDetails.UserName,
      label: "اسم المستخدم",
    },
    role: {
      value: managerDetails.Role,
      label: "الدور",
      link: `#`,
    },
    walletNumber: {
      value: managerDetails.WalletNumber,
      label: "رقم المحفظة",
    },
    email: {
      value: managerDetails.Email,
      label: "البريد الإلكتروني",
    },

    phoneNumber: {
      value: formatPhoneNumber(managerDetails.PhoneNumber)
        ? formatPhoneNumber(managerDetails.PhoneNumber)
        : managerDetails.PhoneNumber,
      label: "رقم الهاتف",
    },
    isActive: { value: managerDetails.IsActive, label: "الحساب مفعل" },
    createdDate: {
      value: managerDetails.CreatedDate,
      label: "تاريخ الإنشاء",
    },
  };
  return {
    managerDetails: normalizedManagerDetails,
    isLoading: managerDetailsPage_reducer.isLoading,
    managerID: props.match.params.managerID,
  };
})(ManagerDetails_Page);
