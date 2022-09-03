import React, { Fragment } from "react";
import { Form, Grid, Input, Button, Table, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { dateFormat } from "../../../../config";
import moment from "moment";
const PricingPlanData = (props) => {
  const renderFields = () => {
    const formArray = [];
    for (let elementName in props.providerDenominationDetails) {
      formArray.push({
        id: elementName,
        settings: props.providerDenominationDetails[elementName],
      });
    }

    return formArray.map((item, i) => {
      return <Fragment key={i}>{renderTemplates(item)}</Fragment>;
    });
  };
  const getCustomFieldsItems = (customFieldsItems) => {
    const customFieldsItemsKeys = Object.keys(customFieldsItems);
    return customFieldsItemsKeys.map((key, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{key}</Table.Cell>
          <Table.Cell>{customFieldsItems[key]}</Table.Cell>
        </Table.Row>
      );
    });
  };
  const renderTemplates = (data) => {
    let formTemplate = "";
    let values = data.settings;
    switch (data.id) {
      case "denominationID":
      case "providerDenominationID":
      case "buyingPrice":
      case "IsStockReplaceActive":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              control={Input}
              readOnly
              value={values.value}
              label={values.label + ":"}
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
      case "denomination":
      case "brand":
      case "provider":
      case "currency":
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
      case "providerMetaData":
        formTemplate = (
          <Grid.Column width={"sixteen"} style={{ padding: "14px" }}>
            <Grid>
              <Grid.Row>
                <Grid.Column mobile={"sixteen"} computer={"ten"}>
                  <Label content={values.label} size={"large"} />
                  <Table style={{ marginTop: 0 }} striped celled stackable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>المفتاح</Table.HeaderCell>
                        <Table.HeaderCell>القيمة</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {getCustomFieldsItems(values.value)}
                    </Table.Body>
                    {!Object.keys(values.value).length && (
                      <Table.Footer>
                        <Table.HeaderCell colSpan={2}>لايوجد</Table.HeaderCell>
                      </Table.Footer>
                    )}
                  </Table>
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
