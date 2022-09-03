import React, { Fragment } from "react";
import { Table, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { dateFormat } from "../../../../../config";
import moment from "moment";
const PurchasesTable = (props) => {
  const getPurchasesItems = () => {
    return props.purchases.map((purchase, purchaseKey) => {
      return (
        <Fragment key={purchaseKey}>
          {purchase.Transactions.map((transaction, transactionKey) => {
            return transaction.Items.map((item, itemKey) => {
              return (
                <Fragment key={itemKey}>
                  {transactionKey === 0 && itemKey === 0 && (
                    <Table.Row>
                      <Table.Cell
                        className={styles.provider_name_cell}
                        colSpan={4}
                      >
                        <Label
                          as={Link}
                          to={`/providers/${purchase.Provider.Id}`}
                          tag
                          size={"large"}
                          content={purchase.Provider.Name}
                        />
                      </Table.Cell>
                    </Table.Row>
                  )}
                  {itemKey === 0 && (
                    <Table.Row>
                      <Table.Cell
                        className={styles.transaction_No_cell}
                        colSpan={4}
                      >
                        <Label
                          basic
                          content={`معرف العملية لدى المزود: 
                        ${transaction.ProviderReferenceId}`}
                        />
                        <Label
                          basic
                          content={`الإجمالي المدفوع: ${transaction.TotalPaid}`}
                        />
                      </Table.Cell>
                    </Table.Row>
                  )}
                  <Table.Row key={itemKey}>
                    <Table.Cell>
                      <Link to={`/brands/${item.Denomination.Barnd.Id}`}>
                        {item.Denomination.Barnd.Name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/denominations/${item.Denomination.Id}`}>
                        {item.Denomination.Name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{item.Quantity}</Table.Cell>
                    <Table.Cell>{item.BuyPrice}</Table.Cell>
                  </Table.Row>
                </Fragment>
              );
            });
          })}
        </Fragment>
      );
    });
  };
  return (
    <>
      {props.batchId && (
        <Label
          tag
          as={Link}
          to={`/batches/${props.batchId}/cards`}
          content={`معرف الدفعة: ${props.batchId}`}
        />
      )}
      {props.createdDate && (
        <Label
          basic
          content={moment.utc(props.createdDate).local().format(dateFormat)}
        />
      )}
      <Table striped stackable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>العلامة التجارية</Table.HeaderCell>
            <Table.HeaderCell>الفئة</Table.HeaderCell>
            <Table.HeaderCell>الكمية</Table.HeaderCell>
            <Table.HeaderCell>السعر</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{getPurchasesItems()}</Table.Body>
        {!props.purchases.length && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={4}>لايوجد</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </>
  );
};

export default PurchasesTable;
