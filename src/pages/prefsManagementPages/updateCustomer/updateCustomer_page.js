import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/customersManagementActions/updateCustomerPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
const UpdateCustomer_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.customerID));
    return () => {
      props.dispatch({ type: "reset-updateCustomerPage_reducer" });
    };
  }, []);

  const handleFormChange = (value, id) => {
    props.dispatch(actions.changeFormFieldValue(value, id));
  };
  const confirmedSubmitForm = () => {
    props.dispatch(actions.submitForm(props.customerID));
  };
  const submitForm = () => {
    props.dispatch(
      actions.preSubmitValidation((isFormValid) => {
        if (isFormValid) {
          props.dispatch(confirmDialog({ show: true }));
        }
      })
    );
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={confirmedSubmitForm} />
      <Form>
        <Segment inverted={props.isDarkMode}>
          <Grid columns={"three"} stackable>
            <Grid.Row>
              <FormData
                handleFormChange={handleFormChange}
                formData={props.formData}
                roles={props.roles}
              />
              <Grid.Column width={"sixteen"}>
                <Button
                  inverted={props.isDarkMode}
                  onClick={() => {
                    submitForm();
                  }}
                  className={"primary"}
                  content={"تحديث"}
                />
                <Button
                  inverted={props.isDarkMode}
                  content={"إغلاق"}
                  onClick={() => props.history.goBack()}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </PageContainer>
  );
};

export default connect(
  ({ updateCustomerPage_reducer, layout_reducer }, props) => {
    return {
      isLoading: updateCustomerPage_reducer.isLoading,
      formData: updateCustomerPage_reducer.formData,
      roles: updateCustomerPage_reducer.roles,
      customerID: props.match.params.customerID,
      isDarkMode: layout_reducer.isDarkMode,
    };
  }
)(UpdateCustomer_Page);
