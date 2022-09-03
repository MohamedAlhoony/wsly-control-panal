import React, { Fragment } from "react";
import {
  Form,
  Grid,
  Input,
  Button,
  Table,
  Label,
  Tab,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { dateFormat } from "../../../../config";
import moment from "moment";
const PricingPlanData = (props) => {
  const renderFields = () => {
    const formArray = [];
    for (let elementName in props.providerDetails) {
      formArray.push({
        id: elementName,
        settings: props.providerDetails[elementName],
      });
    }

    return formArray.map((item, i) => {
      return <Fragment key={i}>{renderTemplates(item)}</Fragment>;
    });
  };
  const getCustomFieldsItems = (customFieldsItems) => {
    return customFieldsItems.map((item, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{key + 1}</Table.Cell>
          <Table.Cell>{item[Object.keys(item)[0]]}</Table.Cell>
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
      case "thresholdViolationTrigger":
      case "balanceNotificationThreshold":
      case "isActive":
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
      case "customFields":
        formTemplate = (
          <Grid.Column
            width={"sixteen"}
            // computer={"twelve"}
            style={{ padding: "14px" }}
          >
            <Grid>
              <Grid.Row>
                <Grid.Column mobile={"sixteen"} computer={"ten"}>
                  <Label content={values.label} size={"large"} />
                  <Table style={{ marginTop: 0 }} striped celled stackable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>البيان</Table.HeaderCell>
                        <Table.HeaderCell>المفتاح</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {getCustomFieldsItems(values.value)}
                    </Table.Body>
                    {!values.value.length && (
                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell colSpan={2}>
                            لا يوجد
                          </Table.HeaderCell>
                        </Table.Row>
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
