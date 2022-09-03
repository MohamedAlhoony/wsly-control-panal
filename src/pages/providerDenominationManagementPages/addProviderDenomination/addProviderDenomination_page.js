import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button, Label } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/providerDenominationManagementActions/addProviderDenominationPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
import TopMenu from "./topMenu/topMenu";
import CustomFields from "./customFields/customFields";
const RegisterCustomer_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.providerID));
    return () => {
      props.dispatch({
        type: "reset-addProviderDenominationPage_reducer",
      });
    };
  }, []);

  const handleFormChange = (value, id) => {
    props.dispatch(actions.changeFormFieldValue(value, id));
    if (["category", "brand", "denomination"].includes(id)) {
      props.dispatch(actions.updateFields(value, id, props.providerID));
    }
  };
  const confirmedSubmitForm = () => {
    props.dispatch(actions.submitForm(props.providerID));
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
        isStockReplaceActive={props.isStockReplaceActive}
        handleIsStockReplaceActiveChange={(value) => {
          props.dispatch(
            actions.changeFormFieldValue(value, "isStockReplaceActive")
          );
        }}
      />
      <Form>
        <Segment>
          <Grid columns={"three"} stackable>
            <Grid.Row>
              <FormData
                handleFormChange={handleFormChange}
                formData={props.formData}
                categories={props.categories}
                brands={props.brands}
                denominations={props.denominations}
                currencies={props.currencies}
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

export default connect(({ addProviderDenominationPage_reducer }, props) => {
  return {
    isLoading: addProviderDenominationPage_reducer.isLoading,
    formData: addProviderDenominationPage_reducer.formData,
    categories: addProviderDenominationPage_reducer.categories,
    brands: addProviderDenominationPage_reducer.brands,
    denominations: addProviderDenominationPage_reducer.denominations,
    providerDenominations:
      addProviderDenominationPage_reducer.providerDenominations,
    providerID: props.match.params.providerID,
    isStockReplaceActive:
      addProviderDenominationPage_reducer.formData.isStockReplaceActive.value,
    currencies: addProviderDenominationPage_reducer.currencies,
    customFields: addProviderDenominationPage_reducer.customFields,
  };
})(RegisterCustomer_Page);
