import React from "react";
import { Segment, Container } from "semantic-ui-react";
import styles from "./styles.module.css";
const PageContainer = (props) => {
  return (
    <Container className={"pageContainer"}>
      <Segment
        style={{
          overflow: "visible",
          minHeight: "calc(100vh - 3.2rem)",
        }}
        basic
        loading={props.loading ? true : false}
      >
        {props.children}
      </Segment>
    </Container>
  );
};

export default PageContainer;
