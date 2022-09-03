import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/denominationsManagementActions/updateDenominationPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
import TopMenu from "./topMenu/topMenu";
const UpdateDenomination_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.denominationID));
    return () => {
      props.dispatch({ type: "reset-updateDenominationPage_reducer" });
    };
  }, []);

  const handleFormChange = (value, id) => {
    props.dispatch(actions.changeFormFieldValue(value, id));
  };
  const ConfirmedHandleIsAvailableChange = (isAvailable) => {
    props.dispatch(
      actions.updateDenominationState(props.denominationID, isAvailable)
    );
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
          ? "هل أنت متأكد من رغبتك في إخفاء الفئة عن المستخدمين؟"
          : "هل أنت متأكد من رغبتك في إظهار الفئة للمستخدمين؟",
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
                handleFormChange={handleFormChange}
                formData={props.formData}
                regions={props.regions}
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

export default connect(({ updateDenominationPage_reducer }, props) => {
  return {
    isLoading: updateDenominationPage_reducer.isLoading,
    isAvailable: updateDenominationPage_reducer.formData.isAvailable.value,
    formData: updateDenominationPage_reducer.formData,
    regions: updateDenominationPage_reducer.regions,
    brandID: props.match.params.brandID,
    denominationID: props.match.params.denominationID,
  };
})(UpdateDenomination_Page);
