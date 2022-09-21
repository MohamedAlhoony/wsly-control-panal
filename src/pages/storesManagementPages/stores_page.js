import React, { useEffect } from "react";
import * as actions from "../../actions/storesManagementActions/storesPage-actions";
import { connect } from "react-redux";
import {
  Segment,
  Button,
  Table,
  Loader,
  Label,
  Card,
  Image,
  Icon,
  Header,
} from "semantic-ui-react";
import PageContainer from "../../components/pageContainer/pageContainer";
import { Link } from "react-router-dom";

const Stores_page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.categoryID));
    return () => {
      props.dispatch({ type: "reset-storesPage_reducer" });
    };
  }, []);
  return (
    <Segment
      loading={props.isLoading}
      style={{ height: "100vh", backgroundColor: "transparent" }}
    >
      {/* <Header
        as="h2"
        content="قائمة المطاعم الخاصة بك"
        subheader="Manage your account settings and set email preferences"
      /> */}
      <Card.Group centered style={{ marginTop: "2rem" }}>
        {props.stores.map((store, key) => {
          return (
            <Card
              color="red"
              link
              onClick={() => props.history.replace(`/stores/${store.StoreID}`)}
              style={{ maxWidth: "20rem" }}
              raised
              key={key}
            >
              <Image
                src="https://onemorethairestaurant.com/img/placeholders/grey_fork_and_knife.png"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>{store.StoreName}</Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description>{store.Description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                {store.IsOpen ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    مفتوح &nbsp;
                    <Icon color="green" name="check square outline" />
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    مغلق &nbsp;
                    <Icon color="red" name="window close outline" />
                  </div>
                )}
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </Segment>
  );
};

export default connect(({ storesPage_reducer }, props) => {
  return {
    stores: storesPage_reducer.stores,
    isLoading: storesPage_reducer.isLoading,
  };
})(Stores_page);
