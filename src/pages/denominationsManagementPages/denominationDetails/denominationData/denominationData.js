import React, { Fragment } from "react";
import { Form, Grid, Input, Button } from "semantic-ui-react";
import { dateFormat } from "../../../../config";
import { Link } from "react-router-dom";
import moment from "moment";
const DenominationData = (props) => {
  const renderFields = () => {
    const formArray = [];
    for (let elementName in props.denominationDetails) {
      formArray.push({
        id: elementName,
        settings: props.denominationDetails[elementName],
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
      case "cardName":
      case "cardNameEn":
      case "shortName":
      case "shortNameEn":
      case "minimumQuantityLimit":
      case "maximumQuantityLimit":
      case "supplyLimit":
      case "isAvailable":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              control={Input}
              readOnly
              value={values.value}
              {...values.configs}
            />
          </Grid.Column>
        );
        break;
      case "createdDate":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              control={Input}
              {...values.configs}
              value={moment.utc(values.value).local().format(dateFormat)}
            />
          </Grid.Column>
        );
        break;
      case "createdBy":
      case "region":
      case "brand":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              control={Input}
              value={values.value}
              {...values.configs}
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

export default DenominationData;
