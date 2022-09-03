import React, { Fragment, useRef } from "react";
import {
  Form,
  Grid,
  Input,
  Button,
  Label,
  Popup,
  TextArea,
} from "semantic-ui-react";

const FormFields = (props) => {
  const fileInput = useRef(null);
  const renderFields = () => {
    const formArray = [];
    for (let elementName in props.formData) {
      formArray.push({
        id: elementName,
        settings: props.formData[elementName],
      });
    }

    return formArray.map((item, i) => {
      return <Fragment key={i}>{renderTemplates(item)}</Fragment>;
    });
  };
  const readSingleFile = (event) => {
    const reader = new FileReader();
    let imageFile = event.target.files[0];
    if (imageFile) {
      reader.readAsDataURL(imageFile);
      reader.onload = (e) => {
        props.handleFormChange(
          {
            value: imageFile,
            data: e.target.result,
            name: imageFile.name,
            imageId: "",
            path: event.target.value,
          },
          "brandImageFile"
        );
      };
    } else {
      alert("فشلت عملية التحميل للصورة!");
    }
  };
  const handleInputChange = (event, id) => {
    let value;
    if (id === "brandImageFile") {
      value = readSingleFile(event);
      return;
    } else {
      value = event.target.value;
    }
    props.handleFormChange(value, id);
  };

  const renderTemplates = (data) => {
    let formTemplate = "";
    let values = data.settings;
    switch (data.id) {
      case "name":
      case "nameEn":
      case "URL":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              error={
                values.errorMsg !== ""
                  ? {
                      content: values.errorMsg,
                    }
                  : null
              }
              control={Input}
              value={values.value}
              onChange={(event) => handleInputChange(event, data.id)}
              {...values.config}
              label={values.label && values.labelText + ":"}
            />
          </Grid.Column>
        );
        break;
      case "shortDescription":
      case "longDescription":
      case "shortDescriptionEn":
      case "longDescriptionEn":
        formTemplate = (
          <Grid.Column style={{ padding: "14px" }}>
            <Form.Field
              error={
                values.errorMsg !== ""
                  ? {
                      content: values.errorMsg,
                    }
                  : null
              }
              control={TextArea}
              value={values.value}
              onChange={(event) => handleInputChange(event, data.id)}
              {...values.config}
              label={values.label && values.labelText + ":"}
            />
          </Grid.Column>
        );
        break;
      case "brandImageFile":
        formTemplate = (
          <Grid.Column verticalAlign={"bottom"} style={{ padding: "14px" }}>
            <Button.Group fluid>
              {values.value.data && (
                <>
                  <Button
                    icon={"x"}
                    onClick={(e) => {
                      e.preventDefault();
                      props.clearBrandImageFile();
                    }}
                  />
                  <Popup
                    trigger={
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        icon="eye"
                      />
                    }
                    content={
                      values.value.data !== "" ? (
                        <img
                          alt={"brand"}
                          style={{
                            maxWidth: "10rem",
                            maxHeight: "20rem",
                          }}
                          src={values.value.data}
                        />
                      ) : (
                        "لايوجد صورة"
                      )
                    }
                    basic
                    style={{
                      borderRadius: 0,
                      // maxWidth: '10rem',
                      padding: "1em",
                      background: "rgba(0, 0, 0, 0.5)",
                    }}
                    inverted
                  />
                </>
              )}
              <Button
                disabled={props.isUploadingBrandImage}
                loading={props.isUploadingBrandImage}
                dir="ltr"
                size={"large"}
                content={
                  values.value.name === "" ? "تحميل صورة" : values.value.name
                }
                labelPosition="left"
                icon={values.value.name !== "" ? "check" : "picture"}
                onClick={(e) => {
                  e.preventDefault();
                  fileInput.current.click();
                }}
              />
            </Button.Group>
            {values.errorMsg !== "" ? (
              <Label basic color={"red"} pointing={"above"}>
                {values.errorMsg}
              </Label>
            ) : null}

            <input
              ref={fileInput}
              hidden
              value={values.value.path}
              accept={"image/png"}
              {...values.config}
              readOnly
              onChange={(event) => {
                handleInputChange(event, data.id);
              }}
            />
          </Grid.Column>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <Fragment>{renderFields()}</Fragment>;
};

export default FormFields;
