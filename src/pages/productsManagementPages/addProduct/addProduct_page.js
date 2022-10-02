import React, { useEffect } from "react";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { connect } from "react-redux";
import { Form, Grid, Segment, Button } from "semantic-ui-react";
import FormData from "./formData/formData";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import * as actions from "../../../actions/productsManagementActions/addProductPage-actions";
import { confirmDialog } from "../../../actions/layout-actions";
const AddProduct_Page = (props) => {
  useEffect(() => {
    // props.dispatch(actions.fetchInitialData());
    return () => {
      props.dispatch({ type: "reset-addProductPage_reducer" });
    };
  }, []);

  const handleFormChange = (value, id) => {
    props.dispatch(actions.changeFormFieldValue(value, id));
  };
  const confirmedSubmitForm = () => {
    props.dispatch(
      actions.submitForm({
        categoryId: props.categoryId,
        storeId: props.storeId,
      })
    );
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
      <Form>
        <Segment>
          <Grid columns={"two"} stackable>
            <Grid.Row>
              <FormData
                // copyToClipboard={copyToClipboard}
                // generatePassword={generatePassword}
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

export default connect(({ addProductPage_reducer }, props) => {
  return {
    isLoading: addProductPage_reducer.isLoading,
    formData: addProductPage_reducer.formData,
    categoryId: props.match.params.categoryId,
    storeId: props.match.params.storeId,
    // roles: addProductPage_reducer.roles,
  };
})(AddProduct_Page);
