import React, { Fragment } from "react";
import { Form, Grid, Input, Label, Button } from "semantic-ui-react";
import { dateFormat } from "../../../../config";
import { Link } from "react-router-dom";
import moment from "moment";
const SubscriptionData = (props) => {
  const renderFields = () => {
    const formArray = [];
    for (let elementName in props.subscriptionDetails) {
      formArray.push({
        id: elementName,
        settings: props.subscriptionDetails[elementName],
      });
    }

    return formArray.map((item, i) => {
      return <Fragment key={i}>{renderTemplates(item)}</Fragment>;
    });
  };

  const renderTemplates = (data) => {
    let formTemplate = "";
    let values = data.settings;
    switch (data.id) {
      case "name":
      case "nameEn":
      case "code":
      case "codeEn":
      case "symbol":
      case "id":
      case "exchangeValue":
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
              dir={"ltr"}
              value={moment.utc(values.value).local().format(dateFormat)}
              label={values.label + ":"}
            />
          </Grid.Column>
        );
        break;
      case "createdBy":
      case "wallet":
      case "currency":
      case "priceEffectiveCurrency":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              control={Input}
              readOnly
              dir={"ltr"}
              value={
                data.id !== "wallet" ? values.value : values.value.WalletNumber
              }
              label={values.label + ":"}
              action={<Button as={Link} to={values.link} content={"عرض"} />}
              fluid
            />
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

export default SubscriptionData;
