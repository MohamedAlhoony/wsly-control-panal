import React from "react";
import { Modal, Header, Form, Button, Select } from "semantic-ui-react";
const CurrencyExchangeModal = (props) => {
  const {
    addBrandToCategoryModal,
    closeAddBrandToCategoryModal,
    categoryName,
    handleSelectInputChange,
    submitCateogryBrand,
  } = props;
  return (
    <Modal
      size="tiny"
      onClose={closeAddBrandToCategoryModal}
      open={addBrandToCategoryModal.show}
      closeOnDimmerClick={false}
      dimmer={"blurring"}
    >
      <Header textAlign={"center"}>
        إضافة علامة تجارية للصنف "{categoryName}"
        {/* <Icon name={'exchange'} /> */}
      </Header>

      <Modal.Content>
        <Form
          loading={addBrandToCategoryModal.isLoading}
          onSubmit={submitCateogryBrand}
        >
          <Form.Field
            required
            fluid
            dir={"ltr"}
            control={Select}
            placeholder={"اختر علامة التجارية"}
            value={addBrandToCategoryModal.selectBrandInput.brand?.Id}
            options={addBrandToCategoryModal.availableToAddBrands.map(
              (item, key) => {
                return {
                  text: item.Name,
                  value: item.Id,
                  key: key,
                };
              }
            )}
            onChange={(_, event) => {
              handleSelectInputChange(event);
            }}
          />
          <Button
            disabled={
              addBrandToCategoryModal.selectBrandInput.value === ""
                ? true
                : false
            }
            type={"submit"}
            className={"primary"}
          >
            إضافة
          </Button>
          <Button onClick={closeAddBrandToCategoryModal}>إغلاق</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default CurrencyExchangeModal;
