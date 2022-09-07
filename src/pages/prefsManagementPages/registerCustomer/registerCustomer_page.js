import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/customersManagementActions/registerCustomerPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
const RegisterCustomer_Page = (props) => {
  useEffect(() => {
    return () => {
      props.dispatch({ type: "reset-registerCustomerPage_reducer" });
    };
  }, []);

  const handleFormChange = (value, id) => {
    props.dispatch(actions.changeFormFieldValue(value, id));
  };
  const confirmedSubmitForm = () => {
    props.dispatch(actions.submitForm());
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
                // copyToClipboard={copyToClipboard}
                // generatePassword={generatePassword}
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
                  content={"تسجيل"}
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

export default connect(({ registerCustomerPage_reducer, layout_reducer }) => {
  return {
    isLoading: registerCustomerPage_reducer.isLoading,
    formData: registerCustomerPage_reducer.formData,
    roles: registerCustomerPage_reducer.roles,
    isDarkMode: layout_reducer.isDarkMode,
  };
})(RegisterCustomer_Page);
