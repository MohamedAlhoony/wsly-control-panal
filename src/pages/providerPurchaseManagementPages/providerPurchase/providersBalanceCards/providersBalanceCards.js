import React from "react";
import { Card, Placeholder, Segment } from "semantic-ui-react";
import styles from "./styles.module.css";
const ProvidersBalanceCards = (props) => {
  const getProvidersBalanceCards = () => {
    const placeholder = (
      <Segment raised style={{ minWidth: "8rem" }}>
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length="medium" />
            <Placeholder.Line length="short" />
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    );
    if (!props.providersBalance.length && props.isLoadingProvidersBalance) {
      return new Array(10).fill().map((_, key) => {
        return (
          <Card key={key} color={"teal"} className={styles.card}>
            {placeholder}
          </Card>
        );
      });
    }
    return props.providersBalance.map((provider, key) => {
      return (
        <Card color={"teal"} className={styles.card} key={key}>
          {props.isLoadingProvidersBalance ? (
            placeholder
          ) : (
            <Card.Content>
              <Card.Header>{provider.Name}</Card.Header>
              <Card.Description>
                {provider.Balance.Value} {provider.Balance.Currency.Name}
              </Card.Description>
            </Card.Content>
          )}
        </Card>
      );
    });
  };
  return (
    <Card.Group id={styles.cards_container}>
      {getProvidersBalanceCards()}
    </Card.Group>
  );
};

export default ProvidersBalanceCards;
