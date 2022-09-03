import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button, Label } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/brandsManagementActions/updateBrandPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
import BrandSettings from "./brandSettings/brandSettings";
import TopMenu from "./topMenu/topMenu";

const UpdateBrand_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.brandID));
    return () => {
      props.dispatch({ type: "reset-updateBrandPage_reducer" });
    };
  }, []);

  const handleFormChange = (value, id) => {
    if (id === "brandImageFile") {
      return props.dispatch(actions.uploadBrandImage(value));
    }
    props.dispatch(actions.changeFormFieldValue(value, id));
  };
  const ConfirmedHandleIsAvailableChange = (isAvailable) => {
    props.dispatch(actions.updateBrandState(props.brandID, isAvailable));
  };
  let confirmedFunction;
  const handleIsAvailableChange = (isAvailable) => {
    confirmedFunction = () => {
      ConfirmedHandleIsAvailableChange(isAvailable);
    };
    props.dispatch(
      confirmDialog({
        show: true,
        body: !isAvailable
          ? "هل أنت متأكد من رغبتك في إخفاء العلامة التجارية عن المستخدمين؟"
          : "هل أنت متأكد من رغبتك في إظهار العلامة التجارية للمستخدمين؟",
      })
    );
  };
  const confirmedSubmitForm = () => {
    props.dispatch(actions.submitForm(props.brandID));
  };
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
  const clearBrandImageFile = () => {
    props.dispatch(actions.clearBrandImageFile());
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
      <TopMenu
        handleIsAvailableChange={handleIsAvailableChange}
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
                    type: "updateBrandPage-subscriptionBrands",
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

export default connect(({ updateBrandPage_reducer }, props) => {
  return {
    isAvailable: updateBrandPage_reducer.formData.isAvailable.value,
    isLoading: updateBrandPage_reducer.isLoading,
    formData: updateBrandPage_reducer.formData,
    subscriptions: updateBrandPage_reducer.subscriptions,
    subscriptionBrands: updateBrandPage_reducer.subscriptionBrands,
    isUploadingBrandImage: updateBrandPage_reducer.isUploadingBrandImage,
    brandID: props.match.params.brandID,
  };
})(UpdateBrand_Page);
