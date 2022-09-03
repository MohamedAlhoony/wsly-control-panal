import React from "react";
import { Menu, Input, Button, Icon, Select } from "semantic-ui-react";
const TopMenu = (props) => {
  return (
    <Menu stackable>
      <Menu.Item>
        <Input
          onChange={(event) =>
            props.handleTopMenuChange(event.target.value, {
              id: "search",
            })
          }
          value={props.search}
          icon="search"
          placeholder="بحث..."
        />
      </Menu.Item>
      <Menu.Item
        fitted={"vertically"}
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          minWidth: "16rem",
        }}
      >
        <Select
          fluid
          onChange={(_, value) => {
            props.handleTopMenuChange(value.value, { id: "filter" });
          }}
          value={props.filter}
          options={[
            { text: "الكل", value: 4, key: 3 },
            {
              text: "الكمية تحت الحد الأدنى للكمية",
              value: 1,
              key: 0,
            },
            { text: "الكمية تحت حد وجوب التوريد", value: 2, key: 1 },
            {
              text: "الكمية تحت الحد الأعلى للكمية",
              value: 3,
              key: 2,
            },
          ]}
        />
      </Menu.Item>
      <Menu.Item position={"right"}>
        <Button
          circular
          content={props.cartLength}
          icon={"in cart"}
          onClick={props.openCartModal}
        />
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
