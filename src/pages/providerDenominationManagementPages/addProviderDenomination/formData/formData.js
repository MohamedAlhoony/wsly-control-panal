import React, { Fragment, useRef } from "react";
import {
  Form,
  Grid,
  Input,
  Select,
  Label,
  Loader,
  Segment,
} from "semantic-ui-react";
const FormFields = (props) => {
  const el = useRef(null);
  const renderFields = () => {
    const formArray = [];
    for (let elementName in props.formData) {
      formArray.push({
        id: elementName,
        settings: props.formData[elementName],
      });
    }

    return formArray.map((item, i) => {
      return <Fragment key={i}>{renderTemplates(item)}</Fragment>;
    });
  };

  const handleInputChange = (event, id) => {
    let value;
    if (["category", "brand", "denomination", "currency"].includes(id)) {
      value = event.value;
    } else {
      value = event.target.value;
    }
    props.handleFormChange(value, id);
  };
  const getCategoriesListItems = (categories) => {
    let getCategoriesListItemsArray = categories.map((item) => {
      return {
        text: item.Name,
        value: item.Id,
        key: item.Id,
      };
    });
    getCategoriesListItemsArray.splice(0, 0, {
      text: "الكل",
      value: -1,
      key: -1,
    });
    return getCategoriesListItemsArray;
  };
  const renderTemplates = (data) => {
    let formTemplate = "";
    let values = data.settings;
    switch (data.id) {
      case "price":
      case "providerDenominationId":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              error={
                values.errorMsg !== ""
                  ? {
                      content: values.errorMsg,
                    }
                  : null
              }
              control={Input}
              value={values.value}
              onChange={(event) => handleInputChange(event, data.id)}
              {...values.config}
              label={values.labelText + ":"}
            />
          </Grid.Column>
        );
        break;

      case "category":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              loading={props.categories.isLoading}
              control={Select}
              {...values.config}
              fluid
              onChange={(_, value) => {
                handleInputChange(value, data.id);
              }}
              label={values.labelText + ":"}
              value={values.value}
              error={
                values.errorMsg !== ""
                  ? {
                      content: values.errorMsg,
                    }
                  : null
              }
              disabled={
                !props.categories.data.length && !props.categories.isLoading
                  ? true
                  : false
              }
              options={getCategoriesListItems(props.categories.data)}
            />
          </Grid.Column>
        );
        break;
      case "brand":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              loading={props.brands.isLoading}
              control={Select}
              {...values.config}
              fluid
              onChange={(_, value) => {
                handleInputChange(value, data.id);
              }}
              label={values.labelText + ":"}
              value={values.value}
              error={
                values.errorMsg !== ""
                  ? {
                      content: values.errorMsg,
                    }
                  : null
              }
              disabled={
                !props.brands.data.length && !props.brands.isLoading
                  ? true
                  : false
              }
              options={props.brands.data.map((item) => {
                return {
                  text: item.Name,
                  value: item.Id,
                  key: item.Id,
                };
              })}
            />
          </Grid.Column>
        );
        break;
      case "denomination":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              loading={props.denominations.isLoading}
              control={Select}
              {...values.config}
              fluid
              onChange={(_, value) => {
                handleInputChange(value, data.id);
              }}
              label={values.labelText + ":"}
              value={values.value}
              error={
                values.errorMsg !== ""
                  ? {
                      content: values.errorMsg,
                    }
                  : null
              }
              disabled={
                !props.denominations.data.length &&
                !props.denominations.isLoading
                  ? true
                  : false
              }
              options={props.denominations.data.map((item) => {
                return {
                  text: item.CardName,
                  value: item.Id,
                  key: item.Id,
                };
              })}
            />
          </Grid.Column>
        );
        break;
      case "currency":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              control={Select}
              {...values.config}
              fluid
              onChange={(_, value) => {
                handleInputChange(value, data.id);
              }}
              label={values.labelText + ":"}
              value={values.value}
              error={
                values.errorMsg !== ""
                  ? {
                      content: values.errorMsg,
                    }
                  : null
              }
              options={props.currencies.map((item) => {
                return {
                  text: item.Name,
                  value: item.Id,
                  key: item.Id,
                };
              })}
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

export default FormFields;
