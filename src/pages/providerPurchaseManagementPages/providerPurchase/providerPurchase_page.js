import React, { useEffect } from "react";
import * as actions from "../../../actions/providerPurchaseManagementActions/providerPurchasePage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import DenominationsTableItems from "./denominationsTableItems/denominationsTableItems";
import {
  Table,
  Segment,
  Label,
  Accordion,
  Icon,
  Button,
} from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import debounce from "lodash.debounce";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";
import CartModal from "./cartModal/cartModal";
import PurchasesModal from "./purchasesModal/purchasesModal";
import ProvidersBalanceCards from "./providersBalanceCards/providersBalanceCards";
let updateTableData;
const _updateTableData = debounce(() => {
  updateTableData();
}, 700);
const ProviderDenominations_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData());
    return () => {
      props.dispatch({ type: "reset-providerPurchasePage_reducer" });
    };
  }, []);
  updateTableData = () => {
    props.dispatch(actions.getAvailableToPurchaseDenominations());
  };

  const handleTopMenuChange = (value, meta) => {
    props.dispatch({
      type: `providerPurchasePage-${meta.id}`,
      data: value,
    });
    if (meta.id === "search" && value.trim() !== props.search.trim()) {
      _updateTableData();
    } else if (meta.id !== "search") {
      updateTableData();
    }
  };
  const confirmedPurchase = () => {
    props.dispatch(actions.purchase());
  };
  let confirmedFunction;
  const purchase = () => {
    confirmedFunction = () => {
      confirmedPurchase();
    };
    props.dispatch(
      confirmDialog({
        show: true,
      })
    );
  };
  const handleItemCartButtonPress = (item) => {
    props.dispatch(actions.handleItemCartButtonPress(item));
  };
  const handleCartItemInputChange = (value, item, meta) => {
    props.dispatch(actions.handleCartItemInputChange(value, item, meta.id));
  };
  const sortTable = (column) => {
    props.dispatch(actions.denominationsSortBy(column));
  };
  const closeCartModal = () => {
    props.dispatch(actions.cartModal({ show: false }));
  };
  const closePurchasesModal = () => {
    props.dispatch(actions.purchasesModal({ show: false }));
  };
  const openCartModal = () => {
    props.dispatch(actions.cartModal({ show: true }));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
      <PurchasesModal
        purchasingResponse={props.purchasingResponse}
        purchasesModal={props.purchasesModal}
        closePurchasesModal={closePurchasesModal}
      />
      <CartModal
        purchase={purchase}
        handleCartItemInputChange={handleCartItemInputChange}
        handleItemCartButtonPress={handleItemCartButtonPress}
        cart={props.cart}
        closeCartModal={closeCartModal}
        cartModal={props.cartModal}
      />
      <Accordion>
        <Accordion.Title
          active={props.showProvidersBalance}
          onClick={() => {
            props.dispatch({
              type: "providerPurchasePage-showProvidersBalance",
              data: !props.showProvidersBalance,
            });
          }}
        >
          <Icon name="dropdown" />
          عرض الأرصدة
        </Accordion.Title>
        {props.showProvidersBalance && (
          <Button
            size={"tiny"}
            onClick={() => props.dispatch(actions.refreshProvidersBalance())}
            icon={"refresh"}
          />
        )}
        <Accordion.Content active={props.showProvidersBalance}>
          <ProvidersBalanceCards
            isLoadingProvidersBalance={props.isLoadingProvidersBalance}
            providersBalance={props.providersBalance}
          />
        </Accordion.Content>
      </Accordion>
      <TopMenu
        openCartModal={openCartModal}
        cartLength={props.cart.length}
        providerID={props.providerID}
        handleTopMenuChange={handleTopMenuChange}
        search={props.search}
        filter={props.filter}
      />
      {!props.isLoadingDenominations ? (
        <>
          <Label
            circular
            content={`عدد النتائج: ${props.denominations.length}`}
          />
          <Table stackable striped celled sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={
                    props.tableSorting.column === "brand_name"
                      ? props.tableSorting.direction
                      : null
                  }
                  onClick={() => {
                    sortTable("brand_name");
                  }}
                >
                  العلامة التجارية
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    props.tableSorting.column === "deno_name"
                      ? props.tableSorting.direction
                      : null
                  }
                  onClick={() => {
                    sortTable("deno_name");
                  }}
                >
                  الفئة
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    props.tableSorting.column === "quantity"
                      ? props.tableSorting.direction
                      : null
                  }
                  onClick={() => {
                    sortTable("quantity");
                  }}
                >
                  الكمية
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    props.tableSorting.column === "max_quantity"
                      ? props.tableSorting.direction
                      : null
                  }
                  onClick={() => {
                    sortTable("max_quantity");
                  }}
                >
                  الحد الأعلى للكمية
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    props.tableSorting.column === "min_quantity"
                      ? props.tableSorting.direction
                      : null
                  }
                  onClick={() => {
                    sortTable("min_quantity");
                  }}
                >
                  الحد الأدنى للكمية
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    props.tableSorting.column === "supply_quantity"
                      ? props.tableSorting.direction
                      : null
                  }
                  onClick={() => {
                    sortTable("supply_quantity");
                  }}
                >
                  حد وجوب التوريد
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    props.tableSorting.column === "number_of_requests"
                      ? props.tableSorting.direction
                      : null
                  }
                  onClick={() => {
                    sortTable("number_of_requests");
                  }}
                >
                  عدد الطلبات
                </Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <DenominationsTableItems
                getCartItemIndex={(denoID) =>
                  actions.getCartItemIndex(denoID, props.cart)
                }
                cart={props.cart}
                handleItemCartButtonPress={handleItemCartButtonPress}
                denominations={props.denominations}
              />
            </Table.Body>
            {!props.denominations.length && (
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan={8}>لا يوجد نتائج</Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            )}
          </Table>
        </>
      ) : (
        <Segment basic loading={true} />
      )}
    </PageContainer>
  );
};

export default connect(({ providerPurchasePage_reducer }, props) => {
  return {
    denominations: providerPurchasePage_reducer.denominations,
    isLoading: providerPurchasePage_reducer.isLoading,
    providerID: props.match.params.providerID,
    filteredDenominations: providerPurchasePage_reducer.filteredDenominations,
    search: providerPurchasePage_reducer.search,
    filter: providerPurchasePage_reducer.filter,
    providerName: providerPurchasePage_reducer.providerDetails?.Name,
    tableSorting: providerPurchasePage_reducer.tableSorting,
    isLoadingDenominations: providerPurchasePage_reducer.isLoadingDenominations,
    cart: providerPurchasePage_reducer.cart,
    cartModal: providerPurchasePage_reducer.cartModal,
    purchasesModal: providerPurchasePage_reducer.purchasesModal,
    purchasingResponse: providerPurchasePage_reducer.purchasingResponse,
    providersBalance: providerPurchasePage_reducer.providersBalance,
    showProvidersBalance: providerPurchasePage_reducer.showProvidersBalance,
    isLoadingProvidersBalance:
      providerPurchasePage_reducer.isLoadingProvidersBalance,
  };
})(ProviderDenominations_Page);
