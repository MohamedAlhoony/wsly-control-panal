import React from "react";
import { Card, Grid, Icon, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
const Items = (props) => {
  const history = useHistory();
  if (!props.items) {
    return <div></div>;
  }
  return (
    <>
      <Grid.Column style={{ padding: "0.5rem" }} width={16}>
        <Button
          primary
          icon={"add"}
          // size={"small"}
          onClick={() => {
            history.push(
              `./${props.storeId}/categories/${
                props.categories[props.activeCategoryTab].Id
              }/products/add`
            );
          }}
          content={"إضافة منتج"}
        />
      </Grid.Column>
      {props.items.map((item, key) => {
        return (
          <Grid.Column
            style={{ padding: "0.5rem" }}
            computer={16}
            tablet={4}
            widescreen={16}
            largeScreen={16}
            mobile={8}
            key={key}
          >
            <Card
              style={{ zIndex: 1, width: "100%", height: "100%" }}
              color={props.selectedItem?.Id === item.Id ? "red" : undefined}
              link
              onClick={() => {
                props.handleItemClick(item);
              }}
            >
              <Card.Content>
                <Card.Header>{item.Name}</Card.Header>
                {/* <Card.Meta>Joined in 2016</0Card.Meta> */}
                <Card.Description>
                  {item.Description ? item.Description : "لايوجد وصف"}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                {item.IsAvailable ? (
                  <div>
                    <Icon name="check" />
                    المنتج متاح
                  </div>
                ) : (
                  <div>
                    <Icon name="x" />
                    المنتج غير متاح
                  </div>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        );
      })}
    </>
  );
};

export default Items;
