import React from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import "./styles.css";
const DatePicker = (props) => {
  return (
    <SemanticDatepicker
      maxDate={new Date()}
      pointing={"right"}
      datePickerOnly
      firstDayOfWeek={6}
      locale={"en-US"}
      actionPosition={"left"}
      showToday={false}
      {...props}
    />
  );
};

export default DatePicker;
