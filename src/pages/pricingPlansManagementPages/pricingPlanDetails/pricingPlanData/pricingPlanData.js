import React, { Fragment } from "react";
import { Form, Grid, Input, Button, Table, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { dateFormat } from "../../../../config";
import moment from "moment";
const PricingPlanData = (props) => {
  const renderFields = () => {
    const formArray = [];
    for (let elementName in props.pricingPlanDetails) {
      formArray.push({
        id: elementName,
        settings: props.pricingPlanDetails[elementName],
      });
    }

    return formArray.map((item, i) => {
      return <Fragment key={i}>{renderTemplates(item)}</Fragment>;
    });
  };
  const getPricingPlanItems = (pricingPlanItems) => {
    return pricingPlanItems.map((item, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{key + 1}</Table.Cell>
          <Table.Cell>
            <Link to={`/brands/${item.Brand.Id}`}>{item.Brand.Name}</Link>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/denominations/${item.Brand.Denomination.Id}`}>
              {item.Brand.Denomination.Name}
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/subscriptions/${item.Subscription.Id}`}>
              {item.Subscription.Name}
            </Link>
          </Table.Cell>
          <Table.Cell>{item.Price}</Table.Cell>
          <Table.Cell>{item.RatePrice ?? "لايوجد"}</Table.Cell>
          <Table.Cell>
            {item.IsAvailable ? " ظاهر للمستخدمين" : "غير ظاهر للمستخدمين"}
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  const renderTemplates = (data) => {
    let formTemplate = "";
    let values = data.settings;
    switch (data.id) {
      case "name":
      case "ID":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              control={Input}
              readOnly
              value={values.value}
              label={values.label + ":"}
              dir={data.id === "phoneNumber" ? "ltr" : "rtl"}
            />
          </Grid.Column>
        );
        break;
      case "createdDate":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              control={Input}
              readOnly
              value={moment.utc(values.value).local().format(dateFormat)}
              label={values.label + ":"}
              dir={"ltr"}
            />
          </Grid.Column>
        );
        break;
      case "createdBy":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              control={Input}
              readOnly
              dir={"ltr"}
              value={values.value}
              label={values.label + ":"}
              action={<Button as={Link} to={values.link} content={"عرض"} />}
              fluid
            />
          </Grid.Column>
        );
        break;
      case "pricingPlanEntries":
        formTemplate = (
          <Grid.Column width={"sixteen"} style={{ padding: "14px" }}>
            <Label content={values.label} pointing={"below"} />
            <Table style={{ marginTop: 0 }} striped celled stackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>البيان</Table.HeaderCell>
                  <Table.HeaderCell>العلامة التجارية</Table.HeaderCell>
                  <Table.HeaderCell>الفئة</Table.HeaderCell>
                  <Table.HeaderCell>اللإشتراك</Table.HeaderCell>
                  <Table.HeaderCell>السعر</Table.HeaderCell>
                  <Table.HeaderCell>السعر النسبي</Table.HeaderCell>
                  <Table.HeaderCell>الحالة</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{getPricingPlanItems(values.value)}</Table.Body>
            </Table>
          </Grid.Column>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <Fragment>{renderFields()}</Fragment>;
};

export default PricingPlanData;
