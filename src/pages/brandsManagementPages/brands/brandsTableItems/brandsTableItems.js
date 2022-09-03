import React from "react";
import { Table, Dropdown, Icon, Image } from "semantic-ui-react";
import { dateFormat } from "../../../../config";
import moment from "moment";
import { Link } from "react-router-dom";
import { baseURIImage } from "../../../../config";
const BrandsTable = (props) => {
  const getTableItems = (props) => {
    return props.brands.map((brand, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{brand.Id}</Table.Cell>
          <Table.Cell
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Link to={`/brands/${brand.Id}`}>
              <Image
                spaced={"right"}
                avatar
                src={`${baseURIImage}/img/brands/100x100/${brand.ImagePath}`}
                alt={brand.name}
              />
              <span>{brand.Name}</span>
            </Link>
          </Table.Cell>
          <Table.Cell>
            {brand.IsAvailable ? "ظاهرة للمستخدمين" : "غير ظاهرة للمستخدمين"}
          </Table.Cell>

          <Table.Cell dir={"ltr"}>
            {moment.utc(brand.CreatedDate).local().format(dateFormat)}
          </Table.Cell>
          <Table.Cell>
            <Link to={"#"}>{brand.CreatedBy.Name}</Link>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/brands/${brand.Id}/denominations`}>عرض الفئات</Link>
          </Table.Cell>
          <Table.Cell width={"1"}>
            <Dropdown icon={<Icon name={"ellipsis horizontal"} fitted />}>
              <Dropdown.Menu direction={"left"}>
                <Dropdown.Item
                  to={`/brands/${brand.Id}/update`}
                  as={Link}
                  text={"تعديل البيانات"}
                  icon={"edit"}
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

export default BrandsTable;
