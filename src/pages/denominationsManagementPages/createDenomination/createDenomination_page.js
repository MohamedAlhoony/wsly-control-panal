import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/denominationsManagementActions/createDenominationPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
import TopMenu from "./topMenu/topMenu";
const CreateDenomination_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData());
    return () => {
      props.dispatch({ type: "reset-createDenominationPage_reducer" });
    };
  }, []);

  const handleFormChange = (value, id) => {
    props.dispatch(actions.changeFormFieldValue(value, id));
  };
  const confirmedSubmitForm = () => {
    props.dispatch(actions.submitForm(props.brandID));
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

export default connect(({ createDenominationPage_reducer }, props) => {
  return {
    isLoading: createDenominationPage_reducer.isLoading,
    isAvailable: createDenominationPage_reducer.formData.isAvailable.value,
    formData: createDenominationPage_reducer.formData,
    regions: createDenominationPage_reducer.regions,
    brandID: props.match.params.brandID,
  };
})(CreateDenomination_Page);
