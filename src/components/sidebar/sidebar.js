import React from "react";
import { Icon, Menu, Sidebar } from "semantic-ui-react";
import SidebarItems from "./sideBarItems/sideBarItems";

const MovingSideBar = (props) => {
  const items = [
    {
      headerName: "المطاعم",
      items: [{ name: "المطاعم", path: "/", icon: "marker" }],
    },
    // {
    //   headerName: "العملات",
    //   items: [
    //     {
    //       name: "إدارة العملات",
    //       path: "/currencies",
    //       icon: "currency",
    //     },
    //   ],
    // },
    // {
    //   headerName: "إدارة الأسعار",
    //   items: [
    //     {
    //       name: "إدارة خطط التسعير",
    //       path: "/pricing-plans",
    //       icon: "currency",
    //     },
    //     {
    //       name: "إدارة الإشتراكات",
    //       path: "/subscriptions",
    //       icon: "chain",
    //     },
    //   ],
    // },
    // {
    //   headerName: "الأصناف والعلامات التجارية",
    //   items: [
    //     {
    //       name: "إدارة الأصناف",
    //       path: "/categories",
    //       icon: "database",
    //     },
    //     {
    //       name: "إدارة العلامات التجارية",
    //       path: "/brands",
    //       icon: "google play",
    //     },
    //   ],
    // },
    // {
    //   headerName: "إدارةالمخزون",
    //   items: [
    //     {
    //       name: "إدارة الدفعات",
    //       path: "/batches",
    //       icon: "warehouse",
    //     },
    //     {
    //       name: "الشراء",
    //       path: "/purchase",
    //       icon: "cart",
    //     },
    //   ],
    // },
    // {
    //   headerName: "المزودين",
    //   items: [
    //     {
    //       name: "إدارة المزودين",
    //       path: "/providers",
    //       icon: "users",
    //     },
    //   ],
    // },
    // {
    //   headerName: "المستخدمين",
    //   items: [
    //     {
    //       name: "إدارة المستخدمين",
    //       path: "/managers",
    //       icon: "users",
    //     },
    //   ],
    // },
    // {
    //   headerName: "إدارة التقارير",
    //   items: [
    //     {
    //       name: "تقرير المبيعات",
    //       path: "/reports/sales",
    //       icon: "newspaper",
    //     },
    //     {
    //       name: "تقرير المشتريات من المزود",
    //       path: "/reports/provider-purchases",
    //       icon: "newspaper",
    //     },
    //     {
    //       name: "تقرير مشتريات زبون",
    //       path: "/reports/customer-purchases",
    //       icon: "newspaper",
    //     },
    //     {
    //       name: "تقرير بطاقات زبون",
    //       path: "/reports/customer-purchased-cards",
    //       icon: "newspaper",
    //     },
    //     {
    //       name: "الكشف عن بطاقة",
    //       path: "/reports/voucher",
    //       icon: "newspaper",
    //     },
    //     {
    //       name: "تقرير الكميات",
    //       path: "/reports/quantity",
    //       icon: "newspaper",
    //     },
    //     {
    //       name: "تقرير مخزون المزود",
    //       path: "/reports/provider-storage",
    //       icon: "newspaper",
    //     },
    //     {
    //       name: "تقرير شحن الأرصدة",
    //       path: "/reports/provider-topups",
    //       icon: "newspaper",
    //     },
    //   ],
    // },
  ];
  return (
    <Sidebar
      as={Menu}
      visible={props.isSideBarOpen}
      target={props.emptyRef}
      animation={props.isToggleAllowed ? "overlay" : "push"}
    >
      <Menu
        vertical
        compact
        borderless
        fluid
        fixed={"top"}
        style={{ boxShadow: "none", borderBottom: "none" }}
      >
        {props.isToggleAllowed ? (
          <Menu.Header>
            <Menu.Item
              icon={<Icon fitted name={"bars"} />}
              onClick={() => {
                props.setIsSideBarOpen(!props.isSideBarOpen);
              }}
              content={"إغلاق"}
            />
          </Menu.Header>
        ) : null}
        <Menu.Item>
          <span
            style={{
              fontSize: "1.6rem",
              fontWeight: "bolder",
            }}
          >
            iStore Managment
          </span>
        </Menu.Item>
        <SidebarItems
          hideSideBar={() => {
            props.setIsSideBarOpen(false);
          }}
          items={items}
        />
      </Menu>
    </Sidebar>
  );
};

export default MovingSideBar;
