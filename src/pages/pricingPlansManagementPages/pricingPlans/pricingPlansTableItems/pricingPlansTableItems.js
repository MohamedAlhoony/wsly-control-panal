import React from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import { dateFormat } from "../../../../config";
import moment from "moment";
import { Link } from "react-router-dom";
const CustomersTable = (props) => {
  const getTableItems = (props) => {
    return props.pricingPlans.map((plan, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{plan.Id}</Table.Cell>
          <Table.Cell>
            <Link to={`/pricing-plans/${plan.Id}`}>{plan.Name}</Link>
          </Table.Cell>
          {/* <Table.Cell>
                        {plan.IsActive ? 'مفعل' : 'غير مفعل'}
                    </Table.Cell> */}
          <Table.Cell dir={"ltr"}>
            {moment.utc(plan.CreatedDate).local().format(dateFormat)}
          </Table.Cell>
          <Table.Cell>
            <Link to={"#"}>{plan.CreatedBy.Name}</Link>
          </Table.Cell>
          <Table.Cell width={"1"}>
            <Dropdown icon={<Icon name={"ellipsis horizontal"} fitted />}>
              <Dropdown.Menu direction={"left"}>
                <Dropdown.Item
                  to={`/pricing-plans/${plan.Id}/update`}
                  as={Link}
                  text={"تعديل البيانات"}
                  icon={"edit"}
                />
                <Dropdown.Divider />
                <Dropdown.Item
                  // disabled={plan.IsActive}
                  icon={"level up"}
                  text={"تنفيذ خطة التسعير"}
                  onClick={() => props.executePricingPlan(plan)}
                />
                <Dropdown.Item
                  // disabled={plan.IsActive}
                  icon={"trash alternate"}
                  text={"حذف خطة التسعير"}
                  onClick={() => props.removePricingPlan(plan)}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default CustomersTable;
