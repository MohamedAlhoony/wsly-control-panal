import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/managersManagementActions/updateManagerPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
import TopMenu from "./topMenu/topMenu";
const RegisterManager_Page = (props) => {
  let confirmDialogFunc;
  let _;
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.managerID));
    return () => {
      props.dispatch({ type: "reset-updateManagerPage_reducer" });
    };
  }, []);
  const handleFormChange = (value, id) => {
    props.dispatch(actions.changeFormFieldValue(value, id));
  };
  const confirmedSubmitForm = () => {
    props.dispatch(actions.submitForm(props.managerID));
  };
  const submitForm = () => {
    confirmDialogFunc = confirmedSubmitForm;
    props.dispatch(
      actions.preSubmitValidation((isFormValid) => {
        if (isFormValid) {
          props.dispatch(confirmDialog({ show: true }));
        }
      })
    );
  };
  const ConfirmedhandleStateChange = (isActive) => {
    props.dispatch(actions.updateManagerState(props.managerID, isActive));
  };
  const handleStateChange = (isActive) => {
    _ = isActive;
    confirmDialogFunc = ConfirmedhandleStateChange;
    props.dispatch(
      confirmDialog({
        show: true,
        body: !isActive
          ? "هل أنت متأكد من رغبتك في إلغاء تفعيل الحساب؟"
          : "هل أنت متأكد من رغبتك في تفعيل الحساب؟",
      })
    );
  };
  const ConfirmedhandleResetPassword = () => {
    props.dispatch(actions.resetPassword(props.managerID));
  };
  const handleResetPassword = () => {
    confirmDialogFunc = ConfirmedhandleResetPassword;
    props.dispatch(
      confirmDialog({
        show: true,
        body: "هل أنت متأكد من رغبتك في إعادة تعيين كلمة السر؟",
      })
    );
  };
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu
        handleResetPassword={handleResetPassword}
        handleStateChange={handleStateChange}
        isActive={props.isActive}
      />
      <ConfirmDialog
        onConfirm={() => {
          confirmDialogFunc(_);
        }}
      />
      <Form>
        <Segment>
          <Grid columns={"three"} stackable>
            <Grid.Row>
              <FormData
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
                  content={"تحديث"}
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

export default connect(({ updateManagerPage_reducer }, props) => {
  return {
    isActive: updateManagerPage_reducer.isActive,
    isLoading: updateManagerPage_reducer.isLoading,
    formData: updateManagerPage_reducer.formData,
    roles: updateManagerPage_reducer.roles,
    managerID: props.match.params.managerID,
  };
})(RegisterManager_Page);
