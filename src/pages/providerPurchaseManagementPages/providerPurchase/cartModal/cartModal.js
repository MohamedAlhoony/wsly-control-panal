import React from "react";
import { Modal, Header, Button, Icon, Label, Segment } from "semantic-ui-react";
import CartTable from "./cartTable/cartTable";
const CurrencyExchangeModal = (props) => {
  const {
    closeCartModal,
    cart,
    cartModal,
    handleItemCartButtonPress,
    handleCartItemInputChange,
  } = props;
  return (
    <Modal
      onClose={closeCartModal}
      open={cartModal.show}
      closeOnDimmerClick={false}
      dimmer={"blurring"}
    >
      <Header textAlign={"center"}>
        <Icon name={"cart"} />
        سلة المشتريات
      </Header>

      <Modal.Content>
        {cartModal.isLoading ? (
          <Segment loading={true} basic />
        ) : (
          <>
            {cart.length ? (
              <Label circular content={`عدد عناصر السلة: ${cart.length}`} />
            ) : null}
            <CartTable
              handleCartItemInputChange={handleCartItemInputChange}
              handleItemCartButtonPress={handleItemCartButtonPress}
              cart={cart}
            />
          </>
        )}
      </Modal.Content>
      {!cartModal.isLoading ? (
        <Modal.Actions>
          {cart.length ? (
            <Button
              onClick={() => {
                props.purchase();
              }}
              size={"large"}
              className={"primary"}
              content={"شراء"}
            />
          ) : null}
          <Button size={"large"} content={"إغلاق"} onClick={closeCartModal} />
        </Modal.Actions>
      ) : null}
    </Modal>
  );
};

export default CurrencyExchangeModal;
