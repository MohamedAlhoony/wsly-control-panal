import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button, Label } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/providersManagementActions/updateProviderPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
import CustomFields from "./customFields/customFields";
import TopMenu from "./topMenu/topMenu";
const UpdateProvider_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.providerID));
    return () => {
      props.dispatch({ type: "reset-updateProviderPage_reducer" });
    };
  }, []);

  const handleFormChange = (value, id) => {
    props.dispatch(actions.changeFormFieldValue(value, id));
  };
  const confirmedSubmitForm = () => {
    props.dispatch(actions.submitForm(props.providerID));
  };
  let confirmedFunction;
  const submitForm = () => {
    confirmedFunction = () => {
      confirmedSubmitForm();
    };
    props.dispatch(
      actions.preSubmitValidation((isFormValid) => {
        if (isFormValid) {
          props.dispatch(confirmDialog({ show: true }));
        }
      })
    );
  };
  const confirmedUpdateProviderIsActive = (isActive) => {
    props.dispatch(actions.updateProviderIsActive(props.providerID, isActive));
  };
  const updateProviderIsActive = (isActive) => {
    confirmedFunction = () => {
      confirmedUpdateProviderIsActive(isActive);
    };
    props.dispatch(
      confirmDialog({
        show: true,
        body: !isActive
          ? "هل أنت متأكد من رغبتك في إلغاء تفعيل حساب المزود؟"
          : "هل أنت متأكد من رغبتك في تفعيل حساب المزود؟",
      })
    );
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />

      <TopMenu
        handleIsActiveChange={updateProviderIsActive}
        isActive={props.isActive}
      />
      <Form>
        <Segment>
          <Grid columns={"three"} stackable>
            <Grid.Row>
              <FormData
                handleFormChange={handleFormChange}
                formData={props.formData}
              />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column computer={8} mobile={16}>
                <Label size={"large"}>
                  معلومات اضافية يوفرها المزود يتم استخدامها في الربط البرمجي
                  للتعويض المباشر بإستخدام ال API
                </Label>
                <CustomFields
                  handleCustomFieldsChange={(newArray) => {
                    props.dispatch(actions.handleCustomFieldsChange(newArray));
                  }}
                  customFields={props.customFields}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
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

export default connect(({ updateProviderPage_reducer }, props) => {
  return {
    isLoading: updateProviderPage_reducer.isLoading,
    formData: updateProviderPage_reducer.formData,
    customFields: updateProviderPage_reducer.customFields,
    isActive: updateProviderPage_reducer.formData.isActive.value,
    providerID: props.match.params.providerID,
  };
})(UpdateProvider_Page);
