import { combineReducers } from "redux";
import loginPage_reducer from "./loginPage-reducer";
import layout_reducer from "./layout";

import customersPage_reducer from "./customersManagementReducers/customersPage-reducer";
import registerCustomerPage_reducer from "./customersManagementReducers/registerCustomerPage-reducer";
import updateCustomerPage_reducer from "./customersManagementReducers/updateCustomerPage-reducer";
import customerDetailsPage_reducer from "./customersManagementReducers/customerPageDetails-reducer";

import currenciesPage_reducer from "./currenciesManagementReducers/currenciesPage-reducer";
import addCurrencyPage_reducer from "./currenciesManagementReducers/addCurrencyPage-reducer";
import updateCurrencyPage_reducer from "./currenciesManagementReducers/updateCurrencyPage-reducer";
import currencyDetailsPage_reducer from "./currenciesManagementReducers/currencyPageDetails-reducer";

import subscriptionsPage_reducer from "./subscriptionsManagementReducers/subscriptionsPage-reducer";
import addSubscriptionPage_reducer from "./subscriptionsManagementReducers/addSubscriptionPage-reducer";
import updateSubscriptionPage_reducer from "./subscriptionsManagementReducers/updateSubscriptionPage-reducer";
import subscriptionDetailsPage_reducer from "./subscriptionsManagementReducers/subscriptionPageDetails-reducer";

import subscriptionDenominationsPage_reducer from "./subscriptionsManagementReducers/denominations/denominationsPage-reducer";
import addSubscriptionDenominationPage_reducer from "./subscriptionsManagementReducers/denominations/addDenominationPage-reducer";
import updateSubscriptionDenominationPage_reducer from "./subscriptionsManagementReducers/denominations/updateDenominationPage-reducer";

import batchesPage_reducer from "./inventoryManagementReducers/batchesManagementReducers/batchesPage-reducer";
import batchCardsPage_reducer from "./inventoryManagementReducers/batchesManagementReducers/batchCardsPage-reducer";
import createBatchPage_reducer from "./inventoryManagementReducers/batchesManagementReducers/createBatchPage-reducer";

import pricingPlansPage_reducer from "./pricingPlansManagementReducers/pricingPlansPage-reducer";
import createPricingPlanPage_reducer from "./pricingPlansManagementReducers/createPricingPlanPage-reducer";
import pricingPlanDetailsPage_reducer from "./pricingPlansManagementReducers/pricingPlanDetailsPage-reducer";
import updatePricingPlanPage_reducer from "./pricingPlansManagementReducers/updatePricingPlanPage-reducer";

import brandsPage_reducer from "./brandsManagementReducers/brandsPage-reducer";
import createBrandPage_reducer from "./brandsManagementReducers/createBrandPage-reducer";
import brandDetailsPage_reducer from "./brandsManagementReducers/brandPageDetails-reducer";
import updateBrandPage_reducer from "./brandsManagementReducers/updateBrandPage-reducer";

import categoriesPage_reducer from "./categoriesManagementReducers/categoriesPage-reducer";
import createCategoryPage_reducer from "./categoriesManagementReducers/createCategoryPage-reducer";
import categoryDetailsPage_reducer from "./categoriesManagementReducers/categoryPageDetails-reducer";
import updateCategoryPage_reducer from "./categoriesManagementReducers/updateCategoryPage-reducer";
import categoryBrandsPage_reducer from "./categoryBrandsManagementReducer/categoryBrandsPage-reducer";

import denominationsPage_reducer from "./denominationsManagementReducers/denominationsPage-reducer";
import createDenominationPage_reducer from "./denominationsManagementReducers/createDenominationPage-reducer";
import denominationDetailsPage_reducer from "./denominationsManagementReducers/denominationPageDetails-reducer";
import updateDenominationPage_reducer from "./denominationsManagementReducers/updateDenominationPage-reducer";

import providersPage_reducer from "./providersManagementReducers/providersPage-reducer";
import createProviderPage_reducer from "./providersManagementReducers/createProviderPage-reducer";
import providerDetailsPage_reducer from "./providersManagementReducers/providerDetailsPage-reducer";
import updateProviderPage_reducer from "./providersManagementReducers/updateProviderPage-reducer";

import providerDenominationsPage_reducer from "./providerDenominationManagement/providerDenominationsPage-reducer";
import addProviderDenominationPage_reducer from "./providerDenominationManagement/addProviderDenominationPage-reducer";
import providerDenominationDetailsPage_reducer from "./providerDenominationManagement/providerDenominationDetailsPage-reducer";
import updateProviderDenominationPage_reducer from "./providerDenominationManagement/updateProviderDenominationPage-reducer";

import providerPurchasePage_reducer from "./providerPurchaseManagementReducers/providerPurchasePage-reducer";

import salesReportPage_reducer from "./reportsManagementReducers/salesReport-reducer";
import providerPurchasesReportPage_reducer from "./reportsManagementReducers/providerPurchasesReport-reducer";
import customerPurchasesReportPage_reducer from "./reportsManagementReducers/customerPurchasesReport-reducer";
import customerPurchasedCardsReportPage_reducer from "./reportsManagementReducers/customerPurchasedCardsReport-reducer";
import voucherReportPage_reducer from "./reportsManagementReducers/voucherReport-reducer";
import quantityReportPage_reducer from "./reportsManagementReducers/quantityReport-reducer";
import providerStorageReportPage_reducer from "./reportsManagementReducers/providerStorageReport-reducer";
import providerTopupsReportPage_reducer from "./reportsManagementReducers/providerTopupsReport-reducer";

import managersPage_reducer from "./managersManagementReducers/managersPage-reducer";
import registerManagerPage_reducer from "./managersManagementReducers/registerManagerPage-reducer";
import updateManagerPage_reducer from "./managersManagementReducers/updateManagerPage-reducer";

import managerDetailsPage_reducer from "./managersManagementReducers/managerPageDetails-reducer";
const appReducer = combineReducers({
  layout_reducer,
  loginPage_reducer,

  customersPage_reducer,
  registerCustomerPage_reducer,
  updateCustomerPage_reducer,
  customerDetailsPage_reducer,

  currenciesPage_reducer,
  addCurrencyPage_reducer,
  updateCurrencyPage_reducer,
  currencyDetailsPage_reducer,

  subscriptionsPage_reducer,
  addSubscriptionPage_reducer,
  updateSubscriptionPage_reducer,
  subscriptionDetailsPage_reducer,
  subscriptionDenominationsPage_reducer,
  addSubscriptionDenominationPage_reducer,
  updateSubscriptionDenominationPage_reducer,

  batchesPage_reducer,
  batchCardsPage_reducer,
  createBatchPage_reducer,

  pricingPlansPage_reducer,
  createPricingPlanPage_reducer,
  updatePricingPlanPage_reducer,
  pricingPlanDetailsPage_reducer,

  brandsPage_reducer,
  createBrandPage_reducer,
  brandDetailsPage_reducer,
  updateBrandPage_reducer,

  categoriesPage_reducer,
  createCategoryPage_reducer,
  categoryDetailsPage_reducer,
  updateCategoryPage_reducer,
  categoryBrandsPage_reducer,

  denominationsPage_reducer,
  createDenominationPage_reducer,
  denominationDetailsPage_reducer,
  updateDenominationPage_reducer,

  providersPage_reducer,
  createProviderPage_reducer,
  providerDetailsPage_reducer,
  updateProviderPage_reducer,

  providerDenominationsPage_reducer,
  addProviderDenominationPage_reducer,
  providerDenominationDetailsPage_reducer,
  updateProviderDenominationPage_reducer,

  providerPurchasePage_reducer,

  salesReportPage_reducer,
  providerPurchasesReportPage_reducer,
  customerPurchasesReportPage_reducer,
  customerPurchasedCardsReportPage_reducer,
  voucherReportPage_reducer,
  quantityReportPage_reducer,
  providerStorageReportPage_reducer,
  providerTopupsReportPage_reducer,

  managersPage_reducer,
  registerManagerPage_reducer,
  updateManagerPage_reducer,
  managerDetailsPage_reducer,
});

export default (state, action) => {
  switch (action.type) {
    case "reset-app":
      state = undefined;
      break;
    case "reset-customersPage_reducer":
      state.customersPage_reducer = undefined;
      break;
    case "reset-registerCustomerPage_reducer":
      state.registerCustomerPage_reducer = undefined;
      break;
    case "reset-updateCustomerPage_reducer":
      state.updateCustomerPage_reducer = undefined;
      break;
    case "reset-customerDetailsPage_reducer":
      state.customerDetailsPage_reducer = undefined;
      break;

    case "reset-currenciesPage_reducer":
      state.currenciesPage_reducer = undefined;
      break;
    case "reset-addCurrencyPage_reducer":
      state.addCurrencyPage_reducer = undefined;
      break;
    case "reset-updateCurrencyPage_reducer":
      state.updateCurrencyPage_reducer = undefined;
      break;
    case "reset-currencyDetailsPage_reducer":
      state.currencyDetailsPage_reducer = undefined;
      break;

    case "reset-subscriptionsPage_reducer":
      state.subscriptionsPage_reducer = undefined;
      break;
    case "reset-addSubscriptionPage_reducer":
      state.addSubscriptionPage_reducer = undefined;
      break;

    case "reset-subscriptionDenominationsPage_reducer":
      state.subscriptionDenominationsPage_reducer = undefined;
      break;
    case "reset-addSubscriptionDenominationPage_reducer":
      state.addSubscriptionDenominationPage_reducer = undefined;
      break;
    case "reset-updateSubscriptionDenominationPage_reducer":
      state.updateSubscriptionDenominationPage_reducer = undefined;
      break;

    case "reset-batchesPage_reducer":
      state.batchesPage_reducer = undefined;
      break;
    case "reset-batchCardsPage_reducer":
      state.batchCardsPage_reducer = undefined;
      break;
    case "reset-createBatchPage_reducer":
      state.createBatchPage_reducer = undefined;
      break;

    case "reset-pricingPlansPage_reducer":
      state.pricingPlansPage_reducer = undefined;
      break;
    case "reset-createPricingPlanPage_reducer":
      state.createPricingPlanPage_reducer = undefined;
      break;
    case "reset-updatePricingPlanPage_reducer":
      state.updatePricingPlanPage_reducer = undefined;
      break;
    case "reset-pricingPlanDetailsPage_reducer":
      state.pricingPlanDetailsPage_reducer = undefined;
      break;

    case "reset-brandsPage_reducer":
      state.brandsPage_reducer = undefined;
      break;
    case "reset-createBrandPage_reducer":
      state.createBrandPage_reducer = undefined;
      break;
    case "reset-brandDetailsPage_reducer":
      state.brandDetailsPage_reducer = undefined;
      break;
    case "reset-updateBrandPage_reducer":
      state.updateBrandPage_reducer = undefined;
      break;

    case "reset-categoriesPage_reducer":
      state.categoriesPage_reducer = undefined;
      break;
    case "reset-createCategoryPage_reducer":
      state.createCategoryPage_reducer = undefined;
      break;
    case "reset-updateCategoryPage_reducer":
      state.updateCategoryPage_reducer = undefined;
      break;
    case "reset-categoryDetailsPage_reducer":
      state.categoryDetailsPage_reducer = undefined;
      break;
    case "reset-categoryBrandsPage_reducer":
      state.categoryBrandsPage_reducer = undefined;
      break;

    case "reset-denominationsPage_reducer":
      state.denominationsPage_reducer = undefined;
      break;
    case "reset-createDenominationPage_reducer":
      state.createDenominationPage_reducer = undefined;
      break;
    case "reset-denominationDetailsPage_reducer":
      state.denominationDetailsPage_reducer = undefined;
      break;
    case "reset-updateDenominationPage_reducer":
      state.updateDenominationPage_reducer = undefined;
      break;

    case "reset-providersPage_reducer":
      state.providersPage_reducer = undefined;
      break;
    case "reset-createProviderPage_reducer":
      state.createProviderPage_reducer = undefined;
      break;
    case "reset-updateProviderPage_reducer":
      state.updateProviderPage_reducer = undefined;
      break;
    case "reset-providerDetailsPage_reducer":
      state.providerDetailsPage_reducer = undefined;
      break;

    case "reset-availableToPurchasePage_reducer":
      state.availableToPurchasePage_reducer = undefined;
      break;

    case "reset-providerDenominationsPage_reducer":
      state.providerDenominationsPage_reducer = undefined;
      break;
    case "reset-addProviderDenominationPage_reducer":
      state.addProviderDenominationPage_reducer = undefined;
      break;
    case "reset-updateProviderDenominationPage_reducer":
      state.updateProviderDenominationPage_reducer = undefined;
      break;
    case "reset-providerDenominationDetailsPage_reducer":
      state.providerDenominationDetailsPage_reducer = undefined;
      break;

    case "reset-providerPurchasePage_reducer":
      state.providerPurchasePage_reducer = undefined;
      break;

    case "reset-salesReportPage_reducer":
      state.salesReportPage_reducer = undefined;
      break;
    case "reset-providerPurchasesReportPage_reducer":
      state.providerPurchasesReportPage_reducer = undefined;
      break;
    case "reset-customerPurchasesReportPage_reducer":
      state.customerPurchasesReportPage_reducer = undefined;
      break;
    case "reset-customerPurchasedCardsReportPage_reducer":
      state.customerPurchasedCardsReportPage_reducer = undefined;
      break;
    case "reset-voucherReportPage_reducer":
      state.voucherReportPage_reducer = undefined;
      break;
    case "reset-quantityReportPage_reducer":
      state.quantityReportPage_reducer = undefined;
      break;
    case "reset-providerStorageReportPage_reducer":
      state.providerStorageReportPage_reducer = undefined;
      break;
    case "reset-providerTopupsReportPage_reducer":
      state.providerTopupsReportPage_reducer = undefined;
      break;

    case "reset-managersPage_reducer":
      state.managersPage_reducer = undefined;
      break;
    case "reset-registerManagerPage_reducer":
      state.registerManagerPage_reducer = undefined;
      break;
    case "reset-updateManagerPage_reducer":
      state.updateManagerPage_reducer = undefined;
      break;
    case "reset-managerDetailsPage_reducer":
      state.managerDetailsPage_reducer = undefined;
      break;

    default:
  }
  return appReducer(state, action);
};
