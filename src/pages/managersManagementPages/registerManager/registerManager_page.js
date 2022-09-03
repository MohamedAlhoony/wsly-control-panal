import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/managersManagementActions/registerManagerPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
const RegisterManager_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData());
    return () => {
      props.dispatch({ type: "reset-registerManagerPage_reducer" });
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
  const generatePassword = () => {
    let value = "";
    const smallAlphabets = "abcdefghijklmnopqrstuvwxyz";
    const capitalAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersSet = "0123456789";
    const symbolsSet = "@#$%";
    let charSet;
    for (let i = 0; i < 6; i++) {
      if (i <= 1) {
        charSet = capitalAlphabets;
      } else if (i > 1 && i < 4) {
        charSet = smallAlphabets;
      } else if (i === 5) {
        charSet = numbersSet;
      } else {
        charSet = symbolsSet;
      }
      value += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    props.dispatch(actions.changeFormFieldValue(value, "password"));
  };

  const copyToClipboard = (element) => {
    element.select();
    document.execCommand("copy");
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={confirmedSubmitForm} />
      <Form>
        <Segment>
          <Grid columns={"three"} stackable>
            <Grid.Row>
              <FormData
                copyToClipboard={copyToClipboard}
                generatePassword={generatePassword}
                handleFormChange={handleFormChange}
                formData={props.formData}
                roles={props.roles}
              />
              <Grid.Column width={"sixteen"}>
                <Button
                  onClick={() => {
                    submitForm();
                  }}
                  className={"primary"}
                  content={"تسجيل"}
                />
                <Button
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

export default connect(({ registerManagerPage_reducer }) => {
  return {
    isLoading: registerManagerPage_reducer.isLoading,
    formData: registerManagerPage_reducer.formData,
    roles: registerManagerPage_reducer.roles,
  };
})(RegisterManager_Page);
