import React from "react";
import {
  Form,
  Grid,
  Input,
  Select,
  Table,
  Button,
  Checkbox,
} from "semantic-ui-react";
const BrandSettings = (props) => {
  const rank = props.formData.subscriptionBrandRank.value;
  const isAvailable = props.formData.isSubscriptionBrandAvailable.value;
  const subscription = props.formData.subscription.value;
  const settingsData = Object.assign([], props.subscriptionBrands);
  const updateFieldsData = (value, id) => {
    props.handleFormChange(value, id);
  };
  const handleInputChange = (value, { id }) => {
    updateFieldsData(value, id);
  };
  const isEqualSubscription = (item) => item?.SubscriptionId === subscription;
  const updateSettingsData = (newData) => {
    props.updateSubscriptionBrands(newData);
  };
  const handleDeleteSettingsPress = (e, index) => {
    e.preventDefault();
    settingsData.splice(index, 1);
    updateSettingsData([...settingsData]);
  };
  const handleAddSettingsPress = (e) => {
    e.preventDefault();
    const index = settingsData.findIndex(isEqualSubscription);
    if (index === -1) {
      updateSettingsData([
        ...settingsData,
        {
          SubscriptionId: subscription,
          IsAvailable: isAvailable,
          Rank: rank ? rank : -1,
        },
      ]);
    } else {
      const editedSettingsData = {
        SubscriptionId: subscription,
        IsAvailable: isAvailable,
        Rank: rank ? rank : -1,
      };
      settingsData.splice(index, 1, editedSettingsData);
      updateSettingsData([...settingsData]);
    }
  };
  const getSubscriptionById = (subscriptions, id) => {
    return subscriptions.find(
      (element) => id === element.Id || id === element.SubscriptionId
    );
  };
  const getTableItems = () => {
    if (!settingsData.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan={4}>قم بإضافة إعدادات</Table.Cell>
        </Table.Row>
      );
    }
    return settingsData.map((item, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell width={1}>
            <Button
              size={"tiny"}
              icon={"minus"}
              onClick={(e) => handleDeleteSettingsPress(e, key)}
            />
          </Table.Cell>
          <Table.Cell>
            {getSubscriptionById(props.subscriptions, item.SubscriptionId).Name}
          </Table.Cell>
          <Table.Cell>
            {item.Rank !== -1 ? item.Rank : "التصنيف الإفتراضي (-1)"}
          </Table.Cell>
          <Table.Cell>
            {item.IsAvailable ? "ظاهر للمستخدمين" : "غير ظاهر للمستخدمين"}
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  const getAddButtonConfigs = () => {
    let configs = { icon: "plus", disabled: false };
    if (subscription === "") {
      configs.disabled = true;
      return configs;
    } else {
      const subscriptionObj = getSubscriptionById(settingsData, subscription);
      const rankValue = rank ? rank : -1;
      if (!subscriptionObj) {
        configs.disabled = false;
        return configs;
      } else if (
        subscriptionObj?.Rank === rankValue &&
        subscriptionObj?.IsAvailable === isAvailable
      ) {
        configs.icon = "check";
        configs.disabled = true;
        return configs;
      } else {
        configs.icon = "edit";
        configs.disabled = false;
        return configs;
      }
    }
  };
  return (
    <>
      <Grid.Column width={16}>
        <Table basic stackable>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={1}>
                <Button
                  onClick={handleAddSettingsPress}
                  {...getAddButtonConfigs()}
                  size={"tiny"}
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Field
                  onChange={(_, event) =>
                    handleInputChange(event.value, {
                      id: "subscription",
                    })
                  }
                  {...props.formData.subscription.config}
                  style={{ display: "flex" }}
                  control={Select}
                  value={subscription}
                  options={props.subscriptions.map((item) => {
                    return {
                      text: item.Name,
                      value: item.Id,
                      key: item.Id,
                    };
                  })}
                />
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Form.Field
                    onChange={(event) =>
                      handleInputChange(Number(event.target.value), {
                        id: "subscriptionBrandRank",
                      })
                    }
                    value={rank}
                    {...props.formData.subscriptionBrandRank.config}
                    control={Input}
                  />
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Form.Field
                    onChange={(_, event) => {
                      handleInputChange(event.checked, {
                        id: "isSubscriptionBrandAvailable",
                      });
                    }}
                    checked={isAvailable}
                    slider
                    control={Checkbox}
                    label={
                      isAvailable ? "ظاهر للمستخدمين" : "غير ظاهر للمستخدمين"
                    }
                  />
                </Grid.Column>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Grid.Column>
      <Grid.Column width={16}>
        <Table stackable basic celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>الإشتراك</Table.HeaderCell>
              <Table.HeaderCell>التصنيف</Table.HeaderCell>
              <Table.HeaderCell>الحالة</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{getTableItems()}</Table.Body>
        </Table>
      </Grid.Column>
    </>
  );
};
export default BrandSettings;
