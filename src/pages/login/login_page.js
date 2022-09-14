import React, { useEffect } from "react";
import * as actions from "../../actions/loginPage-actions";
import auth from "../../auth";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Form,
  Button,
  Icon,
  Header,
  Input,
  Segment,
} from "semantic-ui-react";
import styles from "./styles.module.css";
const Login_Page = (props) => {
  useEffect(() => {
    if (auth.isAuthenticated()) {
      props.history.push("/");
    }
  }, []);
  // dispatch({type:'',data:""})
  const handleInputChange = (event, meta) => {
    if (props[meta.id].errorMsg !== "") {
      props.dispatch({
        type: `loginPage-${meta.id}-errorMsg`,
        data: { id: meta.id, value: "" },
      });
    }
    props.dispatch({
      type: `loginPage-${meta.id}-value`,
      data: { id: meta.id, value: event.target.value },
    });
  };

  const redirect = () => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
  };
  const submitForm = (event) => {
    event.preventDefault();
    props
      .dispatch(actions.login())
      .then((res) => {
        redirect(res);
      })
      .catch(() => {
        console.log("login error");
      });
  };

  return (
    <Container className={styles.container} style={{ height: "100%" }}>
      <Grid style={{ height: "100%" }} verticalAlign={"middle"} centered={true}>
        <Grid.Row style={{ maxWidth: "500px" }}>
          <Grid.Column width={16}>
            <Header as={"h1"} textAlign={"center"}>
              Istore
            </Header>
            <Form
              loading={props.isLoading}
              onSubmit={submitForm}
              size={"large"}
            >
              <Form.Field error={props.email.errorMsg === "" ? false : true}>
                <label>اسم المستخدم:</label>
                <Input
                  icon={<Icon name={"user"} />}
                  value={props.email.value}
                  onChange={(event) =>
                    handleInputChange(event, {
                      id: "email",
                    })
                  }
                />
              </Form.Field>
              <Form.Field error={props.password.errorMsg === "" ? false : true}>
                <label>كلمة السر:</label>
                <Input
                  icon={<Icon name={"lock"} />}
                  type={"password"}
                  value={props.password.value}
                  onChange={(event) =>
                    handleInputChange(event, {
                      id: "password",
                    })
                  }
                />
              </Form.Field>
              <Button fluid className={"primary"} size={"large"} type="submit">
                تسجيل الدخول
              </Button>
            </Form>
            {props.generalErrorMsg !== "" ? (
              <Segment color={"red"} style={{ color: "red" }}>
                <ul>
                  حدث خطأ
                  <li>تأكد من اسم المستخدم</li>
                  <li>تأكد من كلمة السر</li>
                  <li>تأكد من اتصالك بالانترنت</li>
                </ul>
              </Segment>
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default connect(({ loginPage_reducer }) => {
  return {
    email: loginPage_reducer.email,
    password: loginPage_reducer.password,
    generalErrorMsg: loginPage_reducer.generalErrorMsg,
    isLoading: loginPage_reducer.isLoading,
  };
})(Login_Page);
