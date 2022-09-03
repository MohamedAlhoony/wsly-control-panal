import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button, Label } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/brandsManagementActions/createBrandPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
import BrandSettings from "./brandSettings/brandSettings";
import TopMenu from "./topMenu/topMenu";

const CreateBrand_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData());
    return () => {
      props.dispatch({ type: "reset-createBrandPage_reducer" });
    };
  }, []);

  const handleFormChange = (value, id) => {
    if (id === "brandImageFile") {
      return props.dispatch(actions.uploadBrandImage(value));
    }
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
  const clearBrandImageFile = () => {
    props.dispatch(actions.clearBrandImageFile());
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={confirmedSubmitForm} />
      <TopMenu
        handleIsAvailableChange={(isAvailable) =>
          props.dispatch(
            actions.changeFormFieldValue(isAvailable, "isAvailable")
          )
        }
        isAvailable={props.isAvailable}
      />
      <Form>
        <Segment>
          <Grid columns={"three"} stackable>
            <Grid.Row>
              <FormData
                clearBrandImageFile={clearBrandImageFile}
                isUploadingBrandImage={props.isUploadingBrandImage}
                subscriptions={props.subscriptions}
                handleFormChange={handleFormChange}
                formData={props.formData}
              />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ marginBottom: "0.5rem" }} width={16}>
                <Label size={"large"}>الإعدادات</Label>
              </Grid.Column>
              <BrandSettings
                updateSubscriptionBrands={(data) =>
                  props.dispatch({
                    type: "createBrandPage-subscriptionBrands",
                    data,
                  })
                }
                formData={props.formData}
                subscriptions={props.subscriptions}
                subscriptionBrands={props.subscriptionBrands}
                handleFormChange={handleFormChange}
              />
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

export default connect(({ createBrandPage_reducer }) => {
  return {
    isAvailable: createBrandPage_reducer.formData.isAvailable.value,
    isLoading: createBrandPage_reducer.isLoading,
    formData: createBrandPage_reducer.formData,
    subscriptions: createBrandPage_reducer.subscriptions,
    subscriptionBrands: createBrandPage_reducer.subscriptionBrands,
    isUploadingBrandImage: createBrandPage_reducer.isUploadingBrandImage,
  };
})(CreateBrand_Page);
