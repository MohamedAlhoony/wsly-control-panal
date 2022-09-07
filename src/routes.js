import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import LoginPage from "./pages/login/login_page";

import StoresPage from "./pages/storesManagementPages/stores_page";
import CategoriesPage from "./pages/categoriesManagementPages/categories/categories_page";

import Prefs_page from "./pages/prefsManagementPages/prefs/prefs_page";
import choices_page from "./pages/choicesManagementPages/choices/choices_page";
// import RegisterCustomerPage from "./pages/customersManagementPages/registerCustomer/registerCustomer_page";
// import UpdateCustomerPage from "./pages/customersManagementPages/updateCustomer/updateCustomer_page";
// import CustomerDetailsPage from "./pages/customersManagementPages/customerDetails/customerDetails_page";

// import CurrenciesPage from "./pages/currenciesManagementPages/currencies/currencies_page";
// import AddCurrencyPage from "./pages/currenciesManagementPages/addCurrency/addCurrency_page";
// import UpdateCurrencyPage from "./pages/currenciesManagementPages/updateCurrency/updateCurrency_page";
// import CurrencyDetailsPage from "./pages/currenciesManagementPages/currencyDetails/currencyDetails_page";

// import SubscriptionsPage from "./pages/subscriptionsManagementPages/subscriptions/subscriptions_page";
// import AddSubscriptionPage from "./pages/subscriptionsManagementPages/addSubscription/addSubscription_page";
// import UpdateSubscriptionPage from "./pages/subscriptionsManagementPages/updateSubscription/updateSubscription_page";
// import SubscriptionDetailsPage from "./pages/subscriptionsManagementPages/subscriptionDetails/subscriptionDetails_page";
// import SubscriptionDenominationsPage from "./pages/subscriptionsManagementPages/denominations/denominations/denominations_page";
// import AddSubscriptionDenominationPage from "./pages/subscriptionsManagementPages/denominations/addDenomination/addDenomination_page";
// import UpdateSubscriptionDenominationPage from "./pages/subscriptionsManagementPages/denominations/updateDenomination/updateDenomination_page";

// import BatchesPage from "./pages/inventoryManagementPages/batchesManagementPages/batches/batches_page";
// import BatchCardsPage from "./pages/inventoryManagementPages/batchesManagementPages/batchCards/batchCards_page";
// import CreateBatchPage from "./pages/inventoryManagementPages/batchesManagementPages/createBatch/createBatch_page";

// import PricingPlansPage from "./pages/pricingPlansManagementPages/pricingPlans/pricingPlans_page";
// import CreatePricingPlanPage from "./pages/pricingPlansManagementPages/createPricingPlan/createPricingPlan_page";
// import UpdatePricingPlanPage from "./pages/pricingPlansManagementPages/updatePricingPlan/updatePricingPlan_page";
// import PricingPlanDetailsPage from "./pages/pricingPlansManagementPages/pricingPlanDetails/pricingPlanDetails_page";

// import CategoriesPage from "./pages/categoriesManagementPages/categories/categories_page";
// import CreateCategoryPage from "./pages/categoriesManagementPages/createCategory/createCategory_page";
// import CategoryDetailsPage from "./pages/categoriesManagementPages/categoryDetails/categoryDetails_page";
// import UpdateCategoryPage from "./pages/categoriesManagementPages/updateCategory/updateCategory_page";
// import CategoryBrandsPage from "./pages/categoryBrandsManagementPages/categoryBrands/categoryBrands_page";

// import BrandsPage from "./pages/brandsManagementPages/brands/brands_page";
// import CreateBrandPage from "./pages/brandsManagementPages/createBrand/createBrand_page";
// import UpdateBrandPage from "./pages/brandsManagementPages/updateBrand/updateBrand_page";
// import BrandDetailsPage from "./pages/brandsManagementPages/brandDetails/brandDetails_page";

// import DenominationsPage from "./pages/denominationsManagementPages/denominations/denominations_page";
// import CreateDenominationPage from "./pages/denominationsManagementPages/createDenomination/createDenomination_page";
// import DenominationDetailsPage from "./pages/denominationsManagementPages/denominationDetails/denominationDetails_page";
// import UpdateDenominationPage from "./pages/denominationsManagementPages/updateDenomination/updateDenomination_page";

// import ProvidersPage from "./pages/providersManagementPages/providers/providers_page";
// import CreateProviderPage from "./pages/providersManagementPages/createProvider/createProvider_page";
// import UpdateProviderPage from "./pages/providersManagementPages/updateProvider/updateProvider_page";
// import ProviderDetailsPage from "./pages/providersManagementPages/providerDetails/providerDetails_page";

// import ProviderDenominationsPage from "./pages/providerDenominationManagementPages/providerDenominations/providerDenominations_page";
// import AddProviderDenominationPage from "./pages/providerDenominationManagementPages/addProviderDenomination/addProviderDenomination_page";
// import ProviderDenominationDetailsPage from "./pages/providerDenominationManagementPages/providerDenominationDetails/providerDenominationDetails_page";
// import updateProviderDenomination_page from "./pages/providerDenominationManagementPages/updateProviderDenomination/updateProviderDenomination_page";

// import ProviderPuchasePage from "./pages/providerPurchaseManagementPages/providerPurchase/providerPurchase_page";

// import SalesReportPage from "./pages/reportsManagementPages/salesReport/salesReport_page";
// import ProviderPurchasesReportPage from "./pages/reportsManagementPages/providerPurchasesReport/providerPurchasesReport_page";
// import CustomerPurchasesReportPage from "./pages/reportsManagementPages/customerPurchasesReport/customerPurchasesReport_page";
// import CustomerPurchasedCardsReportPage from "./pages/reportsManagementPages/customerPurchasedCardsReport/customerPurchasedCardsReport_page";
// import VoucherReportPage from "./pages/reportsManagementPages/voucherReport/voucherReport_page";
// import QuantityReportPage from "./pages/reportsManagementPages/quantityReport/quantityReport_page";
// import ProviderStorageReportPage from "./pages/reportsManagementPages/providerStorageReport/providerStorageReport_page";
// import ProviderTopupsReportPage from "./pages/reportsManagementPages/providerTopupsReport/providerTopupsReport_page";

// import ManagersPage from "./pages/managersManagementPages/managers/managers_page";
// import RegisterManagerPage from "./pages/managersManagementPages/registerManager/registerManager_page";
// import UpdateManagerPage from "./pages/managersManagementPages/updateManager/updateManager_page";
// import ManagerDetailsPage from "./pages/managersManagementPages/managerDetails/managerDetails_page";
const Router = () => {
  return (
    <Switch>
      <Route path={"/login"} component={LoginPage} />
      <ProtectedRoute noLayout exact path="/" component={StoresPage} />
      <ProtectedRoute
        exact
        path="/stores/:storeId/categories"
        component={CategoriesPage}
      />
      <ProtectedRoute
        exact
        path="/stores/:storeId/categories/:categoryId/preferences"
        component={Prefs_page}
      />
      <ProtectedRoute
        exact
        path="/stores/:storeId/categories/:categoryId/preferences/:preferenceId/choices"
        component={choices_page}
      />

      {/* <ProtectedRoute
        exact
        path="/customers/register"
        component={RegisterCustomerPage}
      />
      <ProtectedRoute
        exact
        path="/customers/:customerID/update"
        component={UpdateCustomerPage}
      />
      <ProtectedRoute
        exact
        path="/customers/:customerID"
        component={CustomerDetailsPage}
      />

      <ProtectedRoute exact path="/currencies" component={CurrenciesPage} />
      <ProtectedRoute
        exact
        path="/currencies/add"
        component={AddCurrencyPage}
      />
      <ProtectedRoute
        exact
        path="/currencies/:currencyID/update"
        component={UpdateCurrencyPage}
      />
      <ProtectedRoute
        exact
        path="/currencies/:currencyID"
        component={CurrencyDetailsPage}
      />

      <ProtectedRoute
        exact
        path="/subscriptions"
        component={SubscriptionsPage}
      />
      <ProtectedRoute
        exact
        path="/subscriptions/add"
        component={AddSubscriptionPage}
      />
      <ProtectedRoute
        exact
        path="/subscriptions/:subscriptionID/update"
        component={UpdateSubscriptionPage}
      />
      <ProtectedRoute
        exact
        path="/subscriptions/:subscriptionID/"
        component={SubscriptionDetailsPage}
      />
      <ProtectedRoute
        exact
        path="/subscriptions/:subscriptionID/denominations"
        component={SubscriptionDenominationsPage}
      />
      <ProtectedRoute
        exact
        path="/subscriptions/:subscriptionID/denominations/add"
        component={AddSubscriptionDenominationPage}
      />
      <ProtectedRoute
        exact
        path="/subscriptions/:subscriptionID/denominations/:denominationID/update"
        component={UpdateSubscriptionDenominationPage}
      />

      <ProtectedRoute exact path="/batches" component={BatchesPage} />
      <ProtectedRoute
        exact
        path="/batches/:batchID/cards"
        component={BatchCardsPage}
      />
      <ProtectedRoute
        exact
        path="/batches/create"
        component={CreateBatchPage}
      />

      <ProtectedRoute
        exact
        path="/pricing-plans"
        component={PricingPlansPage}
      />
      <ProtectedRoute
        exact
        path="/pricing-plans/create"
        component={CreatePricingPlanPage}
      />
      <ProtectedRoute
        exact
        path="/pricing-plans/:pricingPlanID"
        component={PricingPlanDetailsPage}
      />
      <ProtectedRoute
        exact
        path="/pricing-plans/:pricingPlanID/update"
        component={UpdatePricingPlanPage}
      />

      <ProtectedRoute exact path="/categories" component={CategoriesPage} />
      <ProtectedRoute
        exact
        path="/categories/create"
        component={CreateCategoryPage}
      />
      <ProtectedRoute
        exact
        path="/categories/:categoryID/update"
        component={UpdateCategoryPage}
      />
      <ProtectedRoute
        exact
        path="/categories/:categoryID"
        component={CategoryDetailsPage}
      />

      <ProtectedRoute
        exact
        path="/categories/:categoryID/brands"
        component={CategoryBrandsPage}
      />

      <ProtectedRoute exact path="/brands" component={BrandsPage} />
      <ProtectedRoute exact path="/brands/create" component={CreateBrandPage} />
      <ProtectedRoute
        exact
        path="/brands/:brandID"
        component={BrandDetailsPage}
      />
      <ProtectedRoute
        exact
        path="/brands/:brandID/update"
        component={UpdateBrandPage}
      />

      <ProtectedRoute
        exact
        path="/brands/:brandID/denominations"
        component={DenominationsPage}
      />
      <ProtectedRoute
        exact
        path="/brands/:brandID/denominations/create"
        component={CreateDenominationPage}
      />
      <ProtectedRoute
        exact
        path="/brands/:brandID/denominations/:denominationID/update"
        component={UpdateDenominationPage}
      />
      <ProtectedRoute
        exact
        path="/denominations/:denominationID"
        component={DenominationDetailsPage}
      />

      <ProtectedRoute exact path="/providers" component={ProvidersPage} />
      <ProtectedRoute
        exact
        path="/providers/create"
        component={CreateProviderPage}
      />
      <ProtectedRoute
        exact
        path="/providers/:providerID"
        component={ProviderDetailsPage}
      />
      <ProtectedRoute
        exact
        path="/providers/:providerID/update"
        component={UpdateProviderPage}
      />
      <ProtectedRoute
        exact
        path="/providers/:providerID/denominations/add"
        component={AddProviderDenominationPage}
      />
      <ProtectedRoute
        exact
        path="/providers/:providerID/denominations/:denominationID"
        component={ProviderDenominationDetailsPage}
      />
      <ProtectedRoute
        exact
        path="/providers/:providerID/denominations/:denominationID/update"
        component={updateProviderDenomination_page}
      />
      <ProtectedRoute
        exact
        path="/providers/:providerID/denominations"
        component={ProviderDenominationsPage}
      />

      <ProtectedRoute exact path="/purchase" component={ProviderPuchasePage} />

      <ProtectedRoute exact path="/reports/sales" component={SalesReportPage} />
      <ProtectedRoute
        exact
        path="/reports/provider-purchases"
        component={ProviderPurchasesReportPage}
      />
      <ProtectedRoute
        exact
        path="/reports/customer-purchases"
        component={CustomerPurchasesReportPage}
      />
      <ProtectedRoute
        exact
        path="/reports/customer-purchased-cards"
        component={CustomerPurchasedCardsReportPage}
      />
      <ProtectedRoute
        exact
        path="/reports/voucher"
        component={VoucherReportPage}
      />
      <ProtectedRoute
        exact
        path="/reports/quantity"
        component={QuantityReportPage}
      />
      <ProtectedRoute
        exact
        path="/reports/provider-storage"
        component={ProviderStorageReportPage}
      />
      <ProtectedRoute
        exact
        path="/reports/provider-topups"
        component={ProviderTopupsReportPage}
      />

      <ProtectedRoute exact path="/managers" component={ManagersPage} />
      <ProtectedRoute
        exact
        path="/managers/register"
        component={RegisterManagerPage}
      />
      <ProtectedRoute
        exact
        path="/managers/:managerID/update"
        component={UpdateManagerPage}
      />
      <ProtectedRoute
        exact
        path="/managers/:managerID"
        component={ManagerDetailsPage}
      /> */}
    </Switch>
  );
};

export default Router;
