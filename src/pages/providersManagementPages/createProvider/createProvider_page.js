import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button, Label } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/providersManagementActions/createProviderPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
import CustomFields from "./customFields/customFields";
import TopMenu from "./topMenu/topMenu";
const CreateProvider_Page = (props) => {
  useEffect(() => {
    return () => {
      props.dispatch({ type: "reset-createProviderPage_reducer" });
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
      <TopMenu
        handleIsActiveChange={(isActive) =>
          props.dispatch(actions.changeFormFieldValue(isActive, "isActive"))
        }
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
                  content={"إضافة"}
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

export default connect(({ createProviderPage_reducer }) => {
  return {
    isLoading: createProviderPage_reducer.isLoading,
    formData: createProviderPage_reducer.formData,
    customFields: createProviderPage_reducer.customFields,
    isActive: createProviderPage_reducer.formData.isActive.value,
  };
})(CreateProvider_Page);
