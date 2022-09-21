import React from "react";
import { Card, Grid, Icon } from "semantic-ui-react";
const Items = (props) => {
  if (!props.items) {
    return <div></div>;
  }
  return (
    <>
      {props.items.map((item, key) => {
        return (
          <Grid.Column computer={4} mobile={8} key={key}>
            <Card
              style={{ zIndex: 1 }}
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
