import React, { Fragment } from "react";
import {
  Table,
  Image,
  Select,
  Button,
  Input,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { baseURIImage } from "../../../../../config";
const CartTable = (props) => {
  const getProvidersOptions = (providers) => {
    let options = providers.map((item) => {
      return {
        text: item.Name,
        value: item.Id,
        key: item.Id,
      };
    });
    options.splice(0, 0, {
      text: "المزود الإفتراضي",
      value: -1,
      key: -1,
    });
    return options;
  };
  const getCartItems = () => {
    let brandName = "";
    return props.cart.map((item, key) => {
      const denoRow = (
        <Fragment key={key}>
          {item.Name !== brandName && (
            <Table.Row
              style={{
                fontWeight: "bolder",
                background: "rgba(0,0,0,.05)",
              }}
            >
              <Table.Cell colSpan={4} id={styles.brand_name_cell}>
                <Image
                  spaced={"right"}
                  avatar
                  src={`${baseURIImage}/img/brands/100x100/${item.Id}.png`}
                  alt={item.name}
                />
                <Link to={`/brands/${item.Id}`}>{item.Name}</Link>
              </Table.Cell>
            </Table.Row>
          )}
          <Table.Row>
            <Table.Cell>
              <Link to={`/denominations/${item.Denomination.Id}`}>
                {item.Denomination.Name}
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Input
                type={"number"}
                onChange={(event) =>
                  props.handleCartItemInputChange(event.target.value, item, {
                    id: "selected_quantity",
                  })
                }
                min={0}
                value={item.selected_quantity}
              />
            </Table.Cell>
            <Table.Cell singleLine>
              <Select
                style={{ display: "flex" }}
                onChange={(_, value) => {
                  props.handleCartItemInputChange(value.value, item, {
                    id: "selected_provider",
                  });
                }}
                value={item.selected_provider}
                options={getProvidersOptions(item.Denomination.Providers)}
              />
            </Table.Cell>
            <Table.Cell>
              <Button
                onClick={() => props.handleItemCartButtonPress(item)}
                icon={"trash alternate"}
              />
            </Table.Cell>
          </Table.Row>
        </Fragment>
      );
      brandName = item.Name;
      return denoRow;
    });
  };
  return props.cart.length ? (
    <Table striped stackable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>الفئة</Table.HeaderCell>
          <Table.HeaderCell>الكمية</Table.HeaderCell>
          <Table.HeaderCell>المزود</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{getCartItems()}</Table.Body>
    </Table>
  ) : (
    <Message info header={"السلة فارغة, قم بإضافة مشتريات."} />
  );
};

export default CartTable;
