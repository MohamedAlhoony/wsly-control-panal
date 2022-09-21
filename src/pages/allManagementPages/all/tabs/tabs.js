import React from "react";
import { Tabs, Tab } from "react-tabs-scrollable";
import { Grid, Message } from "semantic-ui-react";
import "react-tabs-scrollable/dist/rts.css";
import "./mui-tabs.css";
const tabs = (props) => {
  if (!props.categories.length) {
    return <Message color="blue" content={"لايوجد أصناف متاحة"} />;
  }
  return (
    <Tabs
      animationDuration={300}
      selectedAnimationDuration={0}
      hideNavBtnsOnMobile={false}
      isRTL={true}
      activeTab={props.activeCategoryTab}
      onTabClick={(e, newValue) => {
        props.handleCategoryInputValueChange(newValue);
      }}
      // variant="scrollable"
      // scrollButtons={true}
      // value={props.categoryInputValue}
      // onChange={(event, newValue) => {
      // props.handleCategoryInputValueChange(newValue)
      // }}
      // aria-label="icon tabs example"
    >
      {props.categories.map((item, key) => {
        // return <Tab key={key} label={item.Name} />
        return (
          <Tab key={key}>
            <span style={{ fontSize: "1.5rem" }}>{item.Name}</span>
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default tabs;
