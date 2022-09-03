import React, { useState } from "react";
import { Modal, Header, Button, Icon, Menu } from "semantic-ui-react";
import PurchasesTable from "./purchasesTable/purchasesTable";
import FailedPurchasesTable from "./failedPurchasesTable/failedPurchasesTable";
import ViolationsTable from "./violationsTable/violationsTable";
const CurrencyExchangeModal = (props) => {
  const [activeMenu, setActiveMenu] = useState("purchases");
  const { closePurchasesModal, purchasingResponse, purchasesModal } = props;
  return (
    <Modal
      onClose={closePurchasesModal}
      open={purchasesModal.show}
      closeOnDimmerClick={false}
      dimmer={"blurring"}
    >
      <Header textAlign={"center"}>
        <Icon color={"green"} name={"check square"} />
        تمت العملية بنجاح
      </Header>

      <Modal.Content>
        <Menu pointing stackable>
          <Menu.Item
            name="البطاقات التي تم شرائها"
            active={activeMenu === "purchases"}
            onClick={() => setActiveMenu("purchases")}
          />
          <Menu.Item
            name="البطاقات التي لم يتم شرائها"
            active={activeMenu === "failedPurchases"}
            onClick={() => setActiveMenu("failedPurchases")}
          />
          <Menu.Item
            name="انتهاكات سعر الشراء"
            active={activeMenu === "violations"}
            onClick={() => setActiveMenu("violations")}
          />
        </Menu>
        {activeMenu === "purchases" && (
          <PurchasesTable
            purchases={purchasingResponse?.Purchases ?? []}
            batchId={purchasingResponse?.BatchId}
            createdDate={purchasingResponse?.CreatedDate}
          />
        )}
        {activeMenu === "failedPurchases" && (
          <FailedPurchasesTable
            failedPurchases={purchasingResponse?.FailedPurchases ?? []}
          />
        )}
        {activeMenu === "violations" && (
          <ViolationsTable violations={purchasingResponse?.Violations ?? []} />
        )}
      </Modal.Content>

      <Modal.Actions>
        <Button
          size={"large"}
          content={"إغلاق"}
          onClick={() => {
            setActiveMenu("purchases");
            closePurchasesModal();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CurrencyExchangeModal;
