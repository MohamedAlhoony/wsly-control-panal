import React, { useEffect } from "react";
import * as actions from "../../../actions/allManagementActions/allPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import { Grid, Table, Menu, Button, Icon } from "semantic-ui-react";
import debounce from "lodash.debounce";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";
import Tabs from "./tabs/tabs";
import Preferences from "./preferences/preferences";
import Items from "./items/items";
const All_Page = (props) => {
  const handleCategoryInputValueChange = (index) => {
    props.dispatch({ type: "allPage-activeCategoryTab", data: index });
  };
  useEffect(() => {
    props.dispatch(actions.fetchInitialData({ storeId: props.storeId }));
    return () => {
      props.dispatch({ type: "reset-allPage_reducer" });
    };
  }, []);
  const handleItemClick = (item) => {
    props.dispatch(actions.handleItemClick(item));
  };

  const togglePref = (prefId) => {
    props.dispatch(actions.togglePref(prefId));
  };
  const toggleChoice = (prefId, choiceId) => {
    props.dispatch(actions.toggleChoice(prefId, choiceId));
  };
  const toggleChoiceDefault = (prefId, choiceId) => {
    props.dispatch(actions.toggleChoiceDefault(prefId, choiceId));
  };
  const saveClick = () => {
    props.dispatch(
      actions.submitForm({
        storeId: props.storeId,
      })
    );
  };
  return (
    <PageContainer loading={props.isLoading}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            {!props.isLoading ? (
              <Tabs
                handleCategoryInputValueChange={handleCategoryInputValueChange}
                categories={props.categories}
                activeCategoryTab={props.activeCategoryTab}
              />
            ) : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Items
            selectedItem={props.selectedItem}
            handleItemClick={handleItemClick}
            items={props.categories[props.activeCategoryTab]?.items}
          />
        </Grid.Row>
        <Grid.Row>
          {props.selectedItem !== null ? (
            <Preferences
              saveClick={saveClick}
              toggleChoice={toggleChoice}
              togglePref={togglePref}
              toggleChoiceDefault={toggleChoiceDefault}
              selectedItem={props.selectedItem}
              selectedItemPrefs={props.selectedItemPrefs}
            />
          ) : null}
        </Grid.Row>
      </Grid>
    </PageContainer>
  );
};

export default connect(({ allPage_reducer, layout_reducer }, props) => {
  return {
    storeId: props.match.params.storeId,
    isLoading: allPage_reducer.isLoading,
    categories: allPage_reducer.categories,
    activeCategoryTab: allPage_reducer.activeCategoryTab,
    selectedItemPrefs: allPage_reducer.selectedItemPrefs,
    selectedItem: allPage_reducer.selectedItem,
    // originalPref:allPage_reducer.categories[allPage_reducer.activeCategoryTab]?.items.find((item)=>item.Id===allPage_reducer.selectedItem?.Id)
  };
})(All_Page);
