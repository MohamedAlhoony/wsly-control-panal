import React, { Fragment } from "react";
import {
  Form,
  Grid,
  Input,
  Button,
  TextArea,
  Table,
  Label,
  Tab,
} from "semantic-ui-react";
import { dateFormat } from "../../../../config";
import { Link } from "react-router-dom";
import moment from "moment";
const CurrencyData = (props) => {
  const renderFields = () => {
    const formArray = [];
    for (let elementName in props.brandDetails) {
      formArray.push({
        id: elementName,
        settings: props.brandDetails[elementName],
      });
    }

    return formArray.map((item, i) => {
      return <Fragment key={i}>{renderTemplates(item)}</Fragment>;
    });
  };
  const getSubscriptionBrandsItems = (subscriptionBrandsItems) => {
    if (!subscriptionBrandsItems.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan={5}>لا يوجد إعدادات</Table.Cell>
        </Table.Row>
      );
    }
    return subscriptionBrandsItems.map((item, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{key + 1}</Table.Cell>
          <Table.Cell>
            <Link to={`/subscriptions/${item.Subscription.Id}`}>
              {item.Subscription.Name}
            </Link>
          </Table.Cell>
          <Table.Cell>{item.Rank === -1 ? "لايوجد" : item.Rank}</Table.Cell>
          <Table.Cell>
            {item.IsAvailable ? "ظاهر للمستخدمين" : "غير ظاهر للمستخدمين"}
          </Table.Cell>
          <Table.Cell>
            <Link to={"#"}>{item.CreatedBy.Name}</Link>
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
      case "nameEn":
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
      case "URL":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              control={Input}
              readOnly
              value={values.value}
              {...values.configs}
              action={
                values.value ? (
                  <Button
                    target={"_blank"}
                    as={"a"}
                    href={values.value}
                    content={"عرض"}
                  />
                ) : null
              }
              fluid
            />
          </Grid.Column>
        );
        break;
      case "shortDescription":
      case "longDescription":
      case "shortDescriptionEn":
      case "longDescriptionEn":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              control={TextArea}
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
      case "subscriptionBrands":
        formTemplate = (
          <Grid.Column width={"sixteen"} style={{ padding: "14px" }}>
            <Label content={values.label} pointing={"below"} />
            <Table style={{ marginTop: 0 }} striped celled stackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>البيان</Table.HeaderCell>
                  <Table.HeaderCell>الإشتراك</Table.HeaderCell>
                  <Table.HeaderCell>التصنيف</Table.HeaderCell>
                  <Table.HeaderCell>الحالة</Table.HeaderCell>
                  <Table.HeaderCell>أضيف من قبل</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {getSubscriptionBrandsItems(values.value)}
              </Table.Body>
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

export default CurrencyData;
