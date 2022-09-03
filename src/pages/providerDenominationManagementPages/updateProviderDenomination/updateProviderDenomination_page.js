import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button, Label } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/providerDenominationManagementActions/updateProviderDenominationPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
import TopMenu from "./topMenu/topMenu";
import CustomFields from "./customFields/customFields";
const RegisterCustomer_Page = (props) => {
  useEffect(() => {
    props.dispatch(
      actions.fetchInitialData(props.providerID, props.denominationID)
    );
    return () => {
      props.dispatch({
        type: "reset-updateProviderDenominationPage_reducer",
      });
    };
  }, []);

  const handleFormChange = (value, id) => {
    props.dispatch(actions.changeFormFieldValue(value, id));
  };
  let confirmedFunction;
  const confirmedSubmitForm = () => {
    props.dispatch(actions.submitForm(props.providerID, props.denominationID));
  };
  const submitForm = () => {
    confirmedFunction = confirmedSubmitForm;
    props.dispatch(
      actions.preSubmitValidation((isFormValid) => {
        if (isFormValid) {
          props.dispatch(confirmDialog({ show: true }));
        }
      })
    );
  };
  const confirmedUpdateIsStockReplaceActive = (isStockReplaceActive) => {
    props.dispatch(
      actions.updateStockReplaceActivity(
        props.providerID,
        props.denominationID,
        isStockReplaceActive
      )
    );
  };
  const updateIsStockReplaceActive = (isStockReplaceActive) => {
    confirmedFunction = () => {
      confirmedUpdateIsStockReplaceActive(isStockReplaceActive);
    };
    props.dispatch(
      confirmDialog({
        show: true,
        body: !isStockReplaceActive
          ? "هل أنت متأكد من رغبتك في إلغاء تفعيل خاصية التعويض الفوري؟"
          : "هل أنت متأكد من رغبتك في تفعيل خاصية التعويض الفوري؟",
      })
    );
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
      <TopMenu
        isStockReplaceActive={props.isStockReplaceActive}
        handleIsStockReplaceActiveChange={updateIsStockReplaceActive}
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

export default connect(({ updateProviderDenominationPage_reducer }, props) => {
  return {
    isLoading: updateProviderDenominationPage_reducer.isLoading,
    formData: updateProviderDenominationPage_reducer.formData,
    categories: updateProviderDenominationPage_reducer.categories,
    brands: updateProviderDenominationPage_reducer.brands,
    denominations: updateProviderDenominationPage_reducer.denominations,
    providerDenominations:
      updateProviderDenominationPage_reducer.providerDenominations,
    providerID: props.match.params.providerID,
    isStockReplaceActive:
      updateProviderDenominationPage_reducer.formData.isStockReplaceActive
        .value,
    currencies: updateProviderDenominationPage_reducer.currencies,
    customFields: updateProviderDenominationPage_reducer.customFields,
    denominationID: props.match.params.denominationID,
  };
})(RegisterCustomer_Page);
